import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  imports: [IonicModule, FormsModule, CommonModule],
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  email = '';
  senha = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    const sucesso = await this.authService.login(this.email, this.senha);
    if (sucesso) {
      this.router.navigate(['/home']);
    } else {
      alert('Falha no login.');
    }
  }

  async registrar() {
    const sucesso = await this.authService.registrar(this.email, this.senha);
    if (sucesso) {
      this.router.navigate(['/home']);
    } else {
      alert('Erro ao cadastrar.');
    }
  }

}
