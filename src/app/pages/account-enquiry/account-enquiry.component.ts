import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@core/services/alert.service';
import { ProjectService } from '@core/services/project.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-account-enquiry',
  templateUrl: './account-enquiry.component.html',
  styleUrls: ['./account-enquiry.component.scss']
})
export class AccountEnquiryComponent implements OnInit {
  EnquiryForm: FormGroup;
  destroy$ = new Subject<boolean>();
  loading = false;
  accountNumber:string = '';
  isLoading = false;
  loadSuccess=false;
  accountData :any;
  transactions: any;
  transactionsData: any;
  pay_date: any;
  validAccountNumber:any;
  showTransactions = false;

  constructor(private service: ProjectService, private fb: FormBuilder, private alertService: AlertService) { 
    this.EnquiryForm = this.buildForm();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete()
  }

  buildForm(): FormGroup {
    return this.fb.group({
      start_date: [null, Validators.required],
      end_date: [null, Validators.required]
    })
  }

  exportEnquiry() {
    if (this.EnquiryForm.valid) {
      this.service.getLoansReport(this.EnquiryForm.value)
    } else {
      Object.values(this.EnquiryForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true })
        }
      })
    }
  }

  validateInternalAccount() {
    this.isLoading = true;
    this.showTransactions = false;
    console.log(this.accountNumber);
    this.service.validateInternalAccount(this.accountNumber).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.isLoading = false;
      this.showTransactions = false;
      this.accountData = data.data;
      this.validAccountNumber = data.data.account_number;
      console.log(data);
      this.loadSuccess =true;
      this.loading = false;
    }, 
    error => {
            this.showTransactions = false;
            this.loading = true;
            this.isLoading = false;
            this.loadSuccess =false;
          }
    )
  }

  getAccountEnquiry() {
    if (this.EnquiryForm.valid) {
    this.isLoading = true;
    const formValues = {...this.EnquiryForm.value, 
      account_number: this.validAccountNumber}
    this.service.getAccountEnquiry(formValues).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      console.log(data);
        this.showTransactions = true;
        this.isLoading = false;
        const result: any = data;
        if (result.status === '00') {
            this.transactionsData = result;
          this.transactions = result.data.transactions;
          console.log(this.transactions)
        } else {
          this.alertService.success(result['message']);
        }
      },
      error => {
        this.isLoading  = false;
      }
    );
    }
  }

}
