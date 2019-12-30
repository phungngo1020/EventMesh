import { Injectable } from '@angular/core';

// service for handling shared values
@Injectable({ providedIn: 'root' })
export class SharedLibraryService {

  // shared properties
  FIREBASE_ENDPINT: string = "https://eventmesh-1a5be.firebaseio.com";
  FIREBASE_EVENTS_ENDPINT: string = this.FIREBASE_ENDPINT+"/events.json";
  FIREBASE_TASKS_ENDPINT: string = this.FIREBASE_ENDPINT+"/tasks.json";
  NOAA_WEATHER_ENDPOINT: string = "";
  GOOGLE_IDENTITY_TOOLKIT_ENDPOINT: string = "";
  FIREBASE_API_KEY: string = "";
  NOAA_WEATHER_API_KEY: string = "";
  GOOGLE_IDENTITY_API_KEY: string = "";

}
