import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, of, pluck, retry, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  @Input() hasExportOptions: boolean = false;
  @Output() searchTextEvent = new EventEmitter<any>();
  searchInputRef: any;
  searchSubscription = new Subscription()
  searchText: any;
  @ViewChild('tableSearchInput') set inputRef(ref: ElementRef) {
    if (!!ref) {
      this.searchInputRef = ref.nativeElement;
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.searchSubscription = fromEvent(this.searchInputRef, 'input').pipe(pluck('target', 'value'), debounceTime(500), distinctUntilChanged(), switchMap((m) => {
      this.searchText = m;
      return of(this.searchTextEvent.emit(m))
    }), retry()).subscribe()
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe()
  }

}
