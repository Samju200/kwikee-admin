import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbPaginationComponent } from './kb-pagination.component';

describe('KbPaginationComponent', () => {
  let component: KbPaginationComponent;
  let fixture: ComponentFixture<KbPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
