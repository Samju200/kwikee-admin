import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showPassword = false;
  isLoading = false;
  loginForm: FormGroup;

  constructor(private auth: AuthenticationService, private router: Router , fb: FormBuilder) {
    this.loginForm = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  ngOnInit(): void {
  }

  get formControls() {
    return this.loginForm.controls;
  }

  handleLogin() {
    Object.values(this.formControls).forEach(control => {
      control.markAsDirty();
      control.updateValueAndValidity()
    })
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginForm.disable();
      this.auth.logUserIn(this.loginForm.value).pipe().subscribe((data: any) => {
        this.loginForm.enable();
        this.router.navigate(['/dashboard']);
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.loginForm.enable()
        if (error.status === 400) {
          Object.keys(this.formControls).forEach(key => {
            this.formControls[key].setErrors({ 'incorrect': true })
          })
        } else if (error.status === 401) {
          Object.keys(this.formControls).forEach(key => {
            this.formControls[key].setErrors({ 'incorrect': true })
          })
        }
      })
    }
  }

}
