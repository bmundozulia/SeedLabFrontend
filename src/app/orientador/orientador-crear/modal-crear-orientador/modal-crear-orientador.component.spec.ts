import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearOrientadorComponent } from './modal-crear-orientador.component';

describe('ModalCrearOrientadorComponent', () => {
  let component: ModalCrearOrientadorComponent;
  let fixture: ComponentFixture<ModalCrearOrientadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCrearOrientadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCrearOrientadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
