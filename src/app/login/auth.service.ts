import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null); 
    username: string;
    signedin = false;

    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBRTHjXN2lCYqOzWlytd6f-XZ_boC7J-WQ',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), 
        tap(resData => {   // +resData.expiresIn converts string to number
            this.handleAuthentication(
                resData.email, 
                resData.localId,
                resData.idToken, 
                +resData.expiresIn
            );
            this.signedin = true;
        })
        );
        
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBRTHjXN2lCYqOzWlytd6f-XZ_boC7J-WQ',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError),
        tap(resData => {   // +resData.expiresIn converts string to number
            this.handleAuthentication(
                resData.email, 
                resData.localId,
                resData.idToken, 
                +resData.expiresIn
            );
            this.username = resData.email;
            this.signedin = true;
        })
        );
    }

    private handleAuthentication(
        email: string, 
        userId: string,
        token: string, 
        expiresIn: number
    ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        if(user) {
            console.log("user");
        }
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if(!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Password is incorrect!';
                break;
        }
        return throwError(errorMessage);
    }
    
}