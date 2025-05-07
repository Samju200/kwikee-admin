import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '@core/services/project.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loans-report',
  templateUrl: './loans-report.component.html',
  styleUrls: ['./loans-report.component.scss']
})
export class LoansReportComponent implements OnInit, OnDestroy {
  reportsForm: FormGroup;
  destroy$ = new Subject<boolean>();
  loading = false;
  constructor(private service: ProjectService, private fb: FormBuilder) {
    this.reportsForm = this.buildForm();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete()
  }

  buildForm(): FormGroup {
    return this.fb.group({
      start: [null, Validators.required],
      end: [null, Validators.required]
    })
  }

  exportReports() {
    if (this.reportsForm.valid) {
      this.service.getLoansReport(this.reportsForm.value)
    } else {
      Object.values(this.reportsForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true })
        }
      })
    }
  }
}
