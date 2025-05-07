import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { ProjectService } from '@core/services/project.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-referral-report',
  templateUrl: './referral-report.component.html',
  styleUrls: ['./referral-report.component.scss']
})
export class ReferralReportComponent implements OnInit {
  pageSize = 15;
  pageIndex = 1;
  totalDataRecord = 0;
  searchText = '';
  allReferralCodesData: Array<any> = [];
  allReferralCodesTableData: any;
  loading = true;
  destroy$ = new Subject<boolean>();
  setOfCheckedId = new Set<string>();
  allChecked = false;
  indeterminate = false;

  constructor(private service: ProjectService, private chref: ChangeDetectorRef, private router: Router, private alertService: AlertService,) { }

  ngOnInit(): void {
    this.fetchReport();
  }

  fetchReport() {
    this.loading = true;
    const params = {
      page_size: this.pageSize,
      search_text: this.searchText,
      page: this.pageIndex
    }
    this.service.fetchReferrals(params).pipe(takeUntil(this.destroy$)).subscribe(
      {
        next: (data: any) => {
          this.loading = false;
          this.allReferralCodesTableData = data;
          this.allReferralCodesData = data.accounts;
          this.totalDataRecord = data.total
        },
        error: () => this.loading = false
      })
  }

  searchLoans(search: string) {
    this.searchText = search;
    this.fetchReport();
  }

  paginateData(page: number) {
    this.pageIndex = page;
    this.fetchReport();
  }

  pageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.pageIndex = 1;
    this.fetchReport();
  }

  updateCheckedSet(reference: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(reference);
    } else {
      this.setOfCheckedId.delete(reference);
    }
  }

  refreshCheckedStatus(): void {
    this.allChecked = this.allReferralCodesData.every(({ referral_code }) => this.setOfCheckedId.has(referral_code));
    this.indeterminate = this.allReferralCodesData.some(({ referral_code }) => this.setOfCheckedId.has(referral_code)) && !this.allChecked;
    console.log(this.setOfCheckedId)
    this.chref.detectChanges();
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.allReferralCodesData.forEach(({ referral_code }) => this.updateCheckedSet(referral_code!, checked));
    this.refreshCheckedStatus();
  }


  payCustomers() {
    if (confirm("Are you sure?")) {
      const params = {
        reference: Array.from(this.setOfCheckedId)
      }
      this.loading = true;
      this.service.payOutReferrals(params).pipe(takeUntil(this.destroy$)).subscribe({
        next: (data: any) => {
          this.loading = false;
          this.alertService.success(data.message)
          this.fetchReport();
        },
        error: () => {
          this.loading = false;
        }
      })
    }
  }

}
