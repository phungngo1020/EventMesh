import { Component, OnInit, OnDestroy, ɵSWITCH_COMPILE_DIRECTIVE__POST_R3__ } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Mode } from '../shared/mode.model';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentMode = 'dark';

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.onFetchMode();
  }

  onFetchMode() {
    this.dataStorageService.fetchMode().subscribe(resMode => {
      this.currentMode = resMode[0].mode;
      console.log(this.currentMode);
    });
    
  }
}