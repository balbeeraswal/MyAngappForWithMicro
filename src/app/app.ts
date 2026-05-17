import { Component } from '@angular/core';
import { DashboardAdminComponent } from './features/dashboard/dashboard-admin/dashboard-admin-component';
import { DashboardAdminRegistrationComponent } from './features/dashboard/dashboard-admin/dashboard-admin-registration.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [DashboardAdminComponent, DashboardAdminRegistrationComponent],
  styles: [''],
})
export class App {}
