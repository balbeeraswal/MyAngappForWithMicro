import { Component, OnInit } from '@angular/core';
import { DashboardAdminComponent } from './features/dashboard/dashboard-admin/dashboard-admin-component';
import { CounterComponent } from './features/counter/counter';
import { ShopComponent } from './features/shop/shop';
import { TokenService } from './core/services/token-service';
import { AuthService } from './core/services/auth-service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [DashboardAdminComponent, CounterComponent, ShopComponent],
  styles: [''],
})
export class App implements OnInit {
  constructor(private authService:AuthService,private tokenService:TokenService) {  }
  ngOnInit(): void {
     if(!this.tokenService.hasToken())
     {
      this.authService.refreshToken();
     }
  }
}
