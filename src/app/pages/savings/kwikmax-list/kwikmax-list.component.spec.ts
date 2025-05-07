import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KwikmaxListComponent } from './kwikmax-list.component';

describe('KwikmaxListComponent', () => {
  let component: KwikmaxListComponent;
  let fixture: ComponentFixture<KwikmaxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KwikmaxListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KwikmaxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
