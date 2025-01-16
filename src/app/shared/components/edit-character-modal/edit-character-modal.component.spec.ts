import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCharacterModalComponent } from './edit-character-modal.component';

describe('EditCharacterModalComponent', () => {
  let component: EditCharacterModalComponent;
  let fixture: ComponentFixture<EditCharacterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCharacterModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCharacterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
