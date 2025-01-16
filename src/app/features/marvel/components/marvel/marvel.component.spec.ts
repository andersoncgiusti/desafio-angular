import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarvelComponent } from './marvel.component';
import { MarvelService } from '../../services/marvel.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddCharacterModalComponent } from '../../../../shared/components/add-character-modal/add-character-modal.component';
import { EditCharacterModalComponent } from '../../../../shared/components/edit-character-modal/edit-character-modal.component';
import { ViewCharacterModalComponent } from '../../../../shared/components/view-character-modal/view-character-modal.component';

describe('MarvelComponent', () => {
  let component: MarvelComponent;
  let fixture: ComponentFixture<MarvelComponent>;
  let marvelService: MarvelService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        HttpClientTestingModule,
        AddCharacterModalComponent,
        EditCharacterModalComponent,
        ViewCharacterModalComponent
      ],
      providers: [MarvelService],
    }).compileComponents();

    fixture = TestBed.createComponent(MarvelComponent);
    component = fixture.componentInstance;
    marvelService = TestBed.inject(MarvelService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch characters on init', () => {
    const mockCharacters = {
      data: {
        results: [
          { id: 1, name: 'Spider-Man', description: 'Friendly neighborhood Spider-Man', thumbnail: { path: 'path/to/spiderman', extension: 'jpg' } }
        ]
      }
    };

    component.ngOnInit(); // Chama o método que irá buscar os personagens
    const req = httpTestingController.expectOne('https://gateway.marvel.com/v1/public/characters');
    expect(req.request.method).toBe('GET');
    req.flush(mockCharacters); // Simula a resposta da API

    expect(component.characters.length).toBe(1);
    expect(component.characters[0].name).toBe('Spider-Man');
  });

  it('should create a new character', () => {
    component.newCharacter = { name: 'Iron Man', description: 'Genius, billionaire, playboy, philanthropist', thumbnail: { path: 'path/to/ironman' } };
    component.submitCreate(); // Chama o método de criar personagem

    expect(component.characters.length).toBe(1); // O personagem deve ser adicionado
    expect(component.characters[0].name).toBe('Iron Man');
  });

  it('should edit a character', () => {
    const mockCharacter = { id: 1, name: 'Iron Man', description: 'Genius, billionaire', thumbnail: { path: 'path/to/ironman' } };
    component.characters = [mockCharacter];
    component.editCharacter(mockCharacter); // Chama o método de editar

    component.editingCharacter.name = 'Iron Man Updated';
    component.submitEdit(); // Submete a edição

    expect(component.characters[0].name).toBe('Iron Man Updated');
  });

  it('should delete a character', () => {
    const mockCharacter = { id: 1, name: 'Iron Man', description: 'Genius, billionaire', thumbnail: { path: 'path/to/ironman' } };
    component.characters = [mockCharacter];
    component.deleteCharacter(1); // Chama o método de deletar

    expect(component.characters.length).toBe(0); // O personagem deve ser removido
  });

  it('should view character details', () => {
    const mockCharacterDetails = {
      data: {
        results: [
          { id: 1, name: 'Iron Man', description: 'Genius, billionaire, playboy, philanthropist', thumbnail: { path: 'path/to/ironman', extension: 'jpg' } }
        ]
      }
    };

    component.viewCharacterDetails(1); // Chama o método de exibir detalhes

    const req = httpTestingController.expectOne('https://gateway.marvel.com/v1/public/characters/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockCharacterDetails); // Simula a resposta da API

    expect(component.selectedCharacter.name).toBe('Iron Man');
    expect(component.showDetailsModal).toBeTrue();
  });

  it('should filter characters by name', () => {
    component.characters = [
      { id: 1, name: 'Iron Man', description: 'Genius, billionaire', thumbnail: { path: 'path/to/ironman' } },
      { id: 2, name: 'Captain America', description: 'Super soldier', thumbnail: { path: 'path/to/captainamerica' } }
    ];

    component.searchQuery = 'Iron'; // Define o filtro
    const filtered = component.filteredCharacters(); // Filtra os personagens

    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('Iron Man');
  });
});
