import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {
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

  async adicionarHistorico(cidade: string): Promise<void> {
    await this.init();
    let historico : string[] = await this.storage.get('historico') || [];

    cidade = cidade.trim();

    // Evita duplicatas e limita a 10 itens
    historico = [cidade, ...historico.filter(c => c !== cidade)].slice(0, 10);

    await this.storage.set('historico', historico);
  }

  async getHistorico(): Promise<string[]> {
    await this.init();
    return (await this.storage.get('historico')) || [];
  }

  async limparHistorico(): Promise<void> {
    await this.init();
    await this.storage.remove('historico');
  }
}
