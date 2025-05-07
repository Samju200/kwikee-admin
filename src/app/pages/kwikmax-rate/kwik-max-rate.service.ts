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

export interface KwikMaxRate {
  id: number;
  start: number;
  end: number | null;
  days_year: 'days' | 'years';
  rate: number;
}

@Injectable({ providedIn: 'root' })
export class KwikMaxRateService {
  constructor(private http: HttpClient) {}

  getAllRates(): Observable<KwikMaxRate[]> {
    return this.http
      .get(`${environment.baseUrl}kwikmax-rates`)
      .pipe(map((response: any) => response.data));
  }

  createRate(data: KwikMaxRate): Observable<DataResponse> {
    return this.http.post<DataResponse>(
      `${environment.baseUrl}kwikmax-rate`,
      data
    );
  }

  updateRate(id: number, data: KwikMaxRate): Observable<DataResponse> {
    return this.http.put<DataResponse>(
      `${environment.baseUrl}kwikmax-rate/${id}`,
      data
    );
  }

  deleteRate(id: number): Observable<DataResponse> {
    return this.http.delete<DataResponse>(
      `${environment.baseUrl}kwikmax-rate/${id}`
    );
  }
}
