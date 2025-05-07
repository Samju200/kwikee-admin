import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KwikgoalsListComponent } from './kwikgoals-list.component';

describe('KwikgoalsListComponent', () => {
  let component: KwikgoalsListComponent;
  let fixture: ComponentFixture<KwikgoalsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KwikgoalsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KwikgoalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
