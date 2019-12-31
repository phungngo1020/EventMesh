import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private authService: AuthService){}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log("1.!user:" + !user);
      console.log("1.!!user:" + !!user);
      console.log("1.isAuthenticated: " + this.isAuthenticated);
    });
    console.log("2.!user:" + !this.authService.user);
    console.log("2.!!user:" + !!this.authService.user);
    console.log("2.isAuthenticated: " + this.isAuthenticated);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
