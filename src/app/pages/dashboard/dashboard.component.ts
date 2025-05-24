import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { ProjectService } from '@core/services/project.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboardData: any;
  lastTransactions: Array<any> = [];
  lastTransactionsCredit: Array<any> = [];
  lastTransactionsKwikmax: Array<any> = [];
  lastTransactionsGoal: Array<any> = [];
  lastApproved: Array<any> = [];
  lastDeclined: Array<any> = [];
  lastPendingUnderwriting: Array<any> = [];
  lastKwikgoals: Array<any> = [];
  lastKwikLite: Array<any> = [];
  lastKwikMax: Array<any> = [];
  destroy$ = new Subject<boolean>();
  isFetchingDashboard = false;
  graphDataAsArray: Array<any> = [];
  graphData: any;
  user: any;
  constructor(
    private service: ProjectService,
    private auth: AuthenticationService
  ) {
    this.user = auth.getCurrentUser();
  }

  ngOnInit(): void {
    this.fetchDashboardLatestData();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  fetchDashboardLatestData() {
    this.isFetchingDashboard = true;
    this.service
      .getDashboardData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.isFetchingDashboard = false;
          this.dashboardData = data;
          this.lastTransactions = data.last_transactions;
          this.lastTransactionsCredit = data.last_transactions_credit;
          this.lastTransactionsKwikmax = data.last_transactions_kwikmax;
          this.lastTransactionsGoal = data.last_transactions_goal;

          this.lastApproved = data.last_approved;
          this.lastDeclined = data.last_declined;
          this.lastPendingUnderwriting = data.last_pending_underwriting;
          this.lastKwikgoals = data.last_kwikgoals;
          this.lastKwikLite = data.last_kwiklite;
          this.lastKwikMax = data.last_kwikmax;
          this.graphData = data.disbursed_last_7_days;
        },
        error: () => (this.isFetchingDashboard = false),
      });
  }
}
