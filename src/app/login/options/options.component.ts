import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { DataStorageService } from '../../shared/services/data-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private router: Router){}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }


  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  currentMode = 'light';
  error = null;
  modeId = null;
  mode = 'light'


  switchMode() {
    if(this.mode === 'dark') {
      this.mode = 'light';
    } else if(this.mode === 'light') {
      this.mode = 'dark';
    }
  }

  onLogout() {
    this.authService.logout();
    this.authService.username = null;
  }

  reloadPage(){
    window.location.reload();
  }
}
