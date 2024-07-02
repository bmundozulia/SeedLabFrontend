import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddNivelComponent } from './modal-add-nivel.component';

describe('ModalAddNivelComponent', () => {
  let component: ModalAddNivelComponent;
  let fixture: ComponentFixture<ModalAddNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAddNivelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAddNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
