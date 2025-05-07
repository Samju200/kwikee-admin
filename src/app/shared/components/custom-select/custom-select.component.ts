import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }
  ]
})
export class CustomSelectComponent implements OnInit, ControlValueAccessor {
  @Input('items') items: Array<any> = [];
  @Input('disableControl') disableControl = true
  searchText = '';
  showDropdown: boolean = false;
  selectedItem!:any;
  selectedItemValue!:any;

  ngOnInit(): void {

  }

  onTouched = () => { };

  touched = false;

  // disabled = false;

  propagateChange = (_: any) => { };

  writeValue(obj: any): void {
    if (obj != undefined) {
      this.selectedItemValue = obj.company_id;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onFocus() {
    // this.onTouched();
   if (this.disableControl) {
    return
   } else {
    this.showDropdown = true;
   }
  }

  closeDropDown() {
    this.onTouched();
    this.showDropdown = false;
  }

  searchItems(search: string) {
    this.searchText = search.toLocaleLowerCase();
  }

  showSelected(country: any) {
    this.selectedItem = country;
    this.showDropdown = false;
    this.searchText = '';
    this.markAsTouched()
    this.propagateChange(this.selectedItem.company_id)
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}

import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  @Output() clickedOutside: EventEmitter<MouseEvent> = new EventEmitter();

  @HostListener('document:mousedown', ['$event'])
  onclick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.clickedOutside.emit();
    }
  }
  constructor(private elementRef: ElementRef) { }

}


