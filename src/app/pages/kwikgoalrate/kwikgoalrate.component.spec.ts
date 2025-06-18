import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KwikgoalrateComponent } from './kwikgoalrate.component';

describe('KwikgoalrateComponent', () => {
  let component: KwikgoalrateComponent;
  let fixture: ComponentFixture<KwikgoalrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KwikgoalrateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KwikgoalrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
