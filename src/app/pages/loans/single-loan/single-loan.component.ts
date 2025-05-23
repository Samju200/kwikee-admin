import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { ProjectService } from '@core/services/project.service';
import { banks } from '@shared/utils/banks';
import Modal from 'bootstrap/js/dist/modal';
import { Subject, takeUntil } from 'rxjs';

// import * as bootstrap from 'bootstrap'

@Component({
  selector: 'app-single-loan',
  templateUrl: './single-loan.component.html',
  styleUrls: ['./single-loan.component.scss'],
})
export class SingleLoanComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('documentInput') documentInput: any;
  uploadDocumentModal!: bootstrap.Modal;
  rejectOrCancelModal!: bootstrap.Modal;
  editLoanModal!: bootstrap.Modal;
  performUnderwritingModal!: bootstrap.Modal;
  exportTransactionsModal!: bootstrap.Modal;
  chargeCustomerModal!: bootstrap.Modal;
  transactionsHistoryModal!: bootstrap.Modal;
  auth_id: any = '';
  loading = true;
  creditDetails: any;
  customerLoans: any;
  customerSavings: any[] = [];
  customerTransactions: any[] = [];
  authCards: any[] = [];
  destroy$ = new Subject<boolean>();
  userDetails: any;
  underwriterProfile: any;
  bvnData: any;
  loanTransactions: any[] = [];
  antiFraudChecklist: any;
  underwritingChecklist: any;
  reasonControl = new FormControl(null, Validators.required);
  docTypeControl = new FormControl(null, Validators.required);
  isRejecting = false;
  isUploading = false;
  isLoading = false;
  loadingCompanies = false;
  rejectOrCancelAction: 'reject' | 'cancel' = 'reject';
  uploadDocumentsForm: FormGroup;
  underwritingForm: FormGroup;
  editLoanForm: FormGroup;
  chargeCustomerForm: FormGroup;
  documentFile: unknown;
  documentTypeUrl: string | ArrayBuffer | null | undefined;
  allCompaniesData: any[] = [];
  banks = banks.sort((a, b) => a.name.localeCompare(b.name));
  repayOrUnderwriting: 'repayment' | 'underwriting' = 'repayment';
  recentCredit: any;
  creditHistory: any[] = [];
  transactionHistory: any[] = [];
  loadingCredit = false;

  constructor(
    private service: ProjectService,
    private fb: FormBuilder,
    private activatedROute: ActivatedRoute,
    private alertService: AlertService
  ) {
    this.activatedROute.params.subscribe((param: Params) => {
      this.auth_id = param['loan_id'];
      this.fetchUserDetails();
    });
    this.uploadDocumentsForm = this.buildUploadDocumentsForm();
    this.underwritingForm = this.buildPerformUnderwritingForm();
    this.editLoanForm = this.buildEditLoanModal();
    this.chargeCustomerForm = this.buildChargeCustomerForm();
  }

  ngOnInit(): void {
    this.onDocumentInputChange();
  }

  ngAfterViewInit(): void {
    this.uploadDocumentModal = new Modal('#uploadDocumentModal', modalOptions);
    this.rejectOrCancelModal = new Modal('#rejectModal', modalOptions);
    this.performUnderwritingModal = new Modal(
      '#performUnderwritingModal',
      modalOptions
    );
    this.editLoanModal = new Modal('#editLoanModal', modalOptions);
    this.exportTransactionsModal = new Modal(
      '#exportTransactionsModal',
      modalOptions
    );
    this.chargeCustomerModal = new Modal('#chargeCustomerModal', modalOptions);
    this.transactionsHistoryModal = new Modal(
      '#transactionsHistoryModal',
      modalOptions
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  buildChargeCustomerForm(): FormGroup {
    return this.fb.group({
      amount: [null, Validators.required],
      last4: [null, Validators.required],
    });
  }

  buildUploadDocumentsForm(): FormGroup {
    return this.fb.group({
      type: [null, Validators.required],
      file: [null, Validators.required],
      otherDocumentName: [null],
    });
  }

  buildPerformUnderwritingForm(): FormGroup {
    return this.fb.group({
      amount: [null, Validators.required],
      pay_date: [null, Validators.required],
    });
  }

  buildEditLoanModal(): FormGroup {
    return this.fb.group({
      auth_id: [null, Validators.required],
      state_of_residence: [null],
      house_address: [null],
      local_government: [null],
      employer_name: [null],
      employment_start_date: [null],
      official_email: [null],
      employer_address: [null],
      income_account_bankcode: [null],
      income_account_number: [null],
      pay_date: [null],
      preffered_account_bankcode: [null],
      preferred_account_number: [null],
      email: [null],
      phone: [null],
    });
  }

  onDocumentInputChange() {
    this.uploadDocumentsForm.get('type')?.valueChanges.subscribe((value) => {
      console.log(value);
      if (value == '0') {
        this.uploadDocumentsForm
          .get('otherDocumentName')
          ?.addValidators(Validators.required);
      } else {
        this.uploadDocumentsForm
          .get('otherDocumentName')
          ?.removeValidators(Validators.required);
      }
      this.uploadDocumentsForm.updateValueAndValidity();
    });
  }

  onImgError(event: any) {
    event.target.src = 'https://via.placeholder.com/75';
  }

  resetModals() {
    this.reasonControl.reset();
    this.uploadDocumentsForm.reset();
    if (this.documentInput) {
      this.documentInput.nativeElement.value = '';
    }
  }

  fetchUserDetails(loading = true) {
    this.loading = loading;
    this.service
      .getSingleLoan(this.auth_id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          // this.loading = false;
          console.log(data);
          this.creditDetails = data.user.profile;
          if (
            this.creditDetails.documents &&
            typeof this.creditDetails.documents === 'string'
          ) {
            try {
              this.creditDetails.documents = JSON.parse(
                this.creditDetails.documents
              );
            } catch (e) {
              console.error('Error parsing documents:', e);
              this.creditDetails.documents = [];
            }
          } else {
            this.creditDetails.documents = this.creditDetails.documents || [];
          }
          console.log('credit details:', this.creditDetails);
          // this.loanDetails = data.user.most_recent_credit
          this.userDetails = data.user;
          this.bvnData = data.user.bvn_data;
          // this.underwriterProfile = data.loans.underwriterprofile;
          // this.bvnData = data.bvn_data
          this.recentCredit = data.user.most_recent_credit;
          this.antiFraudChecklist = data.user.antifraudchecklist;
          this.underwritingChecklist = data.user.credit_underwriting;
          this.authCards = data.user.card_authorizations
            ? Array.isArray(data.user.card_authorizations)
              ? data.user.card_authorizations
              : [data.user.card_authorizations]
            : [];

          // console.log( 'card details:',this.authCards);
          this.loading = false;
          // const savings = this.customerDetails.savings;
          // this.customerSavings = savings.filter(saving => saving.type == '1');
          // this.customerSavings2 = savings.filter(saving => saving.type == '2');
          // this.customerSavings3 = savings.filter(saving => saving.type == '3');
        },
        error: () => (this.loading = false),
      });
  }

  fetchCreditHistory() {
    this.loadingCredit = true;
    this.service
      .getCreditHistory(this.auth_id)
      .pipe()
      .subscribe({
        next: (data: any) => {
          this.creditHistory = data.credits;
          // Combine all transactions from creditHistory entries
          this.transactionHistory = this.creditHistory.flatMap(
            (credit: any) => credit.transactions || []
          );

          console.log('All transaction history:', this.transactionHistory);
          this.loadingCredit = false;
        },
        error: () => (this.loadingCredit = false),
      });
  }

  performIDCardCheck() {
    if (confirm('Are you sure?')) {
      this.loading = true;
      this.service
        .performIDCardCheck(this.auth_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data: any) => {
            this.alertService.success(data.message);
            this.fetchUserDetails();
            this.loading = false;
          },
          () => (this.loading = false)
        );
    }
  }

  performFaceMatch() {
    if (confirm('Are you sure?')) {
      this.loading = true;
      this.service
        .doFaceMatch(this.auth_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data: any) => {
            this.loading = false;
            this.alertService.success(data.message);
            this.fetchUserDetails();
          },
          () => (this.loading = false)
        );
    }
  }

  performAntiFraudCheck(objectParam: any) {
    if (confirm('Are you sure?')) {
      const param = {
        ...this.antiFraudChecklist,
        ...objectParam,
        auth_id: this.auth_id,
      };
      this.loading = true;
      this.service
        .performAntiFraudCheck(param)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data: any) => {
            this.alertService.success(data.message);
            this.fetchUserDetails();
            this.loading = false;
          },
          () => (this.loading = false)
        );
    }
  }

  performUnderwritingCheck(objectParam: any) {
    if (confirm('Are you sure?')) {
      const param = {
        ...this.antiFraudChecklist,
        ...objectParam,
        auth_id: this.auth_id,
      };
      this.loading = true;
      this.service
        .performUnderwritingCheck(param)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data: any) => {
            this.alertService.success(data.message);
            this.fetchUserDetails();
            this.loading = false;
          },
          () => (this.loading = false)
        );
    }
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

  openRejectOrCancelModal(action: 'reject' | 'cancel') {
    this.rejectOrCancelModal?.show();
    this.rejectOrCancelAction = action;
  }

  closeRejectOrCancelModal() {
    this.rejectOrCancelModal?.hide();
    this.resetModals();
    this.isRejecting = false;
  }

  rejectOrCancelLoan() {
    if (this.reasonControl.valid) {
      if (confirm('Are you sure you want to proceed?')) {
        const rejectData = {
          reason: this.reasonControl.value,
          loan_id: this.auth_id,
        };
        this.isRejecting = true;
        this.service
          .rejectOrCancelLoan(rejectData, this.rejectOrCancelAction)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (data) => {
              this.alertService.success(data.message);
              this.fetchUserDetails();
              this.isRejecting = false;
            },
            error: (error) => {
              this.isRejecting = false;
            },
          });
      }
    } else {
      this.reasonControl.markAsDirty();
      this.reasonControl.updateValueAndValidity();
    }
  }

  onFileChanged(event: InputEvent | any) {
    this.documentFile = event.target?.files[0];
    console.log(this.documentFile);
    if (event.target?.files && event.target?.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (e) => {
        // called once readAsDataURL is completed
        this.documentTypeUrl = e.target?.result;
      };
    }
  }

  get documentPreview() {
    return this.documentFile
      ? (this.documentFile as File).type.startsWith('image')
      : null;
  }

  openUploadDocumentsModal() {
    this.uploadDocumentModal?.show();
  }

  closeUploadDocumentsModal() {
    this.uploadDocumentModal?.hide();
    this.isUploading = false;
    this.resetModals();
  }

  uploadDocuments() {
    if (this.uploadDocumentsForm.valid) {
      const formValues = this.uploadDocumentsForm.value;
      let formData = new FormData();
      if (formValues.type == '0') {
        formData.delete('type');
        formData.append('file', this.documentFile as string);
        formData.append('name', formValues.otherDocumentName);
        formData.append('loan_id', this.auth_id);
      } else {
        formData.delete('name');
        formData.append('file', this.documentFile as string);
        formData.append('type', formValues.type);
        formData.append('loan_id', this.auth_id);
      }
      this.isUploading = true;
      this.service
        .uploadLoanDocument(formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            this.closeUploadDocumentsModal();
            this.alertService.success(data.message);
            this.fetchUserDetails();
          },
          error: () => (this.isUploading = false),
        });
    } else {
      Object.values(this.uploadDocumentsForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  linkBankCardOrStatement(linkType: 'card' | 'statement') {
    if (confirm('Are you sure?')) {
      this.service
        .linkBankCardOrStatement(this.auth_id, linkType)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: any) => {
            this.alertService.success(data.message);
            this.fetchUserDetails();
          },
        });
    }
  }

  openPerformUnderwritingModal(type: 'repayment' | 'underwriting') {
    this.repayOrUnderwriting = type;
    this.performUnderwritingModal?.show();
  }

  closePerformUnderwritingModal() {
    this.performUnderwritingModal?.hide();
    this.isLoading = false;
    this.underwritingForm.reset();
  }

  performUnderwriting() {
    if (this.underwritingForm.valid) {
      const formValues = this.underwritingForm.value;
      const params = {
        auth_id: this.auth_id,
        ...formValues,
      };
      this.isLoading = true;
      this.service
        .performUnderWritingOrAddRepayment(
          params,
          this.repayOrUnderwriting == 'underwriting'
            ? 'approve'
            : 'repayment/add'
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: any) => {
            this.isLoading = false;
            this.closePerformUnderwritingModal();
            this.alertService.success(data.message);
            this.fetchUserDetails();
          },
          error: () => (this.isLoading = false),
        });
    } else {
      Object.values(this.underwritingForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  async openEditLoanModal() {
    const formValues = this.editLoanForm.value;
    await Object.keys(formValues).forEach((key) => {
      this.editLoanForm.patchValue({ [key]: this.creditDetails[key] });
    });
    this.editLoanForm.patchValue({
      email: this.userDetails.email,
      telephone: this.userDetails.telephone,
    });
    this.editLoanModal?.show();
    this.fetchAllCompanies();
  }

  closeEditLoanModal() {
    this.editLoanModal.hide();
    this.isLoading = false;
  }

  fetchAllCompanies() {
    this.loadingCompanies = true;
    const params = {
      search_text: '',
      page_size: 10000,
      page: 1,
    };
    this.service
      .getCompanies(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.allCompaniesData = data.data;
          this.loadingCompanies = false;
        },
        error: () => {
          this.alertService.error(
            'Could not fetch companies. Please refresh and try again'
          );
          this.loadingCompanies = false;
        },
      });
  }

  editLoan() {
    if (this.editLoanForm.valid) {
      const formValues = this.editLoanForm.value;
      this.isLoading = true;
      this.service
        .editLoan(formValues)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            this.alertService.success(data.message);
            this.closeEditLoanModal();
            this.fetchUserDetails();
          },
          error: () => {
            this.isLoading = false;
          },
        });
    } else {
      Object.values(this.editLoanForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  moveToPendingUnderwriting() {
    if (confirm('Are you sure?')) {
      this.service
        .movePendingUnderwriting(this.auth_id, '5')
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            this.alertService.success(data.message);
            this.fetchUserDetails();
          },
        });
    }
  }

  openExportTransactionsModal() {
    this.exportTransactionsModal.show();
  }

  closeExportTransactionsModal() {
    this.exportTransactionsModal.hide();
    this.docTypeControl.reset();
    this.isLoading = false;
  }

  exportTransactions() {
    if (this.docTypeControl.valid) {
      const params = {
        loan_id: this.auth_id,
        product_mode: '4',
        doc_type: this.docTypeControl.value,
      };
      this.isLoading = true;
      this.service
        .exportCustomerTransactions(params)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data: any) => {
            this.closeExportTransactionsModal();
            // this.fetchLoan();
            if (data.link) {
              window.open(data.link);
            }
            this.isLoading = false;
          },
          () => (this.isLoading = false)
        );
    } else {
      this.docTypeControl.markAsDirty();
      this.docTypeControl.updateValueAndValidity();
    }
  }

  markAsFullyPaid() {
    if (confirm('Are you sure?')) {
      this.loading = true;
      this.service
        .markAsFullyPaid(this.auth_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.loading = false;
          this.alertService.success(data.message);
          this.fetchUserDetails();
        });
    }
  }

  deleteCardAuthorization(last4: string) {
    if (confirm('Are you sure you want to proceed?')) {
      const params = {
        loan_id: this.auth_id,
        last4,
      };
      this.loading = true;
      this.service
        .deleteCardAuthorization(params)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            this.loading = false;
            this.alertService.success(data.message);
            this.fetchUserDetails();
          },
        });
    }
  }

  requestNewAuthorization() {
    if (confirm('Are you sure?')) {
      this.loading = true;
      this.service
        .requestNewCardAuthorization(this.auth_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            this.alertService.success(data.message);
            this.fetchUserDetails();
          },
        });
    }
  }

  openChargeCustomerModal() {
    this.chargeCustomerModal.show();
  }

  closeChargeCustomerModal() {
    this.chargeCustomerModal.hide();
    this.chargeCustomerForm.reset();
    this.isLoading = false;
  }

  chargeCustomer() {
    if (this.chargeCustomerForm.valid) {
      const formValues = this.chargeCustomerForm.value;
      const params = {
        ...formValues,
        auth_id: this.auth_id,
      };
      this.isLoading = true;
      this.service
        .chargeLoanCustomer(params)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            this.closeChargeCustomerModal();
            this.alertService.success(data.message);
            this.fetchUserDetails();
          },
          error: () => (this.isLoading = false),
        });
    } else {
      Object.values(this.chargeCustomerForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { modalOptions } from '@shared/utils/extra';

@Pipe({
  name: 'employerName',
})
export class EmployerNamePipe implements PipeTransform {
  transform(value: { company_name: string; company_id: string }): string {
    return value.company_name;
  }
}
