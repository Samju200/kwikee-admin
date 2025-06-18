import { Component, OnInit } from '@angular/core';
import { AlertService } from '@core/services/alert.service';
import { ProjectService } from '@core/services/project.service';

@Component({
  selector: 'app-credit-rate',
  templateUrl: './credit-rate.component.html',
  styleUrls: ['./credit-rate.component.scss'],
})
export class CreditRateComponent implements OnInit {
  loanSetting: any = null;
  newDailyRate: number = 0;
  newAfterGraceRate: number = 0;
  loading = false;

  constructor(
    private service: ProjectService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.fetchRates();
  }

  fetchRates(): void {
    this.loading = true;
    this.service.getLoanSettings().subscribe({
      next: (res: any) => {
        this.loanSetting = res;
        console.log('test:', this.loanSetting);
        this.newDailyRate = res?.daily_interest_rate || 0;
        this.newAfterGraceRate = res?.after_grace_interest_rate || 0;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.alertService.error('Failed to fetch loan settings.');
      },
    });
  }

  updateRates(): void {
    this.loading = true;

    const payload = {
      daily_interest_rate: this.newDailyRate,
      after_grace_interest_rate: this.newAfterGraceRate,
    };

    this.service.updateLoanSettings(payload).subscribe({
      next: () => {
        this.alertService.success('Loan settings updated successfully.');
        this.fetchRates();
      },
      error: () => {
        this.loading = false;
        this.alertService.error('Failed to update loan settings.');
      },
    });
  }

  invalidInput(): boolean {
    return this.newDailyRate < 0 || this.newAfterGraceRate < 0;
  }
}
