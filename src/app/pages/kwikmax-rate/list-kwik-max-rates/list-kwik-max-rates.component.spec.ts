import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListKwikMaxRatesComponent } from './list-kwik-max-rates.component';

describe('ListKwikMaxRatesComponent', () => {
  let component: ListKwikMaxRatesComponent;
  let fixture: ComponentFixture<ListKwikMaxRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListKwikMaxRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListKwikMaxRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
