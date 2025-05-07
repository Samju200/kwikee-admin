import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/authentication/authentication.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  user: any
  constructor(private auth: AuthenticationService) {
    this.user = auth.getCurrentUser()
  }

  ngOnInit(): void {
  }

  signOut() {
    this.auth.signOut().then(() => {
      // this.router.navigate(['/auth/login'])
      window.location.href="/login";
    })
  }
}
