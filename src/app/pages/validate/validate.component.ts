import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '@core/services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-validate-user',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss'],
})
export class ValidateComponent {
  validateForm: FormGroup;
  userData: any = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private toastr: ToastrService
  ) {
    this.validateForm = this.fb.group({
      reference: ['', [Validators.required]],
    });
  }

  validateUser() {
    if (this.validateForm.invalid) {
      this.validateForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.userData = null;

    this.projectService
      .validateUserByReference(this.validateForm.value.reference)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.status === 'success') {
            this.userData = response.customer;
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
}
