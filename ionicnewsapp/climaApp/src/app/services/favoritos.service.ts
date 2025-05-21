import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private storageInicializado = false;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    if (!this.storageInicializado) {
      await this.storage.create();
      this.storageInicializado = true;
    }
  }

  async getFavoritos(): Promise<string[]> {
    await this.init();
    return (await this.storage.get('favoritos')) || [];
  }

  async adicionarFavorito(cidade: string): Promise<void> {
    const favoritos = await this.getFavoritos();
    if (!favoritos.includes(cidade)) {
      favoritos.push(cidade);
      await this.storage.set('favoritos', favoritos);
    }
  }

  async removerFavorito(cidade: string): Promise<void> {
    const favoritos = await this.getFavoritos();
    const atualizados = favoritos.filter(item => item !== cidade);
    await this.storage.set('favoritos', atualizados);
  }

  async isFavorito(cidade: string): Promise<boolean> {
    const favoritos = await this.getFavoritos();
    return favoritos.includes(cidade);
  }
}
