import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrientadorCrearComponent } from './Orientador-crear.component';

describe('OrientadorCrearComponent', () => {
  let component: OrientadorCrearComponent;
  let fixture: ComponentFixture<OrientadorCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrientadorCrearComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrientadorCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
