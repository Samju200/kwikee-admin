import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { shareReplay, take, tap } from 'rxjs/operators';
import * as moment from "moment";

const TOKEN_KEY = 'kwikeeadmin_token';
const USER_KEY = 'kwikeeadmin';
const CURRENCY_KEY = 'kwikeeadmin_currency';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  async signOut() {
    // this.httpCancelService.cancelPendingRequests();
    // this.httpCancelService.onCancelPendingRequests();
    await localStorage.clear();
  }

  storeToken(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  storeCurrentUser(user: any) {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  async storeCurrency(currency: string) {
    localStorage.removeItem(CURRENCY_KEY);
    await localStorage.setItem(CURRENCY_KEY, JSON.stringify(currency));
  }

  getCurrentUser(): any  {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  getCurrency(): string {
    const currency = localStorage.getItem(CURRENCY_KEY);
    if (currency) {
      return JSON.parse(currency);
    }
    return ' ';
  }

  logUserIn(user: any) {
    return this.http.post<any>(`${environment.baseUrl}admin/account/login`, user).pipe(tap((res) => this.setSession(res)), shareReplay())
  }

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expires_in, 'minutes');
    localStorage.setItem(TOKEN_KEY, authResult.access_token);
    localStorage.setItem("kwikeeadmin_expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem(USER_KEY, JSON.stringify(authResult.user));
  }

  getExpiration() {
    const expiration = localStorage.getItem("kwikeeadmin_expires_at") as string;
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  resetPassword(emailForm: any) {
    return this.http.post<any>(`${environment.baseUrl}user/forgotPassword`, emailForm).pipe(shareReplay())
  }

  changeLoggedInPassword(passwordForm: any) {
    return this.http.post<any>(`${environment.baseUrl}user/password/change`, passwordForm).pipe(shareReplay())
  }
}
