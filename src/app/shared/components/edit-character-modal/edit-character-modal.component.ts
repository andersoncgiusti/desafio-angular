import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-character-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-character-modal.component.html',
  styleUrl: './edit-character-modal.component.scss'
})
export class EditCharacterModalComponent {
  @Input() editingCharacter: any;
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  submitEdit(): void {
    this.save.emit(this.editingCharacter);
  }

  cancelEdit(): void {
    this.cancel.emit();
  }
}
