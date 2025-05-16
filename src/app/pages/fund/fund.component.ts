import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '@core/services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fund-user',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.scss'],
})
export class FundComponent {
  fundForm: FormGroup;
  userData: any = null;
  isLoading = false;
  validationComplete = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private toastr: ToastrService
  ) {
    this.fundForm = this.fb.group({
      reference: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]],
    });
  }

  validateUser() {
    if (this.fundForm.get('reference')?.invalid) {
      this.fundForm.get('reference')?.markAsTouched();
      return;
    }

    this.isLoading = true;
    this.userData = null;

    this.projectService
      .validateUserByReference(this.fundForm.value.reference)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.status === 'success') {
            this.userData = response.customer;
            this.validationComplete = true;
          } else {
            this.toastr.error(response.message || 'Validation failed');
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.toastr.error(err.error?.message || 'An error occurred');
        },
      });
  }

  fundUser() {
    if (this.fundForm.invalid) {
      this.fundForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.projectService
      .fundUserByReference(
        this.fundForm.value.reference,
        this.fundForm.value.amount
      )
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.status === 'success') {
            this.toastr.success('Wallet funded successfully');
            this.resetForm();
          } else {
            this.toastr.error(response.message || 'Funding failed');
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.toastr.error(err.error?.message || 'An error occurred');
        },
      });
  }

  resetForm() {
    this.fundForm.reset();
    this.userData = null;
    this.validationComplete = false;
  }

  formatAmount(event: any) {
    let value = event.target.value.replace(/,/g, '');
    if (value) {
      value = parseFloat(value).toLocaleString('en-US');
      this.fundForm.patchValue({ amount: value }, { emitEvent: false });
    }
  }
}
