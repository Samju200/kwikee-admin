import { Pipe, PipeTransform } from '@angular/core';
import { banks } from '@shared/utils/banks';

@Pipe({
  name: 'bankName'
})
export class BankNamePipe implements PipeTransform {

  transform(value: string): string {
    const foundbank = banks.find(bank => bank.code === value);
    return foundbank ? foundbank.name: '-'
  }

}
