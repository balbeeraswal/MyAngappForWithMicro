import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { EmployeeService } from './app/EmployeeService';
import { App } from './app/app';


bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
