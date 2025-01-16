import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  private baseUrl = environment.marvelApi.baseUrl;
  private publicKey = environment.marvelApi.publicKey;
  private privateKey = environment.marvelApi.privateKey;

  constructor(private http: HttpClient) {}

  // Função para gerar os parâmetros comuns
  private generateParams(limit?: number): HttpParams {
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + this.privateKey + this.publicKey).toString();

    let params = new HttpParams()
      .set('ts', ts.toString())
      .set('apikey', this.publicKey)
      .set('hash', hash);

    if (limit) {
      params = params.set('limit', limit.toString());
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
