import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@core/services/alert.service';
import { ProjectService } from '@core/services/project.service';
import { modalOptions } from '@shared/utils/extra';
import Modal from 'bootstrap/js/dist/modal';
import { Subject, takeUntil } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-pending-companies.component.html',
  styleUrls: ['./list-pending-companies.component.scss'],
})
export class ListPendingCompanies implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('documentInput') documentInput!: ElementRef;
  loadingCompanies = false;
  isLoading = false;
  destroy$ = new Subject<boolean>();
  companiesData: any[] = [];
  allCompaniesTableData: any;
  declineCompanyModal!: bootstrap.Modal;
  declineControl = new FormControl('', Validators.required)
  pageSize = 15;
  pageIndex = 1;
  totalDataRecord = 0;
  searchText = '';
  company_id: any;
  viewCompanyModal?: Modal;
  companyDetails: any;
  table_id?: string;
  constructor(private service: ProjectService, private alertService: AlertService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.fetchCompanies()
  }

  ngAfterViewInit(): void {
    this.declineCompanyModal = new Modal('#declineCompanyModal', modalOptions);
    this.viewCompanyModal = new Modal('#viewCompanyModal', modalOptions);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  fetchCompanies() {
    this.loadingCompanies = true;
    const params = {
      search_text: this.searchText,
      page_size: this.pageSize,
      page: this.pageIndex,
    }
    this.service.getPendingCompanies(params).pipe(takeUntil(this.destroy$)).subscribe(
      {
        next: data => {
          this.loadingCompanies = false;
          // this.allCompaniesTableData = data;
          this.companiesData = data;
          // this.totalDataRecord = data.total
        },
        error: () => this.loadingCompanies = false
      },
    );
  }

  openDeclineCompanyModal(id?: string) {
    this.table_id = id;
    this.declineCompanyModal.show();
    this.viewCompanyModal?.hide();
  }

  closeDeclineCompanyModal() {
    this.declineCompanyModal.hide();
    this.declineControl.reset();
    this.isLoading = false;
  }

  declineCompany() {
    if (this.declineControl.valid) {
      this.isLoading = true
      const params = {
        id: this.table_id,
        decline_reason: this.declineControl.value
      }
      this.service.declineCompany(params).pipe(takeUntil(this.destroy$)).subscribe(
        {
          next: data => {
            this.alertService.success(data.message);
            this.fetchCompanies();
            this.closeDeclineCompanyModal()
            this.isLoading = false;
          }, error: (data: any) => {
            this.alertService.success(data.message);
            this.fetchCompanies();
            this.isLoading = false;
          }
        })
    } else {
      this.declineControl.markAsDirty();
      this.declineControl.updateValueAndValidity()
    }
  }


  approveCompany() {
    if (confirm('Are you sure?')) {
      this.loadingCompanies = true
      this.service.approveCompany(this.table_id!).pipe(takeUntil(this.destroy$)).subscribe({
        next: data => {
          this.loadingCompanies = false;
          this.alertService.success(data.message);
          this.fetchCompanies();
        }, error: () => this.loadingCompanies = false
      })
    }
  }

  openApprovalModalDetails(company_id: string, id: string) {
    this.company_id = company_id;
    this.table_id = id;
    this.loadingCompanies = true;
      this.service.viewApprovalDetails(company_id).pipe(takeUntil(this.destroy$)).subscribe({
        next: (data: any) => {
          this.loadingCompanies = false;
          // this.alertService.success(data.message);
          // this.fetchCompanies();
          console.log(this.company_id, this.table_id);
          this.companyDetails = data.data;
          this.viewCompanyModal?.show();
        }, error: () => this.loadingCompanies = false
      })
  }

  closeDetailsModal() {
    this.viewCompanyModal?.hide();
  }


  searchCompanies(search: string) {
    this.searchText = search;
    this.fetchCompanies();
  }


  paginateData(page: number) {
    this.pageIndex = page;
    this.fetchCompanies();
  }

  pageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.pageIndex = 1;
    this.fetchCompanies();
  }
}
