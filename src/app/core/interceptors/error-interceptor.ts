import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { AlertService } from '@core/alert/alert.service';
import { AlertService } from '@core/services/alert.service';
import { environment } from '@environment/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService, private activatedRoute: ActivatedRoute, private alertService: AlertService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let snapShot = this.activatedRoute.snapshot as any;
        const url: string = snapShot['_routerState'].url;
        return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
            if (!url.includes('/login')) {
                if (error.status === 401) {
                    this.alertService.error(error.error.message)
                    this.authService.signOut().then(() => {
                        // this.router.navigate(['/auth/login'])
                        window.location.href = "/login";
                    })
                } else if (error.status === 500) {
                    this.alertService.error('Unknown Server Error')
                    // this.router.navigate(['/error'])
                    // if (environment.production) {
                    //     this.router.navigate(['/error'])
                    // } else {
                    //     this.alertService.error('Unknown Error')
                    // }
                } else {
                    this.alertService.error(error.error.message)
                }
            } else {

            }
            return throwError(error)
        }));
    }
}
