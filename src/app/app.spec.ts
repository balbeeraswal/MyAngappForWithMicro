import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { App } from './app';
import { of } from 'rxjs';
import { EmployeeService } from './EmployeeService';
import { DashboardAdminComponent } from './features/dashboard/dashboard-admin/dashboard-admin-component';

class MockEmployeeService {
  getEmployees = vi.fn().mockReturnValue(of({ data: [] }));
  addEmployee = vi.fn().mockReturnValue(of({}));
  getEmployeeById = vi.fn();
}

describe('App', () => {
  let component: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    const fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});

describe('DashboardAdminComponent', () => {
  let component: DashboardAdminComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DashboardAdminComponent],
      providers: [
        FormBuilder,
        { provide: EmployeeService, useClass: MockEmployeeService },
        { provide: ChangeDetectorRef, useValue: { markForCheck: vi.fn() } },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(DashboardAdminComponent);
    component = fixture.componentInstance;
  });

  it('should initialize employeeForm with required controls', () => {
    expect(component.employeeForm.contains('empName')).toBe(true);
    expect(component.employeeForm.contains('deptId')).toBe(true);
    expect(component.employeeForm.contains('locId')).toBe(true);
  });
});
