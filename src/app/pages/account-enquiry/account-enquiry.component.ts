import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@core/services/alert.service';
import { ProjectService } from '@core/services/project.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-account-enquiry',
  templateUrl: './account-enquiry.component.html',
  styleUrls: ['./account-enquiry.component.scss'],
})
export class AccountEnquiryComponent implements OnInit {
  EnquiryForm: FormGroup;
  destroy$ = new Subject<boolean>();
  loading = false;
  accountNumber: string = '';
  isLoading = false;
  loadSuccess = false;
  accountData: any;
  transactions: any;
  transactionsData: any;
  pay_date: any;
  validAccountNumber: any;
  showTransactions = false;

  constructor(
    private service: ProjectService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) {
    this.EnquiryForm = this.buildForm();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      start_date: [null, Validators.required],
      end_date: [null, Validators.required],
    });
  }

  validateInternalAccount() {
    this.isLoading = true;
    this.showTransactions = false;
    this.service
      .validateInternalAccount(this.accountNumber)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.isLoading = false;
          this.showTransactions = false;
          this.accountData = data.data;
          this.validAccountNumber = data.data.account_number;
          this.loadSuccess = true;
          this.loading = false;
        },
        error: () => {
          this.showTransactions = false;
          this.loading = true;
          this.isLoading = false;
          this.loadSuccess = false;
        },
      });
  }

  getAccountEnquiry(exportType?: string) {
    if (this.EnquiryForm.valid) {
      this.isLoading = true;
      const formValues = {
        ...this.EnquiryForm.value,
        account_number: this.validAccountNumber,
      };

      if (exportType) {
        formValues.export_type = exportType;
      }

      this.service
        .getAccountEnquiry(formValues, exportType)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: any) => {
            if (exportType) {
              // Handle file download
              this.downloadFile(data, exportType);
              this.isLoading = false;
            } else {
              // Normal transaction display
              this.showTransactions = true;
              this.isLoading = false;
              const result: any = data;
              if (result.status === '00') {
                this.transactionsData = result;
                this.transactions = result.data.transactions;
              } else {
                this.alertService.success(result['message']);
              }
            }
          },
          error: (err) => {
            this.isLoading = false;
            console.error('Download failed:', err);

            // If backend sends an error in Blob, read it:
            if (err.error instanceof Blob) {
              const reader = new FileReader();
              reader.onload = () => {
                const errorMessage = JSON.parse(reader.result as string);
                this.alertService.error(
                  errorMessage.message || 'Download failed'
                );
              };
              reader.readAsText(err.error);
            } else {
              this.alertService.error(err.message || 'Download failed');
            }
          },
        });
    }
  }

  downloadFile(data: Blob, type: string) {
    // Create a blob URL for the file
    const blobUrl = window.URL.createObjectURL(data);

    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = blobUrl;

    // Set the appropriate file extension
    const extension = type === 'pdf' ? 'pdf' : 'csv';
    link.download = `account_statement_${new Date().getTime()}.${extension}`;

    // Append to body, click and then remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Release the blob URL
    window.URL.revokeObjectURL(blobUrl);
  }

  exportToPdf() {
    this.getAccountEnquiry('pdf');
  }

  exportToCsv() {
    this.getAccountEnquiry('csv');
  }
}
