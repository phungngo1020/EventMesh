import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  ngOnInit() {
    
  }

  constructor(private http: HttpClient) { }

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

}
