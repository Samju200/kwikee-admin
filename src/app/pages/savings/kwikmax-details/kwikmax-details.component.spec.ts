import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KwikmaxDetailsComponent } from './kwikmax-details.component';

describe('KwikmaxDetailsComponent', () => {
  let component: KwikmaxDetailsComponent;
  let fixture: ComponentFixture<KwikmaxDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KwikmaxDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KwikmaxDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
