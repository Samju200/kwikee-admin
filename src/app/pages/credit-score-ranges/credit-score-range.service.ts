import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface DataResponse {
  status: string;
  message: string;
  data?: any;
}

@Injectable({ providedIn: 'root' })
export class CreditScoreRangeService {
  constructor(private http: HttpClient) {}

  fetchAllCreditScoreRanges(): Observable<any> {
    return this.http
      .get(`${environment.baseUrl}credit-score-ranges`)
      .pipe(map((response: any) => response.data));
  }

  createCreditScoreRange(data: any): Observable<DataResponse> {
    return this.http.post<DataResponse>(
      `${environment.baseUrl}credit-score-ranges`,
      data
    );
  }

  updateCreditScoreRange(id: number, data: any): Observable<DataResponse> {
    return this.http.put<DataResponse>(
      `${environment.baseUrl}credit-score-ranges/${id}`,
      data
    );
  }

  deleteCreditScoreRange(id: number): Observable<DataResponse> {
    return this.http.delete<DataResponse>(
      `${environment.baseUrl}credit-score-ranges/${id}`
    );
  }
}
