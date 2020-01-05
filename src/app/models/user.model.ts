// User model
export class User {

  //id?: string;
  //username: string;
  //password: string;
  //name: string;
  //email: string;

  constructor(
      public email: string,
      public id: string,
      private _token: string,
      private _tokenExpirationDate: Date
  ) {}

  get token() {
      if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
          return null;
      }
      return this._token;
  }
}
