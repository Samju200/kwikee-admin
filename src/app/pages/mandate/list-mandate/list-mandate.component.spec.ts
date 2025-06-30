import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMandateComponent } from './list-mandate.component';

describe('ListMandateComponent', () => {
  let component: ListMandateComponent;
  let fixture: ComponentFixture<ListMandateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMandateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMandateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
