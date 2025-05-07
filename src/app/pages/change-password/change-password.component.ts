import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@core/services/alert.service';
import { ProjectService } from '@core/services/project.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  changePasswordForm: FormGroup;
  destroy$ = new Subject<boolean>();
  loading = false;
  constructor(private fb: FormBuilder, private alertService: AlertService, private service: ProjectService) {
    this.changePasswordForm = this.buildForm();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete()
  }

  buildForm(): FormGroup {
    return this.fb.group({
      password: [null, Validators.required],
      password_confirmation: [null, this.confirmationValidator],
    })
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.changePasswordForm.controls['password_confirmation'].updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.changePasswordForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  changePassword() {
    if (this.changePasswordForm.valid) {
      this.loading = true;
      this.service.changeAccountPassword(this.changePasswordForm.value).pipe(takeUntil(this.destroy$)).subscribe({
        next: data => {
          this.loading = false;
          this.alertService.success(data.message);
        },
        error: err => {
          this.loading = false;
        }
      });
    } else {
      Object.values(this.changePasswordForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true })
        }
      })
    }
  }
}
