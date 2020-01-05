import { Injectable } from '@angular/core';
import { User } from '../models/user.model'

// service for handling user information and google identity toolkit connection
@Injectable({ providedIn: 'root' })
export class UserInformationAndAuthenticationService {

  // current user information
  private userInformation: User;
  // google identity toolkit api key
  private GoogleIdentityToolkitAPIKey: string;

  // constructor
  constructor() { }

  // function to set user information
  setUserInformation(user: User): void { }

  // function to get user information
  getUserInformation(): User {
    return this.userInformation;
  }

  // function to authenticate user (can probably also return a subscribe-able response)
  authenticateWithGoogleIdentityToolkit(user: User): boolean {
    return false;
  }

}
