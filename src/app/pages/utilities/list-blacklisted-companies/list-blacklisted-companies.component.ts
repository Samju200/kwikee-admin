import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertService } from '@core/services/alert.service';
import { ProjectService } from '@core/services/project.service';
import { modalOptions } from '@shared/utils/extra';
import { Modal } from 'bootstrap';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-blacklisted-companies',
  templateUrl: './list-blacklisted-companies.component.html',
  styleUrls: ['./list-blacklisted-companies.component.scss']
})
export class ListBlacklistedCompaniesComponent implements OnInit {

  loadingCompanies = false;
  isLoading = false;
  destroy$ = new Subject<boolean>();
  companiesData: any[] = [];
  allCompaniesTableData: any;
  pageSize = 15;
  pageIndex = 1;
  totalDataRecord = 0;
  searchText = '';
  company_id: any;
  companyDetails: any;
  table_id?: string;
  constructor(private service: ProjectService, private alertService: AlertService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.fetchCompanies();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  searchCompanies(search: string) {
    this.searchText = search;
    this.fetchCompanies();
  }

  fetchCompanies() {
    this.loadingCompanies = true;
    const params = {
      search_text: this.searchText,
      page_size: this.pageSize,
      page: this.pageIndex,
    }
    this.service.getBlacklistedCompanies(params).pipe(takeUntil(this.destroy$)).subscribe(
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

  whitelistCompany(company_id: string) {
    if (confirm('Are you sure?')) {
      this.loadingCompanies = true
      this.service.whitelistCompany(company_id).pipe(takeUntil(this.destroy$)).subscribe({
        next: data => {
          this.loadingCompanies = false;
          this.alertService.success(data.message);
          this.fetchCompanies();
        }, error: () => this.loadingCompanies = false
      })
    }
  }

}
