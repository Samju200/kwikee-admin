import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KwikgoalsDetailsComponent } from './kwikgoals-details.component';

describe('KwikgoalsDetailsComponent', () => {
  let component: KwikgoalsDetailsComponent;
  let fixture: ComponentFixture<KwikgoalsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KwikgoalsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KwikgoalsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
