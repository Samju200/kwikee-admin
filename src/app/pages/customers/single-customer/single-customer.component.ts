import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '@core/services/project.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-single-customer',
  templateUrl: './single-customer.component.html',
  styleUrls: ['./single-customer.component.scss'],
})
export class SingleCustomerComponent implements OnInit {
  transactionsHistoryModal!: bootstrap.Modal;
  authId: any = '';
  loading = true;
  customerDetails: any;
  loanTransactions: any;
  customerLoans: any;
  customerWallet: any;
  customerProfile: any;
  kwikmaxHistory: any;
  kwikgoalHistory: any;
  creditHistory: any;
  customerKwiklite: any;
  customerRecent: any;
  customerSavings: any[] = [];
  customerTransactions: any[] = [];
  destroy$ = new Subject<boolean>();
  constructor(
    private service: ProjectService,
    private activatedROute: ActivatedRoute
  ) {
    this.activatedROute.params.subscribe((d: any) => {
      this.authId = d.auth_id;
      this.fetchUserDetails();
      this.userKwikgoalHistory();
      this.userKwikmaxHistory();
      this.fetchCreditHistory();
    });
  }

  ngOnInit(): void {}

  fetchUserDetails(loading = true) {
    this.loading = loading;
    this.service
      .viewSingleCustomer(this.authId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.customerDetails = data.customer;
          this.customerLoans = this.customerDetails.loan;
          this.customerProfile = this.customerDetails.profile;
          this.customerTransactions = this.customerDetails.transactions;
          this.customerWallet = this.customerDetails.wallet;
          this.customerKwiklite = this.customerDetails.kwik_lite;
          this.customerSavings = this.customerDetails.savings;
          this.customerRecent = this.customerDetails.most_recent_credit;
          this.loading = false;
          // const savings = this.customerDetails.savings;
          // this.customerSavings = savings.filter(saving => saving.type == '1');
          // this.customerSavings2 = savings.filter(saving => saving.type == '2');
          // this.customerSavings3 = savings.filter(saving => saving.type == '3');
        },
        () => (this.loading = false)
      );
  }
  userKwikmaxHistory() {
    this.service
      .userKwikmaxHistory(this.authId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.kwikmaxHistory = data.data;
        console.log(this.kwikmaxHistory);
      });
  }
  userKwikgoalHistory() {
    this.service
      .userKwikgoalHistory(this.authId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.kwikgoalHistory = data.data;
        console.log(this.kwikgoalHistory);
        this.loading = false;
      });
  }
  fetchCreditHistory() {
    // this.loadingCredit = true;
    this.service
      .getCreditHistory(this.authId)
      .pipe()
      .subscribe({
        next: (data: any) => {
          this.creditHistory = data.credits;
          // Combine all transactions from creditHistory entries
          // this.transactionHistory = this.creditHistory.flatMap(
          //   (credit: any) => credit.transactions || []
          // );

          // console.log('All transaction history:', this.transactionHistory);
          // this.loadingCredit = false;
        },
        // error: () => (this.loadingCredit = false),
      });
  }

  openTransactionHistoryModal(credit_id: string) {
    this.loading = true;
    this.service
      .fetchTransactionsHistory(credit_id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.loanTransactions = data.credit.transactions;
          this.openTransactionsModal();
        },
        () => (this.loading = false)
      );
  }

  openTransactionsModal() {
    this.transactionsHistoryModal?.show();
  }

  closeTransactionsModal() {
    this.transactionsHistoryModal?.hide();
  }
}
