import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEnquiryComponent } from './account-enquiry.component';

describe('AccountEnquiryComponent', () => {
  let component: AccountEnquiryComponent;
  let fixture: ComponentFixture<AccountEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountEnquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
