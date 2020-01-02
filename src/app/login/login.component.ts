import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService, AuthResponseData} from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';

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
    private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.onFetchMode();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

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
      authObs =  this.authService.signup(email, password);
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

  currentMode = 'light';

  onFetchMode() {
    this.dataStorageService.fetchMode().subscribe(resMode => {
      this.currentMode = resMode[0].mode;
      console.log(this.currentMode);
    });
    
  }

}
