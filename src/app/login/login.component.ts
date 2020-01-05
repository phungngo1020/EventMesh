import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService, AuthResponseData} from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { WeatherService } from './weather.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { map, take, exhaustMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  isAuthenticated = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private dataStorageService: DataStorageService,
    private weatherService: WeatherService,
    private http: HttpClient
    ) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  username: string;
  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }

    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if(this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      console.log('Signing up');
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(responseData => {
      console.log(responseData);
      this.isLoading = false;
      this.isAuthenticated = true;
      this.router.navigate(['/']);
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.isLoading = false;
    }
    );

    form.reset();
  }
  currentCity: String = null;

  /*
  onFetchCity() {
    this.weatherService.fetchCity().subscribe(resCity => {
      this.currentCity = resCity[0].title;
      console.log('onFetchCity: ' + this.currentCity);
    });
  }
  */


}
