import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forecast-carousel',
  templateUrl: './forecast-carousel.component.html',
  styleUrls: ['./forecast-carousel.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ForecastCarouselComponent {

  @Input() forecast: { date: string, temp_min: number, temp_max: number, icon: string, description: string }[] = [];

  currentIndex = 0;

  next() {
    if(this.currentIndex < this.forecast.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prev() {
    if(this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.forecast.length - 1;
    }
  }
  formatarData(dateStr: string): string {
    const hoje = new Date();
    const data = new Date(dateStr);
    const diff = (data.getTime() - hoje.getTime()) / (1000 * 3600 * 24);
  
    if (diff < 1 && diff >= 0) return 'Hoje';
    else if (diff < 2 && diff >= 1) return 'Amanhã';
    else return data.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' });
  }
  

}
