import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditRateComponent } from './credit-rate.component';

describe('CreditRateComponent', () => {
  let component: CreditRateComponent;
  let fixture: ComponentFixture<CreditRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
