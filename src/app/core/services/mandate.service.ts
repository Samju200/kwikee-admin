import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';
import {
  MandateListResponse,
  Mandate,
  ApiResponse,
  Transaction,
  ActionResponse,
} from '@shared/models/mandate.model';

@Injectable({
  providedIn: 'root',
})
export class MandateService {
  private baseUrl = `${environment.baseUrl}mandates`;

  constructor(private http: HttpClient) {}

  // Simplified since we're doing client-side pagination
  getAllMandates(params?: {
    status?: string;
    search?: string;
  }): Observable<MandateListResponse> {
    return this.http.get<MandateListResponse>(`${this.baseUrl}`, { params });
  }

  getMandate(mandateId: string): Observable<ApiResponse<Mandate>> {
    return this.http.get<ApiResponse<Mandate>>(`${this.baseUrl}/${mandateId}`);
  }

  pauseMandate(mandateId: string): Observable<ApiResponse<ActionResponse>> {
    return this.http.post<ApiResponse<ActionResponse>>(
      `${this.baseUrl}/${mandateId}/pause`,
      {}
    );
  }

  reinstateMandate(mandateId: string): Observable<ApiResponse<ActionResponse>> {
    return this.http.post<ApiResponse<ActionResponse>>(
      `${this.baseUrl}/${mandateId}/reinstate`,
      {}
    );
  }

  cancelMandate(mandateId: string): Observable<ApiResponse<ActionResponse>> {
    return this.http.post<ApiResponse<ActionResponse>>(
      `${this.baseUrl}/${mandateId}/cancel`,
      {}
    );
  }

  getMandatePaymentHistory(
    mandateId: string
  ): Observable<ApiResponse<Transaction[]>> {
    return this.http.get<ApiResponse<Transaction[]>>(
      `${this.baseUrl}/${mandateId}/payments`
    );
  }

  // Add this if you need to export data
  exportMandates(format: 'csv' | 'excel' = 'csv'): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/export`, {
      params: { format },
      responseType: 'blob',
    });
  }
}
