import { Component, OnDestroy, OnInit } from '@angular/core';
import { KwikMaxRateService, KwikMaxRate } from '../kwik-max-rate.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-kwik-max-rates',
  templateUrl: './list-kwik-max-rates.component.html',
  styleUrls: ['./list-kwik-max-rates.component.scss'],
})
export class ListKwikMaxRatesComponent implements OnInit, OnDestroy {
  rates: KwikMaxRate[] = [];
  selectedRate: KwikMaxRate = this.initializeEmptyRate();
  loading = false;
  showCreateModal = false;
  showEditModal = false;
  showDeleteModal = false;
  private destroy$ = new Subject<void>();

  constructor(
    private service: KwikMaxRateService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.fetchRates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializeEmptyRate(): KwikMaxRate {
    return {
      id: 0,
      start: 0,
      end: null,
      days_year: 'days',
      rate: 0,
    };
  }

  fetchRates(): void {
    this.loading = true;
    this.service
      .getAllRates()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (rates) => {
          this.rates = rates;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.alertService.error('Failed to load KwikMax rates');
        },
      });
  }

  openModal(type: 'create' | 'edit' | 'delete', rate?: KwikMaxRate): void {
    this.selectedRate = rate ? { ...rate } : this.initializeEmptyRate();

    if (type === 'create') {
      this.showCreateModal = true;
    } else if (type === 'edit') {
      this.showEditModal = true;
    } else if (type === 'delete') {
      this.showDeleteModal = true;
    }
  }

  closeModal(): void {
    this.showCreateModal = false;
    this.showEditModal = false;
    this.showDeleteModal = false;
    setTimeout(() => {
      document.body.classList.remove('modal-open');
      const backdrops = document.getElementsByClassName('modal-backdrop');
      while (backdrops.length > 0) {
        backdrops[0].parentNode?.removeChild(backdrops[0]);
      }
    });
  }

  handleSubmit(action: 'create' | 'update' | 'delete'): void {
    if (action === 'create') {
      this.service
        .createRate(this.selectedRate)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.alertService.success('KwikMax rate created successfully');
            this.fetchRates();
            this.closeModal();
          },
          error: () => {
            this.alertService.error('Failed to create KwikMax rate');
          },
        });
    } else if (action === 'update') {
      this.service
        .updateRate(this.selectedRate.id, this.selectedRate)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.alertService.success('KwikMax rate updated successfully');
            this.fetchRates();
            this.closeModal();
          },
          error: () => {
            this.alertService.error('Failed to update KwikMax rate');
          },
        });
    } else if (action === 'delete') {
      this.service
        .deleteRate(this.selectedRate.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.alertService.success('KwikMax rate deleted successfully');
            this.fetchRates();
            this.closeModal();
          },
          error: () => {
            this.alertService.error('Failed to delete KwikMax rate');
          },
        });
    }
  }
}
