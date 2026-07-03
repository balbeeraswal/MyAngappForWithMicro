import {  CanActivate, Router } from '@angular/router';
import { TokenService } from '../services/token-service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn:'root'})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): boolean {
    if (this.tokenService.hasToken()) {
      return true;
    } else {
      // No token → page refresh or logout
      this.router.navigate(['/login']);
      return false;
    }
  }
}