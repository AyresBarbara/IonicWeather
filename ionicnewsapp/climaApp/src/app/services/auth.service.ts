import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;
  }

  async login(email: string, senha: string): Promise<boolean> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, senha);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  async registrar(email: string, senha: string): Promise<boolean> {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, senha);
      return true;
    } catch (error) {
      console.error('Cadastro error:', error);
      return false;
    }
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }
  getUsuarioAtual() {
    return this.afAuth.authState;
  }
  signup(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }
}
