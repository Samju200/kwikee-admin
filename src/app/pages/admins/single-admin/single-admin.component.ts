import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { ProjectService } from '@core/services/project.service';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-single-admin',
  templateUrl: './single-admin.component.html',
  styleUrls: ['./single-admin.component.scss'],
})
export class SingleAdminComponent implements OnInit, OnDestroy {
  editUserForm: FormGroup;
  loading = false;
  destroy$ = new Subject<boolean>();
  permissions: Array<string> = [];
  auth_id = '';
  userDetails: any;

  constructor(
    private fb: FormBuilder,
    activatedRoute: ActivatedRoute,
    private router: Router,
    private service: ProjectService,
    private alertService: AlertService
  ) {
    activatedRoute.params.subscribe((data: Params) => {
      this.auth_id = data['id'];
      this.fetchUserDetails();
    });
    this.editUserForm = this.buildForm();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      department: [null, Validators.required],
    });
  }

  setPermission(evt: any, value: any) {
    if (evt === true) {
      this.permissions.push(value);
    } else {
      const index = this.permissions.indexOf(value);
      if (index > -1) {
        this.permissions.splice(index, 1);
      }
    }
  }

  isChecked(permission: string): boolean {
    return this.permissions.includes(permission);
  }

  fetchUserDetails() {
    this.loading = true;
    this.service
      .viewAdminUser(this.auth_id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.userDetails = data.admin_user;
          // Add null check for permissions
          this.permissions = data.permissions
            ? data.permissions.map((item: any) => item.path)
            : [];

          Object.keys(this.editUserForm.controls).forEach((control) => {
            this.editUserForm.patchValue(
              { [control]: this.userDetails[control] },
              { emitEvent: false }
            );
          });
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          // Consider adding error handling here
          this.alertService.error('Failed to fetch user details');
        },
      });
  }

  editUser() {
    if (this.editUserForm.valid) {
      const formValues = this.editUserForm.value;
      const json = {
        ...formValues,
        permission: this.permissions,
        auth_id: this.auth_id,
      };
      this.loading = true;
      this.service
        .editUser(json)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: any) => {
            this.loading = false;
            this.alertService.success(data.message);
            this.router.navigate(['/teams']);
          },
          error: () => (this.loading = false),
        });
    } else {
      Object.values(this.editUserForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
