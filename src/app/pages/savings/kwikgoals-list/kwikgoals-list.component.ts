import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProjectService } from '@core/services/project.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-kwikgoals-list',
  templateUrl: './kwikgoals-list.component.html',
  styleUrls: ['./kwikgoals-list.component.scss']
})
export class KwikgoalsListComponent implements OnInit {
  pageSize = 15;
  pageIndex = 1;
  totalDataRecord = 0;
  searchText = '';
  allSavingsData: Array<any> = [];
  allSavingsTableData: any;
  loading = true;
  status = '1'
  fraud: string | undefined = undefined;
  type = '1';
  destroy$ = new Subject<boolean>();

  constructor(private service: ProjectService, private activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.queryParams.subscribe((param: Params) => {
      this.status = param['status'] ? param['status'] : '1'
      this.fetchKwikGoalSavings()
    })
  }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  fetchKwikGoalSavings() {
    this.loading = true;
    const params = {
      status:this.status,
      no_per_page: this.pageIndex,
      search: this.searchText,
    }
    this.service.fetchKwikGoalSavings(params).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.loading = false;
      this.allSavingsTableData = data.data;
      this.allSavingsData = data.data.data;
      console.log(this.allSavingsData);
      this.totalDataRecord = data.data.total
    }, () => this.loading = false)
  }

  filterProductType(type: string) {
    this.type = type;
    this.fetchKwikGoalSavings();
  }

  exportKwikGoalList() {
    const params = {
      status: this.status,
    };
    this.service.exportKwikGoalList(params)
  }

  searchSavings(search: string) {
    this.searchText = search;
    this.fetchKwikGoalSavings();
  }

  paginateData(page: number) {
    this.pageIndex = page;
    this.fetchKwikGoalSavings();
  }

  pageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.pageIndex = 1;
    this.fetchKwikGoalSavings();
  }

  filterStatus(status: string | undefined) {
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { status } });
  }


}
