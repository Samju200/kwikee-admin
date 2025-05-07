import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCreditScoreRangesComponent } from './list-credit-score-ranges.component';

describe('ListCreditScoreRangesComponent', () => {
  let component: ListCreditScoreRangesComponent;
  let fixture: ComponentFixture<ListCreditScoreRangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCreditScoreRangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCreditScoreRangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
