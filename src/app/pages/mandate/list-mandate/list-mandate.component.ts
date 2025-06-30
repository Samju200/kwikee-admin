import { Component, OnInit, OnDestroy } from '@angular/core';
import { MandateService } from '@core/services/mandate.service';
import { AlertService } from '@core/services/alert.service';
import { Subject, takeUntil } from 'rxjs';
import { Mandate } from '@shared/models/mandate.model';

@Component({
  selector: 'app-list-mandate',
  templateUrl: './list-mandate.component.html',
  styleUrls: ['./list-mandate.component.scss'],
})
export class ListMandateComponent implements OnInit, OnDestroy {
  // Pagination settings
  currentPage = 1;
  itemsPerPage = 10;
  pageSizeOptions = [5, 10, 20, 50];

  // Data properties
  allMandates: Mandate[] = [];
  filteredMandates: Mandate[] = [];
  displayedMandates: Mandate[] = [];

  // UI state
  loading = false;
  searchTerm = '';

  private destroy$ = new Subject<boolean>();

  constructor(
    private mandateService: MandateService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadMandates();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  loadMandates(): void {
    this.loading = true;
    this.mandateService
      .getAllMandates({})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.allMandates = response.data.data || [];
          this.applyFilters();
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          this.alertService.error(error.message || 'Failed to load mandates');
        },
      });
  }

  applyFilters(): void {
    // Apply search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      this.filteredMandates = this.allMandates.filter(
        (mandate) =>
          mandate.reference.toLowerCase().includes(term) ||
          mandate.account_name.toLowerCase().includes(term) ||
          mandate.account_number.includes(this.searchTerm) ||
          mandate.nibss_code.toLowerCase().includes(term)
      );
    } else {
      this.filteredMandates = [...this.allMandates];
    }

    // Reset to first page when filters change
    this.currentPage = 1;

    // Update pagination
    this.updateDisplayedMandates();
  }

  updateDisplayedMandates(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedMandates = this.filteredMandates.slice(startIndex, endIndex);
  }

  onSearch(): void {
    this.applyFilters();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateDisplayedMandates();
  }

  onPageSizeChange(size: number): void {
    this.itemsPerPage = size;
    this.currentPage = 1;
    this.updateDisplayedMandates();
  }

  getStatusClass(status: string): string {
    const statusClasses: Record<string, string> = {
      approved: 'bg-success',
      awaiting_authorization: 'bg-warning',
      cancelled: 'bg-danger',
      paused: 'bg-secondary',
    };
    return statusClasses[status] || 'bg-info';
  }

  getStatusDisplay(status: string): string {
    const statusDisplay: Record<string, string> = {
      approved: 'Active',
      awaiting_authorization: 'Pending',
      cancelled: 'Cancelled',
      paused: 'Paused',
    };
    return statusDisplay[status] || status;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredMandates.length / this.itemsPerPage);
  }

  get totalItems(): number {
    return this.filteredMandates.length;
  }
  // getMin(a: number, b: number): number {
  //   return Math.min(a, b);
  // }
  Math = Math;
}
