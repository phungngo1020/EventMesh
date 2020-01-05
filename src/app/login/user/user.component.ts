import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private authService: AuthService) { }

  username = null;

  ngOnInit() {
    if(this.authService.signedin===true) {
      this.getUsername();
    }
    console.log("Username" + this.username);
  }

  getUsername() {
    console.log("getusername");
    if(this.username !== null)
      this.username = this.authService.username.substring(0, this.authService.username.lastIndexOf("@"));
  }
}
