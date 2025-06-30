import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from '@core/guards/is-logged-in.guard';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [IsLoggedInGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../../../pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },

      {
        path: 'transactions',
        pathMatch: 'full',
        loadChildren: () =>
          import(
            '../../../pages/transactions/list-transactions/list-transactions.module'
          ).then((m) => m.ListTransactionsModule),
      },
      // {
      //   path: 'account-enquiry',
      //   loadChildren: () => import('/Users/aborisade/Documents/projects/kwikee-admin-1/src/app/pages/account-enquiry/account-enquiry.module').then(m => m.AccountEnquiryModule)
      // },

      {
        path: 'customers',
        children: [
          {
            path: 'view/:auth_id',
            loadChildren: () =>
              import(
                '../../../pages/customers/single-customer/single-customer.module'
              ).then((m) => m.SingleCustomerModule),
          },
          {
            path: '',
            pathMatch: 'full',
            loadChildren: () =>
              import(
                '../../../pages/customers/list-customers/list-customers.module'
              ).then((m) => m.ListCustomersModule),
          },
        ],
      },
      {
        path: 'mandate',
        children: [
          {
            path: ':id',
            loadChildren: () =>
              import(
                '../../../pages/mandate/single-mandate/single-mandate.module'
              ).then((m) => m.SingleMandateModule),
          },
          {
            path: '',
            pathMatch: 'full',
            loadChildren: () =>
              import(
                '../../../pages/mandate/list-mandate/list-mandate.module'
              ).then((m) => m.ListMandateModule),
          },
        ],
      },
      {
        path: 'credit',
        children: [
          {
            path: 'view/:loan_id',
            loadChildren: () =>
              import(
                '../../../pages/loans/single-loan/single-loan.module'
              ).then((m) => m.SingleLoanModule),
          },
          {
            path: '',
            pathMatch: 'full',
            loadChildren: () =>
              import('../../../pages/loans/list-loans/list-loans.module').then(
                (m) => m.ListLoansModule
              ),
          },
        ],
      },
      {
        path: 'credit-score-ranges',
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadChildren: () =>
              import(
                '../../../pages/credit-score-ranges/list-credit-score-ranges/list-credit-score-ranges.module'
              ).then((m) => m.ListCreditScoreRangesModule),
          },
        ],
      },
      {
        path: 'account-enquiry',
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadChildren: () =>
              import(
                '../../../pages/account-enquiry/account-enquiry.module'
              ).then((m) => m.AccountEnquiryModule),
          },
        ],
      },
      {
        path: 'fund-transfer',
        pathMatch: 'full',
        loadChildren: () =>
          import('../../../pages/fund-transfer/fund-transfer.module').then(
            (m) => m.FundTransferModule
          ),
      },

      {
        path: 'kwikmax-rates',
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadChildren: () =>
              import(
                '../../../pages/kwikmax-rate/list-kwik-max-rates/list-kwik-max-rates.module'
              ).then((m) => m.ListKwikMaxRatesModule),
          },
        ],
      },
      {
        path: 'kwikgoal-rate',
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadChildren: () =>
              import('../../../pages/kwikgoalrate/kwikgoalrate.module').then(
                (m) => m.KwikgoalrateModule
              ),
          },
        ],
      },
      {
        path: 'credit-rate',
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadChildren: () =>
              import('../../../pages/credit-rate/credit-rate.module').then(
                (m) => m.CreditRateModule
              ),
          },
        ],
      },
      {
        path: 'send-notifications',
        loadChildren: () =>
          import(
            '../../../pages/push-notifications/push-notifications.module'
          ).then((m) => m.PushNotificationsModule),
      },
      {
        path: 'add-beneficiary',
        loadChildren: () =>
          import(
            '../../../pages/utilities/add-beneficiary/add-beneficiary.module'
          ).then((m) => m.AddBeneficiaryModule),
      },
      {
        path: 'change-password',
        loadChildren: () =>
          import('../../../pages/change-password/change-password.module').then(
            (m) => m.ChangePasswordModule
          ),
      },

      {
        path: 'companies',
        children: [
          {
            path: 'pending',
            loadChildren: () =>
              import(
                '../../../pages/utilities/list-pending-companies/list-pending-companies.module'
              ).then((m) => m.ListPendingCompaniesModule),
          },
          {
            path: 'blacklisted',
            loadChildren: () =>
              import(
                '../../../pages/utilities/list-blacklisted-companies/list-blacklisted-companies.module'
              ).then((m) => m.ListBlacklistedCompaniesModule),
          },
          {
            path: '',
            loadChildren: () =>
              import(
                '../../../pages/utilities/list-companies/list-companies.module'
              ).then((m) => m.ListCompaniesModule),
          },
        ],
      },
      {
        path: 'sectors',
        loadChildren: () =>
          import(
            '../../../pages/utilities/list-sectors/list-sectors.module'
          ).then((m) => m.ListSectorsModule),
      },
      {
        path: 'reports',
        children: [
          {
            path: 'users',
            loadChildren: () =>
              import(
                '../../../pages/reports/user-report/user-report.module'
              ).then((m) => m.UserReportModule),
          },
          {
            path: 'loans',
            loadChildren: () =>
              import(
                '../../../pages/reports/loans-report/loans-report.module'
              ).then((m) => m.LoansReportModule),
          },
          {
            path: 'full-stats',
            loadChildren: () =>
              import(
                '../../../pages/reports/reports-and-stats/reports-and-stats.module'
              ).then((m) => m.ReportsAndStatsModule),
          },
          {
            path: 'referrals',
            loadChildren: () =>
              import(
                '../../../pages/reports/referral-report/referral-report.module'
              ).then((m) => m.ReferralReportModule),
          },
        ],
      },
      {
        path: 'teams',
        children: [
          {
            path: 'view/:id',
            loadChildren: () =>
              import(
                '../../../pages/admins/single-admin/single-admin.module'
              ).then((m) => m.SingleAdminModule),
          },
          {
            path: 'new-member',
            loadChildren: () =>
              import('../../../pages/admins/new-admin/new-admin.module').then(
                (m) => m.NewAdminModule
              ),
          },
          {
            path: '',
            pathMatch: 'full',
            loadChildren: () =>
              import(
                '../../../pages/admins/list-admins/list-admins.module'
              ).then((m) => m.ListAdminsModule),
          },
        ],
      },
      {
        path: 'savings',
        children: [
          {
            path: 'view/:id',
            loadChildren: () =>
              import(
                '../../../pages/savings/single-saving/single-saving.module'
              ).then((m) => m.SingleSavingModule),
          },
          {
            path: '',
            pathMatch: 'full',
            loadChildren: () =>
              import(
                '../../../pages/savings/list-savings/list-savings.module'
              ).then((m) => m.ListSavingsModule),
          },
          {
            path: 'kwik-max/view/:id',
            loadChildren: () =>
              import(
                '../../../pages/savings/kwikmax-details/kwikmax-details.module'
              ).then((m) => m.KwikmaxDetailsModule),
          },
          {
            path: 'kwik-max',
            pathMatch: 'full',
            loadChildren: () =>
              import(
                '../../../pages/savings/kwikmax-list/kwikmax-list.module'
              ).then((m) => m.KwikmaxListModule),
          },
          {
            path: 'kwik-goal/view/:id',
            loadChildren: () =>
              import(
                '../../../pages/savings/kwikgoals-details/kwikgoals-details.module'
              ).then((m) => m.KwikgoalsDetailsModule),
          },
          {
            path: 'kwik-goal',
            pathMatch: 'full',
            loadChildren: () =>
              import(
                '../../../pages/savings/kwikgoals-list/kwikgoals-list.module'
              ).then((m) => m.KwikgoalsListModule),
          },
          {
            path: 'kwik-lite/view/:id',
            loadChildren: () =>
              import(
                '../../../pages/savings/kwiklite-details/kwiklite-details.module'
              ).then((m) => m.KwikliteDetailsModule),
          },
          {
            path: 'kwik-lite',
            pathMatch: 'full',
            loadChildren: () =>
              import(
                '../../../pages/savings/kwiklite-list/kwiklite-list.module'
              ).then((m) => m.KwikliteListModule),
          },
        ],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
