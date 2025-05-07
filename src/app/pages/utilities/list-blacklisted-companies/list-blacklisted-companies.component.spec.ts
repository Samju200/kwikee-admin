import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBlacklistedCompaniesComponent } from './list-blacklisted-companies.component';

describe('ListBlacklistedCompaniesComponent', () => {
  let component: ListBlacklistedCompaniesComponent;
  let fixture: ComponentFixture<ListBlacklistedCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBlacklistedCompaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBlacklistedCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
