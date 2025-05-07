import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { ProjectService } from '@core/services/project.service';
import { banks } from '@shared/utils/banks';
import { modalOptions } from '@shared/utils/extra';
import Modal from 'bootstrap/js/dist/modal';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-kwikmax-details',
  templateUrl: './kwikmax-details.component.html',
  styleUrls: ['./kwikmax-details.component.scss']
})
export class KwikmaxDetailsComponent implements OnInit {
  id = '';
  loading = false;
  isLoading = false;
  destroy$ = new Subject<boolean>();
  userDetails: any;
  savingsWallet:any;
  savingDetails: any;
  interestRate:any;
  tenor: any;
  rate: any;
  loanTransactions: Array<any> = [];
  savingsHistory: any;
  editKwikGoalModal!: bootstrap.Modal;
  kwikMaxFormModal!: bootstrap.Modal;
  exportTransactionsModal!: bootstrap.Modal;
  editKwikGoalForm: FormGroup;
  kwikMaxForm: FormGroup;
  kwikMaxAction: 'edit' | 'confirm' = 'edit';
  docTypeControl = new FormControl(null, Validators.required)

  constructor(private service: ProjectService, private fb: FormBuilder, private activatedROute: ActivatedRoute, private alertService: AlertService) {
    this.activatedROute.params.subscribe((param: Params) => {
      this.id = param['id'];
      this.getSingleKwikMax();
      
    })
    this.editKwikGoalForm = this.buildKwikGoalForm();
    this.kwikMaxForm = this.buildKwikMaxForm();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.editKwikGoalModal = new Modal('#editKwikGoalModal', modalOptions);
    this.kwikMaxFormModal = new Modal('#kwikMaxFormModal', modalOptions)
    this.exportTransactionsModal = new Modal('#exportTransactionsModal', modalOptions);
  }

  buildKwikGoalForm(): FormGroup {
    return this.fb.group({
      investmentid: [null, Validators.required],
      target_amount: [null],
      start_date: [null],
      maturity_date: [null],
      saving_frequency: [null],
      preffered_saving_amount: [null],
      savings_category: [null],
      savings_name: [null],
    })
  }

  buildKwikMaxForm(): FormGroup {
    return this.fb.group({
      investmentid: [null, Validators.required],
      start_date: [null, Validators.required],
      duration: [null, Validators.required],
      deposit_amount: [null,  Validators.required],
    })
  }

  onImgError(event: any) {
    event.target.src = 'https://via.placeholder.com/75';
  }

  getSingleKwikMax(loading = true) {
    this.loading = loading;
    this.service.getSingleKwikMax(this.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: any) => {
        console.log(data)
        this.savingDetails = data.data;
        this.tenor = data.data.tenor;
        this.rate = data.data.rate;
        this.userDetails = data.data.user;
        this.savingsHistory = data.data.savings_history;
        this.savingsWallet = data.data.user.wallet;
        this.loanTransactions = data.data.activities;
        this.loading = false;
        this.interestRate = Math.round( (this.rate * 365)/this.tenor ) 
        // const savings = this.customerDetails.savings;
        // this.customerSavings = savings.filter(saving => saving.type == '1');
        // this.customerSavings2 = savings.filter(saving => saving.type == '2');
        // this.customerSavings3 = savings.filter(saving => saving.type == '3');
      },
      error: () => this.loading = false
    })
  }

  async openEditKwikGoalModal() {
    const formValues = this.editKwikGoalForm.value;
    await Object.keys(formValues).forEach(key => {
      this.editKwikGoalForm.patchValue({ [key]: this.savingDetails[key] })
    })
    this.editKwikGoalModal.show();
  }

  closeEditKwikGoalModal() {
    this.editKwikGoalModal.hide();
    this.isLoading = false;
  }

  handleEditKwikGoal() {
    if (this.editKwikGoalForm.valid) {
      this.isLoading = true;
      this.service.editKwikGoal(this.editKwikGoalForm.value).pipe(takeUntil(this.destroy$)).subscribe({
        next: data => {
          this.alertService.success(data.message)
          this.closeEditKwikGoalModal();
          this.getSingleKwikMax();
        },
        error: () => this.isLoading = false
      })
    } else {
      Object.values(this.editKwikGoalForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true })
        }
      })
    }
  }

  cancelOrRejectSavings(type: string) {
    if (confirm("Are you sure?")) {
      this.loading = true;
      this.service.rejectOrCancelSaving(this.id, type).subscribe({
        next: data => {
          this.alertService.success(data.message);
          this.getSingleKwikMax();
        },
        error: () => this.loading = true
      })
    }
  }

  openExportTransactionsModal() {
    this.exportTransactionsModal.show()
  }

  closeExportTransactionsModal() {
    this.exportTransactionsModal.hide();
    this.docTypeControl.reset();
    this.isLoading = false
  }


  exportTransactions() {
    if (this.docTypeControl.valid) {
      const params = {
        loan_id: this.id,
        product_mode: this.savingDetails.type,
        doc_type: this.docTypeControl.value
      }
      this.isLoading = true
      this.service.exportCustomerTransactions(params).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.closeExportTransactionsModal()
        // this.fetchLoan();
        if (data.link) {
          window.open(data.link)
        }
        this.isLoading = false
      }, () =>  this.isLoading = false)
    } else {
      this.docTypeControl.markAsDirty();
      this.docTypeControl.updateValueAndValidity()
    }
  }

  async openKwikMaxModalForEdit(action: 'edit'| 'confirm') {
    this.kwikMaxAction = action;
    const formValues = this.kwikMaxForm.value;
    await Object.keys(formValues).forEach(key => {
      this.kwikMaxForm.patchValue({ [key]: this.savingDetails[key] })
    })
    this.kwikMaxFormModal.show();
  }

  closeKwikMaxModal() {
    this.kwikMaxFormModal.hide();
    this.kwikMaxForm.reset();
    this.kwikMaxAction = 'edit'
  }

  handleEditOrConfirmKwikMax() {
    if (this.kwikMaxForm.valid) {
      this.isLoading = true;
      this.service.editOrConfirmKwikMax(this.kwikMaxForm.value, this.kwikMaxAction).pipe(takeUntil(this.destroy$)).subscribe({
        next: data => {
          this.alertService.success(data.message)
          this.closeKwikMaxModal();
          this.getSingleKwikMax();
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      })
    } else {
      Object.values(this.kwikMaxForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true })
        }
      })
    }
  }
}
