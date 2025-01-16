import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  private baseUrl = 'https://gateway.marvel.com/v1/public';
  private publicKey = '35b9bc41652d8411d1fd3609fb35fa1d';
  private privateKey = '644ce1995e337d373df60f7646374765bd156411';

  constructor(private http: HttpClient) {}

  // Função para gerar os parâmetros comuns
  private generateParams(limit?: number): { [key: string]: string } {
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + this.privateKey + this.publicKey).toString();

    const params: { [key: string]: string } = {
      ts: ts.toString(),
      apikey: this.publicKey,
      hash: hash,
    };

    if (limit) {
      params['limit'] = limit.toString();
    }

    return params;
  }

  // Método para buscar personagens
  getCharacters(limit: number = 10): Observable<any> {
    const params = this.generateParams(limit);
    return this.http.get(`${this.baseUrl}/characters`, { params });
  }

  // Método para buscar personagem por ID
  getCharacterById(id: number): Observable<any> {
    const params = this.generateParams();
    return this.http.get(`${this.baseUrl}/characters/${id}`, { params });
  }

  // Método para buscar quadrinhos de um personagem
  getComicsByCharacterId(id: number): Observable<any> {
    const params = this.generateParams();
    return this.http.get(`${this.baseUrl}/characters/${id}/comics`, { params });
  }

  // Método para atualizar um personagem
  updateCharacter(id: number, data: any): Observable<any> {
    const params = this.generateParams();
    return this.http.put(`${this.baseUrl}/characters/${id}`, data, { params });
  }

  // Método para deletar um personagem
  deleteCharacter(id: number): Observable<any> {
    const params = this.generateParams();
    return this.http.delete(`${this.baseUrl}/characters/${id}`, { params });
  }

  // Método para criar um personagem
  createCharacter(data: any): Observable<any> {
    const params = this.generateParams();
    return this.http.post(`${this.baseUrl}/characters`, data, { params });
  }
}
