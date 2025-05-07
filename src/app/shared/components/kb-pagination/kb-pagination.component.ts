import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'kb-pagination',
  templateUrl: './kb-pagination.component.html',
  styleUrls: ['./kb-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KbPaginationComponent implements OnInit {
  @Input("total-items") set totalItems(totalItems: number) {
    this._totalItems = totalItems;
    this.largestPageNumber = Math.ceil(totalItems / this.itemPerPage);
        this.page7 = this.largestPageNumber;
        if (this.page7 > 7) {
          this.overflowLeft = false;
          this.overflowRight = true;
        } else if (this.page7 < 6) {
          this.overflowLeft = false;
          this.overflowRight = false;
        } else {
          this.overflowRight = false;
          this.overflowLeft = false;
        }
  }
  _totalItems = 10;
  @Input("items-per-page") itemPerPage = 15;
  @Input("itemsFrom") itemsFrom: number | undefined = 1;
  @Input("itemsEnd") itemsEnd: number | undefined = 1;
  @Output('pageChanged') pageChanged = new EventEmitter();
  @Output('pageSizeChanged') pageSizeChanged = new EventEmitter();
  overflowLeft = false;
  overflowRight = false;
  page1 = 1;
  page2 = 2;
  page3 = 3;
  page4 = 4;
  page5 = 5;
  page6 = 6;
  page7!: number;
  largestPageNumber!: number;
  currentPage = this.page1;

  constructor() { }
  // ngOnChanges(changes: SimpleChanges): void {
  //   // console.log(changes)
  //   if (changes['totalItems'] && changes['totalItems'].currentValue != changes['totalItems'].previousValue) {
  //     this.totalItems = changes['totalItems'].currentValue;
  //     this.largestPageNumber = Math.ceil(this.totalItems / this.itemPerPage);
  //     this.page7 = this.largestPageNumber;
  //     // console.log(this.page7)
  //     if (this.page7 > 7) {
  //       // console.log('is greater than 7')
  //       this.overflowLeft = false;
  //       this.overflowRight = true;
  //     } else if (this.page7 < 6) {
  //       this.overflowLeft = false;
  //       this.overflowRight = false;
  //     } else {
  //       this.overflowRight = false;
  //       this.overflowLeft = false;
  //     }
  //   }
  // }



  ngOnInit() {
    this.largestPageNumber = Math.ceil(this._totalItems / this.itemPerPage);
    this.page7 = this.largestPageNumber;

    if (this.page7 > 7) {
      this.overflowLeft = false;
      this.overflowRight = true;
    }
  }


  paginate(page: number, pageButtonClicked: number) {
    if (this.currentPage == page) return;
    if (page < 6) {
      this.overflowRight = true;
      this.overflowLeft = false;
    }
    else if (page >= 6) {
      this.overflowRight = true;
      this.overflowLeft = true;
    }

    this.changeOverFlowPages(page, pageButtonClicked);

    this.currentPage = page;
    this.pageChanged.emit(this.currentPage);

  }

  changeOverFlowPages(pageClicked: number, pageButtonClicked: number) {
    let offset = 0;
    switch (pageButtonClicked) {
      case 2:
        offset = -2;
        break;
      case 3:
        offset = -1;
        break;
      case 5:
        offset = 1;
        break;
      case 6:
        offset = 2;
        break;
    }
    if (((6 >= this.page2 && !this.overflowLeft && pageButtonClicked != 7) || pageClicked == 1) && this.largestPageNumber > 6) {
      this.overflowRight = true;
      this.page2 = 2;
      this.page3 = 3;
      this.page4 = 4;
      this.page5 = 5
      this.page6 = 6;
      return;
    }

    if ((this.page6 + offset >= (this.largestPageNumber - 2) && pageButtonClicked != 2 && (this.largestPageNumber > 6)) || pageButtonClicked == 7) {
      this.overflowRight = false;
      this.page2 = this.largestPageNumber - 5;
      this.page3 = this.largestPageNumber - 4;
      this.page4 = this.largestPageNumber - 3;
      this.page5 = this.largestPageNumber - 2;
      this.page6 = this.largestPageNumber - 1;
      return;
    }

    if (this.largestPageNumber < 7) {

      this.overflowRight = false;
      this.overflowLeft = false;
      return;

    }

    this.page2 = this.page2 + offset;
    this.page3 = this.page3 + offset;
    this.page4 = this.page4 + offset;
    this.page5 = this.page5 + offset;
    this.page6 = this.page6 + offset;
  }


  moveBackward() {
    if (this.currentPage == 1) return;

    let newPage = this.currentPage - 1;

    if (this.currentPage <= 6) this.paginate(newPage, (newPage));
    else if (this.currentPage == this.largestPageNumber - 4) this.paginate(newPage, 2);
    else this.paginate(newPage, 3);
  }

  moveForward() {
    if (this.currentPage == this.largestPageNumber) return;

    let newPage = this.currentPage + 1;

    if (newPage <= 6) this.paginate(newPage, newPage);
    else if (this.currentPage == this.largestPageNumber - 1) this.paginate(newPage, (this.largestPageNumber - this.currentPage - 6));
    else this.paginate(newPage, 5);
  }

  changePageSize(pageSize: number) {
    // console.log(pageSize)
    this.changeOverFlowPages(1, 1);
    this.largestPageNumber = Math.ceil(this._totalItems / pageSize);
    this.page7 = this.largestPageNumber;
    this.pageSizeChanged.emit(pageSize)
    this.currentPage = 1;
  }

}
