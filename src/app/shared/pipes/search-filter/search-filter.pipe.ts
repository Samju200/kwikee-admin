import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, search_by: string): any {
    // return null;
    if (!items) {
      return
    }
    if (!searchText) {
      return items
    }
    searchText = searchText.toLocaleLowerCase();
    return items.filter(search => {
      return search[search_by]?.toLocaleLowerCase().includes(searchText)
    })
  }

}
