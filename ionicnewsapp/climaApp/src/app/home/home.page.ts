import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { FavoritosService } from '../services/favoritos.service';
import { HistoricoService } from '../services/historico.service';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';
import { WeatherData, ForecastData } from '../models/weather.model';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  city = 'Recife';
  weatherData: WeatherData | null = null;
  forecastData: ForecastData | null = null;
  favoritos: string[] = [];
  favoritosClima: { cidade: string, clima: any }[] = [];
  historico: string[] = [];
  previsaoPorDia: { date: string, temp_min: number, temp_max: number, icon: string, description: string }[] = [];
  previsao24h: any[] = [];


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
        this.city = data.name;
      });
  
      this.weatherService.getForecastByCity(this.city).subscribe(data => {
        this.forecastData = data;
        this.processarPrevisaoPorDia(); 
        this.processarPrevisao24h();
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

  async buscarPorLocalizacao() {
    try {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
  
            this.weatherService.getWeatherByCoords(latitude, longitude).subscribe((data: WeatherData) => {
              this.weatherData = data;
              this.city = data.name;
            });
            
            this.weatherService.getForecastByCoords(latitude, longitude).subscribe((data: ForecastData) => {
              this.forecastData = data;
            });            
  
            await this.historicoService.adicionarHistorico(this.city);
            this.historico = await this.historicoService.getHistorico();
          },
          (error) => {
            console.error('Erro na geolocalização do navegador:', error);
            alert(`Erro na geolocalização: ${error.message} (Código ${error.code})`);
          },
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
          }
        );
      } else {
        alert('Geolocalização não suportada neste navegador.');
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
    }
  }  
  
  processarPrevisaoPorDia() {
    if (!this.forecastData || !this.forecastData.list) return;
  
    const previsaoPorDiaMap = new Map<string, any>();
  
    this.forecastData.list.forEach((item: any) => {
      const dataHora = new Date(item.dt * 1000); // converte timestamp para Date
      const diaStr = dataHora.toISOString().slice(0, 10); // "YYYY-MM-DD"
  
      if (!previsaoPorDiaMap.has(diaStr)) {
        previsaoPorDiaMap.set(diaStr, {
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          // para simplicidade, pega o clima do primeiro item do dia
          icon: item.weather[0].icon,
          description: item.weather[0].description,
          count: 1
        });
      } else {
        const diaData = previsaoPorDiaMap.get(diaStr);
        // atualiza mín e máx
        diaData.temp_min = Math.min(diaData.temp_min, item.main.temp_min);
        diaData.temp_max = Math.max(diaData.temp_max, item.main.temp_max);
        // para clima, poderia melhorar escolhendo o mais frequente, mas vamos deixar o primeiro por enquanto
        diaData.count++;
        previsaoPorDiaMap.set(diaStr, diaData);
      }
    });
  
    // Converte Map para array ordenado por data
    this.previsaoPorDia = Array.from(previsaoPorDiaMap.entries()).map(([date, info]) => {
      return {
        date,
        temp_min: info.temp_min,
        temp_max: info.temp_max,
        icon: info.icon,
        description: info.description
      };
    }).sort((a, b) => (a.date > b.date ? 1 : -1));
  }

  processarPrevisao24h() {
    if (!this.forecastData || !this.forecastData.list) return;
  
    // Pega os próximos 8 blocos de 3h, totalizando 24h
    this.previsao24h = this.forecastData.list.slice(0, 8).map((item: any) => ({
      date: item.dt_txt,
      temp_min: item.main.temp_min,
      temp_max: item.main.temp_max,
      icon: item.weather[0].icon,
      description: item.weather[0].description
    }));
  }
  
  
}
