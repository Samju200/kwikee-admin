import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@core/services/alert.service';
import { ProjectService } from '@core/services/project.service';
import { modalOptions } from '@shared/utils/extra';
import Modal from 'bootstrap/js/dist/modal';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-sectors',
  templateUrl: './list-sectors.component.html',
  styleUrls: ['./list-sectors.component.scss']
})
export class ListSectorsComponent implements OnInit, OnDestroy, AfterViewInit {
  sectors: any[] = [];
  loading = false;
  destroy$ = new Subject<boolean>();
  sectorForm: FormGroup;
  sectorsData: any[] = [];
  sectorModal!: bootstrap.Modal
  actionType: 'create' | 'edit' = 'create';
  isLoading = false;
  searchText = '';
  constructor(private service: ProjectService, private alertService: AlertService, private fb: FormBuilder) {
    this.sectorForm = this.buildForm()
  }

  ngOnInit(): void {
    this.fetchAllSectors()
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.sectorModal = new Modal('#sectorModal', modalOptions)
  }

  buildForm(): FormGroup {
    return this.fb.group({
      sector_name: [null, Validators.required],
      sector_score: [null, Validators.required],
      sector_code: [null, Validators.required],
      id: [null]
    })
  }

  fetchAllSectors() {
    this.loading = true;
    this.service.getSectors().pipe(takeUntil(this.destroy$)).subscribe({
      next: data => {
        this.loading = false;
        this.sectorsData = data;
      },
      error: () => {
        this.loading = false;
      }
    },
    );
  }

  openSectorModal() {
    this.sectorModal.show();
    this.actionType = 'create'
  }

  closeSectorModal() {
    this.sectorModal.hide();
    this.isLoading = false;
    this.sectorForm.reset();
  }

  searchSectors(searchtext: string) {
    this.searchText = searchtext
  }

  populateFormForEdit(sector: any) {
    Object.keys(sector).forEach(key => {
      this.sectorForm.patchValue({ [key]: sector[key] })
    })
    this.openSectorModal();
    this.actionType = 'edit'
  }

  updateSector() {
    if (this.sectorForm.valid) {
      this.isLoading = true;
      this.service.updateSectors(this.sectorForm.value).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.alertService.success(data.message);
        this.fetchAllSectors();
        this.isLoading = false;
      }, () => this.isLoading = false)
    } else {
      Object.values(this.sectorForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true })
        }
      })
    }
  }
}
