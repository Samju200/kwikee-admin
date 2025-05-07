import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreditScoreRangeService } from '../credit-score-range.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { Subject, takeUntil } from 'rxjs';

interface CreditScoreRange {
  id: number;
  min_score: number;
  max_score: number | null;
  credit_amount: number;
}

@Component({
  selector: 'app-list-credit-score-ranges',
  templateUrl: './list-credit-score-ranges.component.html',
  styleUrls: ['./list-credit-score-ranges.component.scss'],
})
export class ListCreditScoreRangesComponent implements OnInit, OnDestroy {
  creditScoreRanges: CreditScoreRange[] = [];
  selectedRange: CreditScoreRange = this.initializeEmptyRange();
  loading = false;
  showCreateModal = false;
  showEditModal = false;
  showDeleteModal = false;
  private destroy$ = new Subject<void>();

  constructor(
    private service: CreditScoreRangeService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.fetchCreditScoreRanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializeEmptyRange(): CreditScoreRange {
    return {
      id: 0,
      min_score: 0,
      max_score: null,
      credit_amount: 0,
    };
  }

  fetchCreditScoreRanges(): void {
    this.loading = true;
    this.service
      .fetchAllCreditScoreRanges()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (ranges) => {
          this.creditScoreRanges = ranges;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.alertService.error('Failed to load credit score ranges');
        },
      });
  }

  openModal(
    type: 'create' | 'edit' | 'delete',
    range?: CreditScoreRange
  ): void {
    this.selectedRange = range ? { ...range } : this.initializeEmptyRange();

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
    // Force change detection
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
        .createCreditScoreRange(this.selectedRange)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.alertService.success(
              'Credit score range created successfully'
            );
            this.fetchCreditScoreRanges();
            this.closeModal();
          },
          error: () => {
            this.alertService.error('Failed to create credit score range');
          },
        });
    } else if (action === 'update') {
      this.service
        .updateCreditScoreRange(this.selectedRange.id, this.selectedRange)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.alertService.success(
              'Credit score range updated successfully'
            );
            this.fetchCreditScoreRanges();
            this.closeModal();
          },
          error: () => {
            this.alertService.error('Failed to update credit score range');
          },
        });
    } else if (action === 'delete') {
      this.service
        .deleteCreditScoreRange(this.selectedRange.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.alertService.success(
              'Credit score range deleted successfully'
            );
            this.fetchCreditScoreRanges();
            this.closeModal();
          },
          error: () => {
            this.alertService.error('Failed to delete credit score range');
          },
        });
    }
  }
}
