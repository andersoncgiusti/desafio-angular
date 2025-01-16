import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-character-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-character-modal.component.html',
  styleUrls: ['./add-character-modal.component.scss'],
})
export class AddCharacterModalComponent {
  @Input() showModal: boolean = false;
  @Input() newCharacter: any = { name: '', description: '', thumbnail: { path: '' } };

  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onSave(): void {
    this.save.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
