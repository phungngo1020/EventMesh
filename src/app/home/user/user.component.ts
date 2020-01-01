import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.signedin===true) {
      this.getUsername();
    }
    console.log("Username" + this.username);
  }

  username = null;
  getUsername() {
    console.log("getusername");
    this.username = this.authService.username.substring(0, this.authService.username.lastIndexOf("@"));
  }
}
