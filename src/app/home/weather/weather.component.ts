import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../login/auth.service';
//import { WeatherService } from './weather.service';
//import { DataStorageService } from '../../shared/data-storage.service';
//import { City } from '../../shared/city.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  apiKey = 'c68dc5b358eaa5c31b068c6833e9166f';
  data = null;
  cityName: string;
  description: string;
  icon: string;
  temp: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    //private weatherService: WeatherService,
    //private dataStorageService: DataStorageService 
  ) { }

  ngOnInit() {
    
  }


  fetchWeather(userInput) {
    this.cityName = userInput.userCity;
    this.http
      .get (
        'https://api.openweathermap.org/data/2.5/weather?q=' + this.cityName + '&units=metric&appid=' + this.apiKey
      ).subscribe(responseData => {
        this.data = responseData;
        this.description = this.data.weather[0].description.toUpperCase(); 
        this.icon = 'http://openweathermap.org/img/wn/' + this.data.weather[0].icon + '@2x.png';
        this.temp = this.convertTemp(this.data.main.temp);
        }
      );
  }

  convertTemp(value) {
    return this.temp = (value*1.8 + 32).toFixed(2) + ' F.';
  }

  /*
  loadedCities: City[] = [];
  loadedCity: City;
  title: string;
  error: string = null;
  onCreateCity(eventTitle) {
    if(this.authService.signedin===true) {
      this.dataStorageService.createAndStoreCity(eventTitle).subscribe(responseData => {
        console.log(responseData);
        this.dataStorageService.fetchCity().subscribe(events => {
          console.log(events);
          console.log(events.userCity);
          this.loadedCities = events;
          console.log("this.loadedCities" + this.loadedCities);
          this.loadedCity = events[0];
          console.log("this.loadedCity" + this.loadedCity);
        });
      });
    } else if (this.authService.signedin === false) {
      this.loadedCities.push(eventTitle);
    }
  }
  onFetchCity() {
    this.dataStorageService.fetchCity().subscribe(events => {
      this.loadedCity = events[0];
      this.loadedCities = events;
    }, error => {
      this.error = error.message;
    });
  } */

  /*
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
  */

}
