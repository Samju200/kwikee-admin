// download-modal.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '@core/services/project.service';

@Component({
  selector: 'app-download-modal',
  templateUrl: './download-modal.component.html',
  styleUrls: ['./download-modal.component.scss'],
})
export class DownloadModalComponent {
  @Input() showModal = false;
  @Input() accountNumber = '';
  @Output() closeModal = new EventEmitter<void>();

  downloadForm: FormGroup;
  loading = false;
  today = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private service: ProjectService,
    private toastr: ToastrService
  ) {
    this.downloadForm = this.fb.group({
      account_number: ['', [Validators.required]],
      start_date: [this.today, [Validators.required]],
      end_date: [this.today, [Validators.required]],
      format: ['pdf', [Validators.required]],
    });
  }

  ngOnChanges() {
    if (this.accountNumber) {
      this.downloadForm.patchValue({
        account_number: this.accountNumber,
      });
    }
  }

  onDownload() {
    if (this.downloadForm.invalid) {
      this.markFormGroupTouched(this.downloadForm);
      return;
    }

    const params = this.downloadForm.value;

    // Validate date range
    if (new Date(params.start_date) > new Date(params.end_date)) {
      this.toastr.error(
        'Start date must be before or equal to end date',
        'Error'
      );
      return;
    }

    this.loading = true;

    this.service.downloadGLTransactions(params).subscribe({
      next: (response) => {
        this.downloadFile(response.blob, response.filename);
        this.loading = false;
        this.closeModal.emit();
        this.toastr.success('Download started successfully', 'Success');
      },
      error: (error) => {
        this.loading = false;
        this.toastr.error(
          error.error?.message || 'Failed to download transactions',
          'Error'
        );
      },
    });
  }

  private downloadFile(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onClose() {
    this.closeModal.emit();
  }

  // Quick download for today
  quickDownloadToday() {
    const params: {
      account_number: string;
      start_date: string;
      end_date: string;
      format: 'pdf' | 'csv' | 'excel';
    } = {
      account_number: this.accountNumber,
      start_date: this.today,
      end_date: this.today,
      format: 'pdf', // Explicitly type as 'pdf'
    };

    this.loading = true;
    this.service.downloadGLTransactions(params).subscribe({
      next: (response) => {
        this.downloadFile(response.blob, response.filename);
        this.loading = false;
        this.closeModal.emit();
        this.toastr.success("Today's transactions downloaded", 'Success');
      },
      error: (error) => {
        this.loading = false;
        this.toastr.error(
          error.error?.message || 'Failed to download transactions',
          'Error'
        );
      },
    });
  }
}
