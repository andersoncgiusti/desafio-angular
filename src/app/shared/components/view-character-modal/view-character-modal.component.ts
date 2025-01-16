import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-character-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './view-character-modal.component.html',
  styleUrl: './view-character-modal.component.scss'
})
export class ViewCharacterModalComponent {
  @Input() selectedCharacter: any;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
