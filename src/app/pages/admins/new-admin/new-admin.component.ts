import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { ProjectService } from '@core/services/project.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.scss'],
})
export class NewAdminComponent implements OnInit, OnDestroy {
  createUserForm: FormGroup;
  loading = false;
  destroy$ = new Subject<boolean>();

  // Permission options organized by category
  permissionGroups = [
    {
      name: 'Credit',
      permissions: [
        { value: 'loans/list', label: 'List all Credit' },
        { value: 'loan/one', label: 'View one credit' },
        { value: 'loan/cancel', label: 'Cancel Application' },
        { value: 'loan/reject', label: 'Reject Application' },
        { value: 'loan/list/export', label: 'Export Credit Report' },
        { value: 'loan/approve', label: 'Approve Credit' },
        {
          value: 'loan/antifraud/checklist',
          label: 'Perform Antifraud Checklist',
        },
        {
          value: 'loan/underwriting/checklist',
          label: 'Perform Underwriting Checklist',
        },
        {
          value: 'loan/paystack/charge',
          label: 'Charge Paystack Authorization',
        },
        {
          value: 'loan/authorizarion/delete',
          label: 'Delete Paystack Authorization',
        },
        {
          value: 'loan/authorization/request',
          label: 'Request new Card Authorization',
        },
        { value: 'loan/report', label: 'Generate Loan Report' },
        { value: 'loan/user/export', label: 'Generate Users Export' },
        { value: 'loan/users', label: 'List Users' },
        { value: 'loan/transactions/list', label: 'List Transactions' },
        {
          value: 'loan/credit/performance/check',
          label: 'Check Credit Bureau credit performance',
        },
        {
          value: 'loan/credit/report',
          label: 'Get Credit bureau credit report',
        },
        { value: 'loan/repayment/add', label: 'Add credit transaction' },
        { value: 'loan/fullypaid/mark', label: 'Mark as fully paid' },
        { value: 'transaction/decline', label: 'Decline Transaction' },
        { value: 'showuserpin', label: 'View User Pin' },
        {
          value: 'loan/pending/underwriting',
          label: 'Move to pending underwriting',
        },
        { value: 'user/one', label: 'View Single user' },
        { value: 'loan/edit', label: 'Edit Loan' },
      ],
    },
    {
      name: 'Admin',
      permissions: [
        { value: 'admin/account/create', label: 'Create Admin' },
        {
          value: 'admin/account/underwriting/toggle',
          label: 'Mark as Underwriter',
        },
      ],
    },
    {
      name: 'Reports',
      permissions: [
        { value: 'report', label: 'View Reports' },
        { value: 'report-stats', label: 'View Reports & Stats' },
      ],
    },
    {
      name: 'Savings',
      permissions: [
        { value: 'savings/list', label: 'List Savings' },
        { value: 'savings/one', label: 'View one saving' },
        { value: 'savings/cancel', label: 'Cancel Savings' },
        { value: 'savings/kwikgoals/edit', label: 'Edit Kwikgoal' },
        { value: 'savings/kwikmax/edit', label: 'Edit Kwikmax' },
        { value: 'savings/kwikmax/confirm', label: 'Confirm Kwikmax' },
        {
          value: 'savings/paystack/charge',
          label: 'Charge Paystack Authorization for Savings',
        },
        { value: 'savings/cashback/list', label: 'List Cashbacks' },
        { value: 'savings/cashback/one', label: 'View One Cashback' },
        { value: 'savings/cashback/approve', label: 'Approve Cashback' },
        { value: 'savings/cashback/cancel', label: 'Cancel Cashback' },
        { value: 'savings/cashback/close', label: 'Close Cashback' },
        {
          value: 'savings/cashback/transaction/add',
          label: 'Add Cashback Transaction',
        },
      ],
    },
    {
      name: 'Utilities',
      permissions: [
        {
          value: 'user/account/beneficiary/add',
          label: 'Add Beneficiary Account',
        },
        { value: 'transaction/fraud/unmark', label: 'Mark/Unmark as fraud' },
        { value: 'account/blacklist', label: 'Blacklist Customer' },
        { value: 'account/watchlist', label: 'Watchlist Customer' },
        { value: 'company/delete', label: 'Delete Company' },
        { value: 'company/edit', label: 'Edit Company' },
        { value: 'sector/edit', label: 'Edit Sector' },
      ],
    },
  ];

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: ProjectService,
    private alertService: AlertService
  ) {
    this.createUserForm = this.buildForm();
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
      permissions: this.fb.array([]),
    });
  }

  get permissionsArray(): FormArray {
    return this.createUserForm.get('permissions') as FormArray;
  }

  onPermissionChange(event: any, permission: string): void {
    if (event.target.checked) {
      this.permissionsArray.push(this.fb.control(permission));
    } else {
      const index = this.permissionsArray.controls.findIndex(
        (control) => control.value === permission
      );
      if (index >= 0) {
        this.permissionsArray.removeAt(index);
      }
    }
  }

  isPermissionSelected(permission: string): boolean {
    return this.permissionsArray.value.includes(permission);
  }

  addTeamMember() {
    if (this.createUserForm.valid) {
      this.loading = true;
      this.service
        .addUser(this.createUserForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: any) => {
            this.loading = false;
            this.alertService.success(data.message);
            this.router.navigate(['/teams']);
          },
          error: () => {
            this.loading = false;
          },
        });
    } else {
      Object.values(this.createUserForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
