import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  city = '';
  weatherData: any;
  forecastData: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeather();
  }

  getWeather() {
    this.weatherService.getWeatherByCity(this.city).subscribe(data => {
      this.weatherData = data;
    });

    this.weatherService.getForecastByCity(this.city).subscribe(data => {
      this.forecastData = data;
    });
  }

}
