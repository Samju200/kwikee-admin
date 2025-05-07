import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSavingsComponent } from './list-savings.component';

describe('ListSavingsComponent', () => {
  let component: ListSavingsComponent;
  let fixture: ComponentFixture<ListSavingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSavingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
