import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { FavoritosService } from '../services/favoritos.service';
import { HistoricoService } from '../services/historico.service';



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
  historico: string[] = [];

  constructor(
    private weatherService: WeatherService,
    private favoritosService: FavoritosService,
    private historicoService: HistoricoService
  ) {}

  async ngOnInit() {
    await this.getWeather();
    await this.listarFavoritos();
  }

  async getWeather() {
    if (!this.city) return;
  
    try {
      this.weatherService.getWeatherByCity(this.city).subscribe(data => {
        this.weatherData = data;
      });
  
      this.weatherService.getForecastByCity(this.city).subscribe(data => {
        this.forecastData = data;
      });
  
      await this.historicoService.adicionarHistorico(this.city);
      this.historico = await this.historicoService.getHistorico();
    } catch (error) {
      console.error('Erro ao buscar clima:', error);
    }
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
