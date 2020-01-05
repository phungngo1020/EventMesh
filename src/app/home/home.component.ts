import { Component, OnInit, OnDestroy, ɵSWITCH_COMPILE_DIRECTIVE__POST_R3__ } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentMode = 'light';

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
  }
}
