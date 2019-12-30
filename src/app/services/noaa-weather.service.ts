import { Injectable } from '@angular/core';
import { Weather } from '../models/weather.model'

// service for handling weather and noaa weather service connection
@Injectable({ providedIn: 'root' })
export class NOAAWeatherService {

  // constructor
  constructor() { }

  // function to retrieve weather based on given date
  getWeather(date: Date): Weather {
    return new Weather();
    // create a new weather object using Weather model after calling NOAA api
  }

  // function to retrieve weather based on given date (return NOAA weather response)
  private retrieveWeatherWithNOAAWeatherAPIEndpoint(date: Date) { }

}
