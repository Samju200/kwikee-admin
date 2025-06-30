import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MandateService } from '@core/services/mandate.service';
import { AlertService } from '@core/services/alert.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Mandate, Transaction } from '@shared/models/mandate.model';

@Component({
  selector: 'app-single-mandate',
  templateUrl: './single-mandate.component.html',
  styleUrls: ['./single-mandate.component.scss'],
})
export class SingleMandateComponent implements OnInit, OnDestroy {
  mandateId: string = '';
  mandate: Mandate | null = null;
  transactions: Transaction[] = [];
  loading = false;
  private destroy$ = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mandateService: MandateService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.mandateId = params['id'];
      this.loadMandateData();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  loadMandateData(): void {
    this.fetchMandateDetails();
    // this.fetchTransactions();
  }

  fetchMandateDetails(): void {
    this.loading = true;
    this.mandateService
      .getMandate(this.mandateId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.mandate = response.data.data;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          this.alertService.error(
            error.message || 'Failed to load mandate details'
          );
          this.router.navigate(['/mandate']); // Updated to match your route
        },
      });
  }

  fetchTransactions(): void {
    this.mandateService
      .getMandatePaymentHistory(this.mandateId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.transactions = response.data.data;
        },
        error: (error) => {
          this.alertService.error(
            error.message || 'Failed to load transactions'
          );
        },
      });
  }

  // Status display helpers
  getStatusDisplay(status: string): string {
    const statusMap: Record<string, string> = {
      approved: 'Active',
      awaiting_authorization: 'Pending Authorization',
      cancelled: 'Cancelled',
      paused: 'Paused',
    };
    return statusMap[status] || status;
  }

  getStatusClass(status: string): string {
    const classMap: Record<string, string> = {
      approved: 'bg-success',
      awaiting_authorization: 'bg-warning',
      cancelled: 'bg-danger',
      paused: 'bg-secondary',
    };
    return classMap[status] || 'bg-info';
  }

  getDebitTypeDisplay(type: string): string {
    return type === 'variable' ? 'Variable Amount' : 'Fixed Amount';
  }

  getMandateTypeDisplay(type: string): string {
    return type === 'emandate' ? 'E-Mandate' : 'Paper Mandate';
  }

  // Mandate actions
  pauseMandate(): void {
    if (confirm('Are you sure you want to pause this mandate?')) {
      this.executeMandateAction(
        this.mandateService.pauseMandate(this.mandateId),
        'Mandate paused successfully'
      );
    }
  }

  reinstateMandate(): void {
    this.executeMandateAction(
      this.mandateService.reinstateMandate(this.mandateId),
      'Mandate reinstated successfully'
    );
  }

  cancelMandate(): void {
    if (
      confirm(
        'Are you sure you want to cancel this mandate? This action cannot be undone.'
      )
    ) {
      this.executeMandateAction(
        this.mandateService.cancelMandate(this.mandateId),
        'Mandate cancelled successfully'
      );
    }
  }

  private executeMandateAction(
    action$: Observable<any>,
    successMessage: string
  ): void {
    this.loading = true;
    action$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.alertService.success(successMessage);
        this.fetchMandateDetails();
      },
      error: (error) => {
        this.loading = false;
        this.alertService.error(error.message || 'Action failed');
      },
    });
  }
}
