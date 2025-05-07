import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectService } from '@core/services/project.service';
import { AlertService } from '@core/services/alert.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-admins',
  templateUrl: './list-admins.component.html',
  styleUrls: ['./list-admins.component.scss'],
})
export class ListAdminsComponent implements OnInit, OnDestroy {
  pageSize = 15;
  pageIndex = 1;
  totalDataRecord = 0;
  searchText = '';
  allUsersData: Array<any> = [];
  allUsersTableData: any;
  loading = false;
  destroy$ = new Subject<boolean>();
  constructor(
    private service: ProjectService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.fetchAdminUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  fetchAdminUsers() {
    this.loading = true;
    const params = {
      page_size: this.pageSize,
      search_text: this.searchText,
      page: this.pageIndex,
    };
    this.service
      .getAdminUsers(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.loading = false;
          this.allUsersTableData = data;
          this.allUsersData = data.data;
          this.totalDataRecord = data.total;
        },
        error: () => (this.loading = false),
      });
  }

  deleteUser(auth_id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.loading = true;
      this.service
        .deleteAdminUser(auth_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: any) => {
            this.loading = false;
            // Show success alert
            this.alertService.success('User deleted successfully');
            // Instead of using the response data, fetch the updated list
            this.fetchAdminUsers();

            // Optional: Show a success message
            // this.alertService.success('User deleted successfully');
          },
          error: () => {
            this.loading = false;
            // Optional: Show an error message
            this.alertService.error('Failed to delete user');
          },
        });
    }
  }

  searchTeams(search: string) {
    this.searchText = search;
    this.fetchAdminUsers();
  }

  paginateData(page: number) {
    this.pageIndex = page;
    this.fetchAdminUsers();
  }

  pageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.pageIndex = 1;
    this.fetchAdminUsers();
  }
}
