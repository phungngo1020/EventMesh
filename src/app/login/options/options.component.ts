import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { DataStorageService } from '../../shared/data-storage.service';
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
   
    if(this.dataStorageService.fetchMode()===null) {
      this.onCreateMode();
    } else {
      this.onFetchMode();
    }
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
  onCreateMode() {
    //if(this.isAuthenticated === true) {
      this.dataStorageService.createAndStoreMode('light').subscribe(responseData => {
        console.log(responseData);
        this.dataStorageService.fetchMode().subscribe(resMode => {
          this.currentMode = resMode[0].mode;
          this.mode = this.currentMode;
          this.modeId = resMode[0].id;
          console.log(this.currentMode);
        });
      });
    /*} else if (this.isAuthenticated === false) {
      this.switchMode();
      this.currentMode = this.mode;
    }*/
  }

  onUpdateMode() {
      console.log(this.modeId);
      console.log('before: ' + this.mode);
      this.onFetchMode();
      this.switchMode();
      console.log('after: ' + this.mode);
      this.dataStorageService.updateMode(this.modeId, this.mode).subscribe(resMode => {
        this.currentMode = resMode[0].mode;
        this.mode = this.currentMode;
        console.log(this.currentMode);
      });
      this.router.navigate(['/']);
  }

  onFetchMode() {
    this.dataStorageService.fetchMode().subscribe(resMode => {
      this.currentMode = resMode[0].mode;
      this.modeId = resMode[0].id;
      console.log(this.currentMode);
    }, error => {
      this.error = error.message;
    });
  }

  reloadPage(){
    window.location.reload();
 }
}
