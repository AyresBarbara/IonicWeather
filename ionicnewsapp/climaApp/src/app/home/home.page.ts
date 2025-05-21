import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { FavoritosService } from '../services/favoritos.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  city = 'Recife';
  weatherData: any;
  forecastData: any;
  favoritos: string[] = [];
  favoritosClima: { cidade: string, clima: any }[] = [];

  constructor(
    private weatherService: WeatherService,
    private favoritosService: FavoritosService
  ) {}

  ngOnInit() {
    this.getWeather();
    this.listarFavoritos();
  }

  getWeather() {
    this.weatherService.getWeatherByCity(this.city).subscribe(data => {
      this.weatherData = data;
    });

    this.weatherService.getForecastByCity(this.city).subscribe(data => {
      this.forecastData = data;
    });
  }
  
  async adicionarFavorito() {
    await this.favoritosService.adicionarFavorito(this.city);
    this.listarFavoritos();
  }

  async listarFavoritos() {
    this.favoritos = await this.favoritosService.getFavoritos();
    this.favoritosClima = [];

  for (const cidade of this.favoritos) {
    this.weatherService.getWeatherByCity(cidade).subscribe(data => {
      this.favoritosClima.push({ cidade, clima: data });
    });
  }
  }

  async removerFavorito(cidade: string) {
    await this.favoritosService.removerFavorito(cidade);
    this.listarFavoritos();
  }
  
  async verificarFavorito(): Promise<boolean> {
    return await this.favoritosService.isFavorito(this.city);
  }

}
