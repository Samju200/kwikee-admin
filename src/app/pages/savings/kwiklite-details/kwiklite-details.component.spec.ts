import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KwikliteDetailsComponent } from './kwiklite-details.component';

describe('KwikliteDetailsComponent', () => {
  let component: KwikliteDetailsComponent;
  let fixture: ComponentFixture<KwikliteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KwikliteDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KwikliteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
