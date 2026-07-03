import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = '/api'; // base API URL

  constructor(private http: HttpClient) {}

  // Call backend to purchase items in the cart
  purchase(cartItems: Product[]): Observable<any> {
    // In a real app, send cart items to backend
    return this.http.post(`${this.apiUrl}/cart/purchase`, { items: cartItems });
  }

  // Fetch products with pagination
  getProducts(page: number, limit: number): Observable<{ items: Product[]; totalCount: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<{ items: Product[]; totalCount: number }>(
      `${this.apiUrl}/products`,
      { params }
    );
  }
}
