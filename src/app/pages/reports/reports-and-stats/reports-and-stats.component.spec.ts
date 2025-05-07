import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsAndStatsComponent } from './reports-and-stats.component';

describe('ReportsAndStatsComponent', () => {
  let component: ReportsAndStatsComponent;
  let fixture: ComponentFixture<ReportsAndStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsAndStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsAndStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
