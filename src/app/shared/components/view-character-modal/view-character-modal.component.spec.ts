import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCharacterModalComponent } from './view-character-modal.component';

describe('ViewCharacterModalComponent', () => {
  let component: ViewCharacterModalComponent;
  let fixture: ComponentFixture<ViewCharacterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCharacterModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewCharacterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
