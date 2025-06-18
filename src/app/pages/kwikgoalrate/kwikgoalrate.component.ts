import { Component, OnInit } from '@angular/core';
import { ProjectService } from '@core/services/project.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-kwikgoalrate',
  templateUrl: './kwikgoalrate.component.html',
  styleUrls: ['./kwikgoalrate.component.scss'],
})
export class KwikgoalrateComponent implements OnInit {
  currentRate: number | null = null;
  newRate: number = 0;
  loading = false;

  constructor(
    private service: ProjectService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.fetchCurrentRate();
  }

  fetchCurrentRate(): void {
    this.loading = true;
    this.service.getCurrentRate().subscribe({
      next: (response: any) => {
        this.currentRate = response.data?.current_rate || null;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.alertService.error('Failed to load KwikGoal rate');
      },
    });
  }

  updateRate(): void {
    if (this.newRate < 0) {
      this.alertService.error('Rate cannot be negative');
      return;
    }

    this.loading = true;
    this.service.updateRate(this.newRate).subscribe({
      next: () => {
        this.alertService.success('KwikGoal rate updated successfully');
        this.fetchCurrentRate();
        this.newRate = 0;
      },
      error: () => {
        this.loading = false;
        this.alertService.error('Failed to update KwikGoal rate');
      },
    });
  }
}
