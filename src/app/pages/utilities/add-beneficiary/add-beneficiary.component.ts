import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@core/services/alert.service';
import { ProjectService } from '@core/services/project.service';
import { banks } from '@shared/utils/banks';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.scss']
})
export class AddBeneficiaryComponent implements OnInit, OnDestroy {
  addBeneficiaryForm: FormGroup;
  destroy$ = new Subject<boolean>();
  loading = false;
  banks = banks.sort((a, b) => a.name.localeCompare(b.name))
  constructor(private fb: FormBuilder, private alertService: AlertService, private service: ProjectService) {
    this.addBeneficiaryForm = this.buildForm();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete()
  }

  buildForm(): FormGroup {
    return this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      accountnumber: [null, Validators.required],
      bankcode: [null, Validators.required]
    })
  }

  addBeneficiary() {
    if (this.addBeneficiaryForm.valid) {
      this.loading = true;
      this.service.addBeneficiaryAccount(this.addBeneficiaryForm.value).pipe(takeUntil(this.destroy$)).subscribe({
        next: data => {
          this.alertService.success(data.message);
          this.addBeneficiaryForm.reset();
          this.loading = false;
        }, error: () => this.loading = false
      })
    } else {
      Object.values(this.addBeneficiaryForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true })
        }
      })
    }
  }
}
