// src/app/services/weather.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = '137e120903116dc8411861ce9f3a0af4'; 
  private apiUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  // Clima atual por cidade
  getWeatherByCity(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric&lang=pt_br`);
  }

  // Previsão para os próximos 5 dias (a cada 3 horas)
  getForecastByCity(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric&lang=pt_br`);
  }
  getWeatherByCoords(lat: number, lon: number) {
    return this.http.get(`${this.apiUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=pt_br`);
  }
  
  getForecastByCoords(lat: number, lon: number) {
    return this.http.get(`${this.apiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=pt_br`);
  }
  
}
