import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { EmployeeService } from '../../../EmployeeService';
import { Employee } from '../../../models/employee.model';

/**
 * Admin dashboard: search employees, add a new employee, list results.
 * Standalone component — no NgModule needed.
 */
@Component({
  selector: 'app-dashboard-admin-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  // OnPush: we tell Angular when data changes via markForCheck() after async work
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-admin-component.html',
})
export class DashboardAdminComponent implements OnInit, OnDestroy {
  /** Form for creating a new employee (name + two IDs) */
  employeeForm: FormGroup;

  /** Separate control for the search box (not part of employeeForm) */
  searchControl = new FormControl('');

  /** List from the API; shown in the table (optionally filtered) */
  employees: Employee[] = [];

  /** True while POST addEmployee is in flight — disables double submit */
  isSubmitting = false;

  /** Emits when the component is destroyed; used to cancel HTTP subscriptions */
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly employeesService: EmployeeService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    // Build the reactive form with three required fields
    this.employeeForm = this.fb.group({
      empName: ['', Validators.required],
      deptId: [null, Validators.required],
      locId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadEmployees(); // initial table data
  }

  /** GET employees from API and store in employees */
  loadEmployees(): void {
    this.employeesService
      .getEmployees()
      .pipe(takeUntil(this.destroy$)) // stop if user navigates away
      .subscribe((response) => {
        this.employees = response.data ?? []; // API may return null data
        this.cdr.markForCheck(); // OnPush: refresh the view
      });
  }

  /**
   * Table uses this instead of employees directly.
   * If search is empty → show everyone; else → filter by name or ID text.
   */
  filteredEmployees(): Employee[] {
    const raw = (this.searchControl.value ?? '').toString().trim().toLowerCase();
    if (!raw) {
      return this.employees;
    }

    return this.employees.filter((emp) => {
      const nameMatch = emp.empName.toLowerCase().includes(raw);
      const deptMatch = emp.deptId.toString().includes(raw);
      const locMatch = emp.locId.toString().includes(raw);
      return nameMatch || deptMatch || locMatch;
    });
  }

  /** Save new employee: validate, POST, reload list, reset form */
  onSubmit(): void {
    // Block submit if invalid or already posting
    if (this.employeeForm.invalid || this.isSubmitting) {
      this.employeeForm.markAllAsTouched(); // show validation errors in template
      return;
    }

    this.isSubmitting = true;
    this.cdr.markForCheck(); // show "Submitting..." on button

    this.employeesService
      .addEmployee(this.employeeForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.employeeForm.reset();
          this.loadEmployees(); // refresh table
          this.isSubmitting = false;
          this.cdr.markForCheck();
        },
        error: () => {
          this.isSubmitting = false;
          this.cdr.markForCheck();
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // unsubscribe takeUntil observers
    this.destroy$.complete();
  }
}
