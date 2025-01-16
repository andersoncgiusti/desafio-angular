import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MarvelService } from './marvel.service';
import { HttpClient } from '@angular/common/http';

describe('MarvelService', () => {
  let service: MarvelService;
  let httpMock: HttpTestingController; // Para simular as requisições HTTP

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa o módulo para mockar requisições HTTP
      providers: [MarvelService]
    });

    service = TestBed.inject(MarvelService);
    httpMock = TestBed.inject(HttpTestingController); // Injeção do controller de testes HTTP
  });

  afterEach(() => {
    // Verifica se não há requisições pendentes após cada teste
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch characters from the API', () => {
    const mockCharacters = {
      data: {
        results: [
          { id: 1, name: 'Spider-Man' },
          { id: 2, name: 'Iron Man' }
        ]
      }
    };

    // Chama o método do serviço
    service.getCharacters(10).subscribe((response) => {
      expect(response.data.results.length).toBe(2);
      expect(response.data.results[0].name).toBe('Spider-Man');
      expect(response.data.results[1].name).toBe('Iron Man');
    });

    // Mocka a requisição HTTP
    const req = httpMock.expectOne('https://gateway.marvel.com/v1/public/characters?ts=');
    expect(req.request.method).toBe('GET');
    req.flush(mockCharacters); // Simula a resposta da API
  });

  it('should fetch character by ID from the API', () => {
    const mockCharacter = {
      data: {
        results: [
          { id: 1, name: 'Spider-Man', description: 'A superhero' }
        ]
      }
    };

    service.getCharacterById(1).subscribe((response) => {
      expect(response.data.results[0].name).toBe('Spider-Man');
      expect(response.data.results[0].description).toBe('A superhero');
    });

    const req = httpMock.expectOne('https://gateway.marvel.com/v1/public/characters/1?ts=');
    expect(req.request.method).toBe('GET');
    req.flush(mockCharacter);
  });

  it('should fetch comics by character ID from the API', () => {
    const mockComics = {
      data: {
        results: [
          { id: 1, title: 'Spider-Man #1' },
          { id: 2, title: 'Iron Man #1' }
        ]
      }
    };

    service.getComicsByCharacterId(1).subscribe((response) => {
      expect(response.data.results.length).toBe(2);
      expect(response.data.results[0].title).toBe('Spider-Man #1');
    });

    const req = httpMock.expectOne('https://gateway.marvel.com/v1/public/characters/1/comics?ts=');
    expect(req.request.method).toBe('GET');
    req.flush(mockComics);
  });

  it('should update character through API', () => {
    const updatedCharacter = { name: 'Updated Spider-Man' };

    service.updateCharacter(1, updatedCharacter).subscribe((response) => {
      expect(response).toBeTruthy(); // Espera que a resposta seja verdadeira ou não nula
    });

    const req = httpMock.expectOne('https://gateway.marvel.com/v1/public/characters/1?ts=');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedCharacter); // Simula a resposta de sucesso
  });

  it('should delete character through API', () => {
    service.deleteCharacter(1).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('https://gateway.marvel.com/v1/public/characters/1?ts=');
    expect(req.request.method).toBe('DELETE');
    req.flush({}); // Resposta de sucesso (sem conteúdo)
  });

  it('should create a character through API', () => {
    const newCharacter = { name: 'Black Panther', description: 'A superhero from Wakanda' };

    service.createCharacter(newCharacter).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('https://gateway.marvel.com/v1/public/characters?ts=');
    expect(req.request.method).toBe('POST');
    req.flush(newCharacter); // Simula a criação com o objeto de personagem
  });
});
