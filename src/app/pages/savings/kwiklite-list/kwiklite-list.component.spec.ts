import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KwikliteListComponent } from './kwiklite-list.component';

describe('KwikliteListComponent', () => {
  let component: KwikliteListComponent;
  let fixture: ComponentFixture<KwikliteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KwikliteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KwikliteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
