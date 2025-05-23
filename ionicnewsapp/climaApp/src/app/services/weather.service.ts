// src/app/services/weather.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { tap } from 'rxjs/operators';
import { ForecastData, WeatherData } from '../models/weather.model';
import { environment } from '../../environments/environment'; 
import { CacheService } from './cache.service';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient, private cache: CacheService) {}

  getWeatherByCity(city: string): Observable<WeatherData> {
    const cacheKey = `weather_${city}`;

    
    const cached = this.cache.get<WeatherData>(cacheKey);
    if (cached) {
      return of(cached);
    }

    const url = `${this.apiUrl}/weather?q=${city}&appid=${environment.openWeatherApiKey}&lang=pt_br&units=metric`;
    return this.http.get<WeatherData>(url).pipe(
      tap(data => this.cache.set(cacheKey, data)) 
    );
  }

  getForecastByCity(city: string): Observable<ForecastData> {
    const url = `${this.apiUrl}/forecast?q=${city}&appid=${environment.openWeatherApiKey}&lang=pt_br`;
    return this.http.get<ForecastData>(url);
  }

  getWeatherByCoords(lat: number, lon: number): Observable<WeatherData> {
    const url = `${this.apiUrl}/weather?lat=${lat}&lon=${lon}&appid=${environment.openWeatherApiKey}&lang=pt_br`;
    return this.http.get<WeatherData>(url);
  }

  getForecastByCoords(lat: number, lon: number): Observable<ForecastData> {
    const url = `${this.apiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${environment.openWeatherApiKey}&lang=pt_br`;
    return this.http.get<ForecastData>(url);
  }
  
}