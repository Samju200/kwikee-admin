import { Inject, Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Notyf } from 'notyf';
import { NOTYF } from 'src/app/shared/utils/notyf.token';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(router: Router, @Inject(NOTYF) private notyf: Notyf) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // this.notyf.dismissAll()
        // if (this.keepAfterNavigationChange) {
        //   // only keep for a single location change
        //   this.keepAfterNavigationChange = false;
        // } else {
        //   // clear alert
        //   this.subject.next();
        // }
      }
    });
  }

  success(message: string) {
    // this.keepAfterNavigationChange = keepAfterNavigationChange;
    // this.subject.next({ type: 'success', text: message });

    this.notyf.success(message)

  }

  error(message: string) {
    this.notyf.error(message)

  }

  info(message: string) {
    this.notyf.error(message)

  }
}
