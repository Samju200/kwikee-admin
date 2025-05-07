import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@core/services/alert.service';
import { ProjectService } from '@core/services/project.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-push-notifications',
  templateUrl: './push-notifications.component.html',
  styleUrls: ['./push-notifications.component.scss']
})
export class PushNotificationsComponent implements OnInit, OnDestroy {
  sendNotificationsForm: FormGroup;
  destroy$ = new Subject<boolean>();
  loading = false;
  constructor(private fb: FormBuilder, private alertService: AlertService, private service: ProjectService) {
    this.sendNotificationsForm = this.buildNotificationsForm();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete()
  }

  buildNotificationsForm(): FormGroup {
    return this.fb.group({
      title: [null, Validators.required],
      message: [null, Validators.required],
    })
  }

  sendNotification() {
    if (this.sendNotificationsForm.valid) {
      this.loading = true;
      this.service.sendPushNotifications(this.sendNotificationsForm.value).subscribe({
        next: data => {
          this.loading = false;
          this.alertService.success(data.message);
          this.sendNotificationsForm.reset();
        },
        error: () => {
          this.loading = false;
        }
      });
    } else {
      Object.values(this.sendNotificationsForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true })
        }
      })
    }
  }
}
