import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:5001/api/auth';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/login`, credentials)
      .subscribe(response => {
        this.tokenService.setToken(response.accessToken);
      });
  }

 refreshToken() {
    // Refresh token is stored in HttpOnly cookie, automatically sent with this request
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/refresh`, {})
      .subscribe(response => {
        this.tokenService.setToken(response.accessToken);
      });
  }

  logout() {
    this.tokenService.removeToken();
   // this.http.post(`${this.apiUrl}/logout`, {}).subscribe(); // server clears refresh token cookie
  } 
}
