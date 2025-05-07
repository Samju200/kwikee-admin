import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { map, switchMap, take, takeUntil } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userToken = this.auth.getToken();
        let headers = req.headers;
        if (req.url.includes('borrower') || req.url.includes('loan') || req.url.includes('user')) {
            headers = headers.delete('content-type');
        } else {
            headers = headers.set('Content-Type', 'application/json');
        }
        if (userToken) {
            headers = headers.set('Authorization', `Bearer ${userToken}`);

            const cloneReq = req.clone({ headers });
            return next.handle(cloneReq);
        } else {
            return next.handle(req);
        }
    }
}
