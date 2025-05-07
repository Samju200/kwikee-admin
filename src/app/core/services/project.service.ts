import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { map, Observable, shareReplay } from 'rxjs';

interface dataResponse {
  status: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectService {
  constructor(private http: HttpClient) {}

  // transactions
  fetchAllTransactions(params: any): Observable<any> {
    return this.http
      .post<any>(`${environment.baseUrl}loan/transactions/list`, params)
      .pipe(map((data) => data.transactions));
  }
  getAccountEnquiry(params: any): Observable<any> {
    return this.http
      .post<any>(`${environment.baseUrl}accounts/account-enquiry`, params)
      .pipe(map((data) => data));
  }
  validateInternalAccount(account_no: string) {
    return this.http.get(
      `${environment.baseUrl}accounts/validate-internal-account/${account_no}`
    );
  }

  markAsFraud(id: string) {
    return this.http.put(
      `${environment.baseUrl}loan/transactions/fraud/unmark?id=${id}`,
      {}
    );
  }

  blacklistCustomer(email: string) {
    return this.http.get(
      `${environment.baseUrl}loan/users/blacklist?email=${email}`
    );
  }

  declineTransaction(id: string) {
    return this.http.put(
      `${environment.baseUrl}loan/transactions/decline?id=${id}`,
      {}
    );
  }

  //savings
  fetchAllSavings(params: any): Observable<any> {
    return this.http
      .post<any>(`${environment.baseUrl}savings/list`, params)
      .pipe(map((data) => data.savings));
  }
  fetchKwikMaxSavings(params: any): Observable<any> {
    return this.http
      .post<any>(`${environment.baseUrl}savings/kwik-max/list`, params)
      .pipe(map((data) => data));
  }
  fetchKwikGoalSavings(params: any): Observable<any> {
    return this.http
      .post<any>(`${environment.baseUrl}savings/kwik-goal/list`, params)
      .pipe(map((data) => data));
  }
  fetchKwikLiteSavings(params: any): Observable<any> {
    return this.http
      .post<any>(`${environment.baseUrl}savings/kwik-lite/list`, params)
      .pipe(map((data) => data));
  }

  userKwikmaxHistory(auth_id?: string) {
    return this.http.get(
      `${environment.baseUrl}savings/kwikmax/user-list/${auth_id}`
    );
  }
  userKwikgoalHistory(auth_id?: string) {
    return this.http.get(
      `${environment.baseUrl}savings/kwikgoal/user-list/${auth_id}`
    );
  }
  getSingleSaving(investmentid?: string) {
    return this.http.post(`${environment.baseUrl}savings/one`, {
      investmentid,
    });
  }
  getSingleKwikMax(id?: string) {
    return this.http.post(`${environment.baseUrl}savings/kwik-max/details`, {
      id,
    });
  }
  getSingleKwikGoal(id?: string) {
    return this.http.post(`${environment.baseUrl}savings/kwik-goal/details`, {
      id,
    });
  }
  getSingleKwikLite(id?: string) {
    return this.http.post(`${environment.baseUrl}savings/kwik-lite/details`, {
      id,
    });
  }

  exportKwikMaxList(params: { status: any }) {
    return window.open(
      `${environment.baseUrl}savings/kwik-max/list?status=${params.status}&export=1`
    );
  }
  exportKwikGoalList(params: { status: any }) {
    return window.open(
      `${environment.baseUrl}savings/kwik-goal/list?status=${params.status}&export=1`
    );
  }
  exportKwikLiteList(params: { status: any }) {
    return window.open(
      `${environment.baseUrl}savings/kwik-lite/list?status=${params.status}&export=1`
    );
  }

  editKwikGoal(details: any): Observable<dataResponse> {
    return this.http.post<dataResponse>(
      `${environment.baseUrl}savings/kwikgoals/edit`,
      details
    );
  }

  rejectOrCancelSaving(loan_id: any, action: string): Observable<dataResponse> {
    return this.http.post<dataResponse>(
      `${environment.baseUrl}savings/${action}`,
      { loan_id }
    );
  }

  editOrConfirmKwikMax(details: any, action: string): Observable<dataResponse> {
    return this.http.post<dataResponse>(
      `${environment.baseUrl}savings/kwikmax/${action}`,
      details
    );
  }

  // customers
  fetchAllCustomers(params: any): Observable<any> {
    return this.http
      .post<any>(`${environment.baseUrl}loan/users`, params)
      .pipe(map((data) => data.user));
  }

  viewSingleCustomer(auth_id: string) {
    return this.http.get(
      `${environment.baseUrl}loan/user/one?auth_id=${auth_id}`
    );
  }

  //loans
  fetchLoans(params: any): Observable<any> {
    return this.http
      .post<any>(`${environment.baseUrl}loan/list`, params)
      .pipe(map((data) => data.users));
  }

  exportLoans(params: { status: any; page_size: any; search_text: any }) {
    return window.open(
      `${environment.baseUrl}loan/list/export?status=${params.status}&page_size=${params.page_size}&search_text=${params.search_text}&export=1`
    );
  }

  getSingleLoan(auth_id?: string) {
    return this.http.post(`${environment.baseUrl}loan/one`, { auth_id });
  }

  getCreditHistory(auth_id?: string) {
    return this.http.post(`${environment.baseUrl}loan/history`, { auth_id });
  }

  doFaceMatch(loan_id: string) {
    return this.http.post(`${environment.baseUrl}loan/facematch`, { loan_id });
  }

  performAntiFraudCheck(params: any) {
    return this.http.post(
      `${environment.baseUrl}loan/antifraud/checklist`,
      params
    );
  }

  performUnderwritingCheck(params: any) {
    return this.http.post(
      `${environment.baseUrl}loan/underwriting/checklist`,
      params
    );
  }

  fetchTransactionsHistory(id: any) {
    return this.http.get(
      `${environment.baseUrl}loan/transactions-history/${id}`
    );
  }

  rejectOrCancelLoan(
    data: { reason: string; loan_id: any },
    action: string
  ): Observable<dataResponse> {
    return this.http.post<dataResponse>(
      `${environment.baseUrl}loan/${action}`,
      data
    );
  }

  uploadLoanDocument(details: FormData): Observable<dataResponse> {
    return this.http.post<dataResponse>(
      `${environment.baseUrl}loan/document/upload`,
      details
    );
  }

  linkBankCardOrStatement(
    loan_id: string,
    linkType: string
  ): Observable<dataResponse> {
    return this.http.post<dataResponse>(
      `${environment.baseUrl}loan/link/${linkType}`,
      { loan_id }
    );
  }

  performUnderWritingOrAddRepayment(
    data: any,
    actionType: string
  ): Observable<dataResponse> {
    return this.http.post<dataResponse>(
      `${environment.baseUrl}loan/${actionType}`,
      data
    );
  }

  editLoan(details: any): Observable<dataResponse> {
    return this.http.post<dataResponse>(
      `${environment.baseUrl}loan/edit/loan`,
      details
    );
  }

  movePendingUnderwriting(
    loan_id: string,
    status: string
  ): Observable<dataResponse> {
    return this.http.get<dataResponse>(
      `${environment.baseUrl}loan/status/change?loan_id=${loan_id}&status=${status}`
    );
  }

  markAsFullyPaid(loan_id: string): Observable<dataResponse> {
    return this.http.post<dataResponse>(
      `${environment.baseUrl}loan/fullypaid/mark`,
      { loan_id }
    );
  }

  deleteCardAuthorization(data: {
    loan_id: any;
    last4: string;
  }): Observable<dataResponse> {
    return this.http.post<dataResponse>(
      `${environment.baseUrl}loan/authorization/delete`,
      data
    );
  }

  requestNewCardAuthorization(loan_id: string): Observable<dataResponse> {
    return this.http.post<dataResponse>(
      `${environment.baseUrl}loan/authorization/request`,
      { loan_id }
    );
  }

  chargeLoanCustomer(details: any): Observable<dataResponse> {
    return this.http.post<dataResponse>(
      `${environment.baseUrl}loan/paystack/charge`,
      details
    );
  }

  performIDCardCheck(loan_id: string) {
    return this.http.get(
      `${environment.baseUrl}loan/idcard/verify?loan_id=${loan_id}`
    );
  }

  // utilities
  getCompanies(params: {
    search_text?: any;
    page_size?: any;
    page?: any;
  }): Observable<any> {
    return this.http
      .get(
        `${environment.baseUrl}utilities/company/list/admin?search_text=${params.search_text}&page_size=${params.page_size}&page=${params.page}`
      )
      .pipe(
        map((data: any) => data.companies),
        shareReplay(1)
      );
  }

  getPendingCompanies(params: {
    search_text?: any;
    page_size?: any;
    page?: any;
  }): Observable<any> {
    return this.http
      .get(
        `${environment.baseUrl}utilities/company/list/pending?search_text=${params.search_text}&page_size=${params.page_size}&page=${params.page}`
      )
      .pipe(
        map((data: any) => data.companies),
        shareReplay(1)
      );
  }

  getBlacklistedCompanies(params: {
    search_text?: any;
    page_size?: any;
    page?: any;
  }): Observable<any> {
    return this.http
      .get(
        `${environment.baseUrl}utilities/company/blacklist?search_text=${params.search_text}&page_size=${params.page_size}&page=${params.page}`
      )
      .pipe(
        map((data: any) => data.companies),
        shareReplay(1)
      );
  }

  exportCustomerTransactions(params: {
    loan_id: any;
    product_mode: any;
    doc_type: any;
  }) {
    return this.http.get(
      `${environment.baseUrl}transactions/statement?loan_id=${params.loan_id}&product_mode=${params.product_mode}&doc_type=${params.doc_type}`
    );
  }

  sendPushNotifications(params: any): Observable<dataResponse> {
    return this.http.post<dataResponse>(
      `${environment.baseUrl}utilities/notification/send`,
      params
    );
  }

  addBeneficiaryAccount(params: any): Observable<dataResponse> {
    return this.http.post<dataResponse>(`${environment.baseUrl}`, params);
  }

  changeAccountPassword(params: any): Observable<dataResponse> {
    return this.http.post<dataResponse>(
      `${environment.baseUrl}admin/account/password/change`,
      params
    );
  }

  updateCompanies(params: any): Observable<dataResponse> {
    return this.http.post<dataResponse>(
      `${environment.baseUrl}utilities/company/edit`,
      params
    );
  }

  addBulkCompanies(params: any[]): Observable<dataResponse> {
    return this.http.post<dataResponse>(
      `${environment.baseUrl}utilities/company/edit/bulk`,
      params
    );
  }

  deleteCompany(id: string): Observable<dataResponse> {
    return this.http.get<dataResponse>(
      `${environment.baseUrl}utilities/company/delete?id=${id}`
    );
  }

  blacklistCompany(company_id: string): Observable<dataResponse> {
    return this.http.get<dataResponse>(
      `${environment.baseUrl}utilities/company/blacklist/${company_id}`
    );
  }

  whitelistCompany(company_id: string): Observable<dataResponse> {
    return this.http.get<dataResponse>(
      `${environment.baseUrl}utilities/company/whitelist/${company_id}`
    );
  }

  approveCompany(id: string): Observable<dataResponse> {
    return this.http.post<dataResponse>(
      `${environment.baseUrl}utilities/company/list/approve`,
      { id }
    );
  }

  viewApprovalDetails(company_id: string): Observable<dataResponse> {
    return this.http.post<any>(
      `${environment.baseUrl}utilities/company/pending/customer`,
      { company_id }
    );
  }

  declineCompany(params: any): Observable<dataResponse> {
    return this.http.post<dataResponse>(
      `${environment.baseUrl}utilities/company/list/decline`,
      params
    );
  }

  getSectors() {
    return this.http
      .get(`${environment.baseUrl}utilities/sector/list`)
      .pipe(map((data: any) => data.sectors));
  }

  updateSectors(params: any) {
    return this.http.post(
      `${environment.baseUrl}utilities/sector/edit`,
      params
    );
  }

  // reports
  getReportAndStats() {
    return this.http.get(`${environment.baseUrl}loan/dashboard/stats`);
  }

  getLoansReport(params: { start: any; end: any }) {
    return window.open(
      `${environment.baseUrl}loan/report?start_date=${params.start}&end_date=${params.end}`
    );
  }

  getUsersReport(params: {
    page: string;
    start: string;
    end: string;
    export: string;
    search_text: string;
    page_size: string;
    blacklist: string;
    watchlist: string;
  }) {
    return this.http
      .get(
        `${environment.baseUrl}loan/users?start_date=${params.start}&end_date=${params.end}&export=${params.export}&search_text=${params.search_text}&page_size=${params.page_size}&page=${params.page}&blacklist=${params.blacklist}&watchlist=${params.watchlist}`
      )
      .pipe(map((data: any) => data.user));
  }

  exportUsersReport(params: {
    page: string;
    start: string;
    end: string;
    export: string;
    search_text: string;
    page_size: string;
    blacklist: string;
    watchlist: string;
  }) {
    return window.open(
      `${environment.baseUrl}loan/users?start_date=${params.start}&end_date=${params.end}&export=${params.export}&search_text=${params.search_text}&page_size=${params.page_size}&page=${params.page}&blacklist=${params.blacklist}&watchlist=${params.watchlist}`
    );
  }

  fetchReferrals(params: any): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}utilities/refferals/top/list?search_text=${params.search_text}&page_size=${params.page_size}&page=${params.page}`
    );
  }

  payOutReferrals(params: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseUrl}refferals/top/pay`,
      params
    );
  }

  // admin management
  getAdminUsers(params: {
    page_size: number;
    search_text: string;
    page: number;
  }) {
    return this.http
      .post(`${environment.baseUrl}admin/account/list`, params)
      .pipe(map((data: any) => data.admins));
  }

  viewAdminUser(auth_id: string) {
    return this.http.post(`${environment.baseUrl}admin/account/one`, {
      auth_id,
    });
  }

  addUser(data: {
    first_name: any;
    last_name: any;
    email: any;
    department: any;
    permission: string[];
  }) {
    return this.http.post(`${environment.baseUrl}admin/account/create`, data);
  }

  editUser(data: {
    first_name: any;
    last_name: any;
    email: any;
    department: any;
    permission: string[];
  }): Observable<dataResponse> {
    return this.http.post<dataResponse>(
      `${environment.baseUrl}admin/account/edit`,
      data
    );
  }

  deleteAdminUser(auth_id: string) {
    return this.http.post(`${environment.baseUrl}admin/account/delete`, {
      auth_id,
    });
  }

  //dashboard
  getDashboardData() {
    return this.http.get(`${environment.baseUrl}loan/dashboard/new`);
  }
}
