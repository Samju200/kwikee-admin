import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMandateComponent } from './single-mandate.component';

describe('SingleMandateComponent', () => {
  let component: SingleMandateComponent;
  let fixture: ComponentFixture<SingleMandateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMandateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMandateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
