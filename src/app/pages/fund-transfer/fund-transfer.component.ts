import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '@core/services/project.service';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.scss'],
})
export class FundTransferComponent {
  validateForm: FormGroup;
  validatedUser: any = null;
  isValidationLoading = false;

  fundWalletForm: FormGroup;
  fundCreditForm: FormGroup;
  isFundingLoading = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private alertService: AlertService
  ) {
    this.validateForm = this.fb.group({
      reference: ['', [Validators.required]],
    });

    this.fundWalletForm = this.fb.group({
      reference: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]],
    });

    this.fundCreditForm = this.fb.group({
      reference: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]],
    });
  }

  validateUser() {
    if (this.validateForm.invalid) {
      this.validateForm.markAllAsTouched();
      return;
    }

    this.isValidationLoading = true;
    this.validatedUser = null;

    this.projectService
      .validateUserByReference(this.validateForm.value.reference)
      .subscribe({
        next: (response: any) => {
          this.isValidationLoading = false;
          if (response.status === 'success') {
            this.validatedUser = response.customer;
            // Auto-fill the reference in both funding forms
            this.fundWalletForm.patchValue({
              reference: this.validateForm.value.reference,
            });
            this.fundCreditForm.patchValue({
              reference: this.validateForm.value.reference,
            });
          } else {
            this.toastr.error(response.message || 'Validation failed');
          }
        },
        error: (err: any) => {
          this.isValidationLoading = false;
          this.toastr.error(err.error?.message || 'An error occurred');
        },
      });
  }

  fundUser() {
    if (this.fundWalletForm.invalid) {
      this.fundWalletForm.markAllAsTouched();
      return;
    }

    this.isFundingLoading = true;

    this.projectService
      .fundUserByReference(
        this.fundWalletForm.value.reference,
        this.fundWalletForm.value.amount
      )
      .subscribe({
        next: (response: any) => {
          this.isFundingLoading = false;
          if (response.status === 'success') {
            this.resetForm('wallet');
            this.toastr.success('Wallet funded successfully');
            this.alertService.success('Wallet funded successfully');
          } else {
            this.toastr.error(response.message || 'Funding failed');
          }
        },
        error: (err: any) => {
          this.isFundingLoading = false;
          this.toastr.error(err.error?.message || 'An error occurred');
        },
      });
  }

  fundUserCredit() {
    if (this.fundCreditForm.invalid) {
      this.fundCreditForm.markAllAsTouched();
      return;
    }

    this.isFundingLoading = true;

    this.projectService
      .fundUserCreditByReference(
        this.fundCreditForm.value.reference,
        this.fundCreditForm.value.amount
      )
      .subscribe({
        next: (response: any) => {
          this.isFundingLoading = false;
          if (response.status === 'success') {
            this.resetForm('credit');
            this.toastr.success('Credit funded successfully');
            this.alertService.success('Credit funded successfully');
          } else {
            this.toastr.error(response.message || 'Funding failed');
          }
        },
        error: (err: any) => {
          this.isFundingLoading = false;
          this.toastr.error(err.error?.message || 'An error occurred');
        },
      });
  }

  resetForm(type: 'wallet' | 'credit' | 'all') {
    if (type === 'wallet') {
      this.fundWalletForm.reset();
    } else if (type === 'credit') {
      this.fundCreditForm.reset();
    } else {
      this.validateForm.reset();
      this.fundWalletForm.reset();
      this.fundCreditForm.reset();
      this.validatedUser = null;
    }

    // If validated user exists, repopulate the reference fields
    if (this.validatedUser && type !== 'all') {
      this.fundWalletForm.patchValue({
        reference: this.validateForm.value.reference,
      });
      this.fundCreditForm.patchValue({
        reference: this.validateForm.value.reference,
      });
    }
  }

  formatAmount(event: any, type: 'wallet' | 'credit') {
    let value = event.target.value.replace(/,/g, '');
    if (value) {
      value = parseFloat(value).toLocaleString('en-US');
      if (type === 'wallet') {
        this.fundWalletForm.patchValue({ amount: value }, { emitEvent: false });
      } else {
        this.fundCreditForm.patchValue({ amount: value }, { emitEvent: false });
      }
    }
  }
}
