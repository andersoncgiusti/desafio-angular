import { ChangeDetectorRef, Component } from '@angular/core';
import { MarvelService } from '../../services/marvel.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddCharacterModalComponent } from '../../../../shared/components/add-character-modal/add-character-modal.component';
import { EditCharacterModalComponent } from '../../../../shared/components/edit-character-modal/edit-character-modal.component';
import { ViewCharacterModalComponent } from '../../../../shared/components/view-character-modal/view-character-modal.component';

@Component({
  selector: 'app-marvel',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, AddCharacterModalComponent, EditCharacterModalComponent, ViewCharacterModalComponent],
  templateUrl: './marvel.component.html',
  styleUrls: ['./marvel.component.scss']
})
export class MarvelComponent {
  characters: any[] = [];
  isLoading = true;
  selectedCharacter: any = null;
  editingCharacter: any = null;
  newCharacter: any = { name: '', description: '', thumbnail: { path: '' } };
  showCreateModal: boolean = false;
  showDetailsModal: boolean = false;
  searchQuery: string = '';

  constructor(private marvelService: MarvelService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchCharacters();
  }

  // Método para buscar os personagens
  fetchCharacters(): void {
    this.marvelService.getCharacters().subscribe(
      (response) => {
        this.characters = response.data?.results || [];
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao buscar personagens:', error);
        this.isLoading = false;
      }
    );
  }

  // Método para adicionar um novo personagem
  submitCreate(): void {
    if (this.newCharacter.name && this.newCharacter.description && this.newCharacter.thumbnail.path) {
      const newCharacter = {
        id: Math.floor(Math.random() * 1000), // Gerando ID aleatório
        name: this.newCharacter.name,
        description: this.newCharacter.description,
        thumbnail: this.newCharacter.thumbnail
      };

      // Cria uma nova referência para o array (Garante a detecção de mudanças)
      this.characters = [...this.characters, newCharacter];

      // Força a detecção de mudanças manualmente
      this.cdr.detectChanges();

      // Fecha o modal
      this.cancelCreate();
    } else {
      alert('Preencha todos os campos!');
    }
  }

  // Método para abrir o modal de criação
  openCreateModal(): void {
    this.showCreateModal = true;
    this.newCharacter = { name: '', description: '', thumbnail: { path: '' } }; // Limpa os campos
  }

  // Método para cancelar a criação
  cancelCreate(): void {
    this.showCreateModal = false;
  }

  // Método para editar um personagem
  editCharacter(character: any): void {
    this.editingCharacter = { ...character }; // Cria uma cópia do personagem para edição
  }

  // Método para submeter a edição
  submitEdit(): void {
    if (this.editingCharacter) {
      const index = this.characters.findIndex((char) => char.id === this.editingCharacter.id);
      if (index !== -1) {
        this.characters[index] = { ...this.editingCharacter }; // Atualiza o personagem na lista
      }
      this.cancelEdit(); // Fecha o formulário de edição
    }
  }

  // Cancela a edição
  cancelEdit(): void {
    this.editingCharacter = null;
  }

  // Método para excluir um personagem
  deleteCharacter(id: number): void {
    const characterIndex = this.characters.findIndex((char) => char.id === id);
    if (characterIndex !== -1) {
      if (confirm('Você tem certeza que deseja excluir este personagem?')) {
        this.characters.splice(characterIndex, 1); // Remove o personagem do array
      }
    }
  }

  // Método para exibir detalhes de um personagem
  viewCharacterDetails(id: number): void {
    this.marvelService.getCharacterById(id).subscribe(
      (response) => {
        this.selectedCharacter = response.data.results[0]; // Exibe os detalhes do personagem
        this.showDetailsModal = true; // Abre o modal de detalhes
      },
      (error) => {
        console.error('Erro ao buscar detalhes do personagem:', error);
      }
    );
  }

  // Função para filtrar os personagens com base no nome
  filteredCharacters() {
    return (this.characters || []).filter(character =>
      character.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Método para fechar o modal de detalhes
  closeDetailsModal(): void {
    this.showDetailsModal = false;
  }
}
