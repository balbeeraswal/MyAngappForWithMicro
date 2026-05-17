import '@angular/compiler';
import '@angular/platform-browser-dynamic';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FormBuilder } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { App } from './app';

class MockEmployeeService {
  getEmployees = vi.fn().mockReturnValue(of({ data: [] }));
  addEmployee = vi.fn().mockReturnValue(of({}));
  getEmployeeById = vi.fn();
}

class MockChangeDetectorRef implements ChangeDetectorRef {
  markForCheck = vi.fn();
  detach(): void {}
  detectChanges(): void {}
  checkNoChanges(): void {}
  reattach(): void {}
}

describe('App Component', () => {
  let app: App;
  let mockEmployeeService: MockEmployeeService;

  beforeEach(() => {
    mockEmployeeService = new MockEmployeeService();
    app = new App(new FormBuilder(), mockEmployeeService as any, new MockChangeDetectorRef());
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should initialize employeeForm with required controls', () => {
    app.ngOnInit();

    expect(app.employeeForm.contains('empName')).toBe(true);
    expect(app.employeeForm.contains('deptId')).toBe(true);
    expect(app.employeeForm.contains('locId')).toBe(true);
  });
});
