import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '@core/services/project.service';
import { modalOptions } from '@shared/utils/extra';
import * as bootstrap from 'bootstrap';
import Modal from 'bootstrap/js/dist/modal';
import { takeUntil } from 'rxjs';
// import { Modal } from 'bootstrap';

import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss']
})
export class UserReportComponent implements OnInit, OnDestroy, AfterViewInit {
  reportsForm: FormGroup;
  destroy$ = new Subject<boolean>();
  loading = false;
  searchOptionsModal!: bootstrap.Modal;
  allReports: any[] = [];
  allReportsTableData: any;
  pageSize = 15;
  pageIndex = 1;
  totalDataRecord = 0;
  constructor(private service: ProjectService, private fb: FormBuilder) {
    this.reportsForm = this.buildForm();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.searchOptionsModal =  new Modal('#searchOptionsModal', modalOptions);
    this.searchOptionsModal.show();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete()
  }

  buildForm(): FormGroup {
    return this.fb.group({
      start: [null, Validators.required],
      end: [null, Validators.required],
      search_text: [''],
      blacklist: ['0'],
      watchlist: ['0']
    })
  }

  openSearchOptionsModal() {
    this.searchOptionsModal.show();
    this.reportsForm.reset({blacklist: '0', watchlist: '0'});
  }

  closeSearchOptionsModal() {
    this.searchOptionsModal.hide();
    this.loading = false;
  }

  fetchUsersReport() {
    if (this.reportsForm.valid) {
      this.loading = true;
      const params = {
        ...this.reportsForm.value,
      page_size: this.pageSize,
      page: this.pageIndex,
      export: '0'
      }
      this.service.getUsersReport(params).pipe(takeUntil(this.destroy$)).subscribe({
        next: (data: any) => {
          console.log(data)
          this.allReportsTableData = data;
          this.allReports = data.data;
          this.loading = false;
          this.totalDataRecord = data.total;
          this.closeSearchOptionsModal()
        },
        error: () => this.loading = false
      })
    } else {
      Object.values(this.reportsForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true })
        }
      })
    }
  }

  paginateData(page: number) {
    this.pageIndex = page;
    this.fetchUsersReport();
  }

  pageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.pageIndex = 1;
    this.fetchUsersReport();
  }

  exportReports() {
    const params = {
      ...this.reportsForm.value,
    page_size: this.pageSize,
    page: this.pageIndex,
    export: '1'
    }
    this.service.exportUsersReport(params);
  }
}
