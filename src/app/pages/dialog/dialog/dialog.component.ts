import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '@core/services/project.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  createGl = new FormGroup({
    name: new FormControl('', [Validators.required]),
    number: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    category: new FormControl('', Validators.required),
  });

  errMessage = '';
  submitted = false;

  constructor(
    private route: Router,
    private service: ProjectService,
    private toastr: ToastrService
  ) {}

  add() {
    if (this.createGl.valid) {
      this.service.addNewGl(this.createGl.value).subscribe((result: any) => {
        this.toastr.success(result['message'], '');
        this.route.navigate(['/chart']);
      });
    }
  }
}
