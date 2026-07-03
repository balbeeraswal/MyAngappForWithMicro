import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private apiUrl = '/api/cart';

  constructor(private http: HttpClient) {}

  // Simulate purchase call to backend
  purchase(): Observable<any> {
    // In a real app, you’d call your backend:
    // return this.http.post(`${this.apiUrl}/purchase`, {});
    
    // For demo purposes, return success immediately
    return of({ success: true, message: 'Purchase completed successfully!' });
  }
}
