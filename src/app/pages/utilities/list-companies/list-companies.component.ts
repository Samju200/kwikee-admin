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
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.scss'],
})
export class ListCompaniesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('documentInput') documentInput!: ElementRef;
  loadingCompanies = false;
  isLoading = false;
  destroy$ = new Subject<boolean>();
  companiesData: any[] = [];
  allCompaniesTableData: any;
  newCompanyModal!: bootstrap.Modal;
  bulkCompanyModal!: bootstrap.Modal;
  companyForm: FormGroup;
  bulkUploadControl = new FormControl(null, Validators.required)
  selectedFile!: File | Blob;
  arrayBuffer: any;
  allBulkCompanies: any[] = []
  pageSize = 15;
  pageIndex = 1;
  totalDataRecord = 0;
  searchText = '';
  actionType: 'edit' | 'create' = 'create';
  constructor(private service: ProjectService, private alertService: AlertService, private fb: FormBuilder) {
    this.companyForm = this.buildForm();
  }

  ngOnInit(): void {
    this.fetchCompanies()
  }

  ngAfterViewInit(): void {
    this.newCompanyModal = new Modal('#newCompanyModal', modalOptions);
    this.bulkCompanyModal = new Modal('#bulkCompanyModal', modalOptions);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      company_name: [null, Validators.required],
      payday: [null, Validators.required],
      sector_code: [null, Validators.required],
      domain: [null, Validators.required],
      company_id: [null],
      id: [null]
    })
  }

  fetchCompanies() {
    this.loadingCompanies = true;
    const params = {
      search_text: this.searchText,
      page_size: this.pageSize,
      page: this.pageIndex,
    }
    this.service.getCompanies(params).pipe(takeUntil(this.destroy$)).subscribe(
      {
        next: data => {
          this.loadingCompanies = false;
          this.allCompaniesTableData = data;
          this.companiesData = data;
          this.totalDataRecord = data.total
        },
        error: () => this.loadingCompanies = false
      },
    );
  }

  openAddSingleCompanyModal() {
    this.newCompanyModal.show();
    this.actionType = 'create'
  }

  closeAddSingleCompanyModal() {
    this.newCompanyModal.hide();
    this.companyForm.reset();
    this.isLoading = false;
  }

  addCompany() {
    if (this.companyForm.valid) {
      this.isLoading = true
      this.service.updateCompanies(this.companyForm.value).pipe(takeUntil(this.destroy$)).subscribe(
        {
          next: data => {
            this.alertService.success(data.message);
            this.fetchCompanies();
            this.closeAddSingleCompanyModal()
            this.isLoading = false;
          }, error: (data: any) => {
            this.alertService.success(data.message);
            this.fetchCompanies();
            this.isLoading = false;
          }
        })
    } else {
      Object.values(this.companyForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true })
        }
      })
    }
  }

  openBulkUploadModal() {
    this.bulkCompanyModal.show();
  }

  closeBulkUploadModal() {
    this.bulkCompanyModal.hide();
    this.bulkUploadControl.reset();
    this.isLoading = false;
    if (this.documentInput) {
      this.documentInput.nativeElement.value = '';
    }
  }

  viewBulkCompanies() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const param = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.allBulkCompanies = param;
      console.log(param)
    };
    fileReader.readAsArrayBuffer(this.selectedFile);
  }

  onInputChange(e: any) {
    this.selectedFile = e.target.files[0];
    this.viewBulkCompanies();
  }

  addBulkCompanies() {
    if (this.bulkUploadControl.valid) {
      this.service.addBulkCompanies(this.allBulkCompanies).pipe(takeUntil(this.destroy$)).subscribe({
        next: data => {
          this.isLoading = false;
          this.closeBulkUploadModal()
          this.alertService.success(data.message);
          this.fetchCompanies();
        }, error: () => this.isLoading = false
      })
    } else {
      this.bulkUploadControl.markAsDirty();
      this.bulkUploadControl.updateValueAndValidity()
    }
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

  populateFormForEdit(company: any) {
    Object.keys(company).forEach(key => {
      this.companyForm.patchValue({ [key]: company[key] })
    })
    this.openAddSingleCompanyModal();
    this.actionType = 'edit'
  }

  deleteCompany(id: string) {
    if (confirm('Are you sure?')) {
      this.loadingCompanies = true
      this.service.deleteCompany(id).pipe(takeUntil(this.destroy$)).subscribe({
        next: data => {
          this.loadingCompanies = false;
          this.alertService.success(data.message);
          this.fetchCompanies();
        }, error: () => this.loadingCompanies = false
      })
    }
  }

  blacklistCompany(company_id: string) {
    if (confirm('Are you sure?')) {
      this.loadingCompanies = true
      this.service.blacklistCompany(company_id).pipe(takeUntil(this.destroy$)).subscribe({
        next: data => {
          this.loadingCompanies = false;
          this.alertService.success(data.message);
          this.fetchCompanies();
        }, error: () => this.loadingCompanies = false
      })
    }
  }
}
