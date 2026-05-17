import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardAdminRegistrationPayload {
  name: string;
  fatherName: string;
  addresses: string[];
}

/**
 * POST target for registration. Replace with your backend URL when ready.
 * httpbin echoes JSON and is useful for local demos; your API may differ.
 */
const SUBMIT_URL = 'https://httpbin.org/post';

@Injectable({
  providedIn: 'root',
})
export class DashboardAdminRegistrationService {
  constructor(private readonly http: HttpClient) {}

  submit(payload: DashboardAdminRegistrationPayload): Observable<unknown> {
    return this.http.post(SUBMIT_URL, payload);
  }
}
