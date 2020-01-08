import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class WeatherService {
    added = false;

    constructor(
        private http: HttpClient, 
        private authService: AuthService) {}
        

/*
   createAndStoreCity(title) {
        this.added = true;
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            this.username = user.email.substring(0, user.email.lastIndexOf("@"));
            return this.http
            .post<{ name: string }>(
                'https://eventmesh-1a5be.firebaseio.com/'+ this.username + '/city' +'.json?', title, {
                params: new HttpParams().set('auth', user.token)
            }
            );
        })
        );
    }
    fetchCity() {
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            this.username = user.email.substring(0, user.email.lastIndexOf("@"));
            return this.http
            .get<{ [key: string]: City}>(
                'https://eventmesh-1a5be.firebaseio.com/'+ this.username + '/city' +'.json?', {
                params: new HttpParams().set('auth', user.token)
            }
            );
        }),
            map(responseData => {
                const cityArray: City[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            cityArray.push({ ...responseData[key], id: key });
                        }
                    }
                return cityArray; 
            })
        );
    }
    */









        /*
        fetchCity() {
            return this.authService.user.pipe(take(1), exhaustMap(user => {
                return this.http
                .get<{ [key: string]: City}>(
                    'https://eventmesh-1a5be.firebaseio.com/'+ user.id + '/mode' +'.json?', {
                    params: new HttpParams().set('auth', user.token)
                }
                );
            }),
                map(responseData => {
                    const modeArray: City[] = [];
                        for (const key in responseData) {
                            if (responseData.hasOwnProperty(key)) {
                                modeArray.push({ ...responseData[key], id: key });
                            }
                        }
                        return modeArray;
                })
            );
    
        }
        updateCity(id: string, title: string) {
            const mode: City = {title: title};
            return this.authService.user.pipe(take(1), exhaustMap(user => {
                return this.http
                .put<{ name: string }>(
                    'https://eventmesh-1a5be.firebaseio.com/'+ user.id + '/mode/' + id +'.json?', mode, {
                    params: new HttpParams().set('auth', user.token)
                }
                );
            })
            );
        } */
    }