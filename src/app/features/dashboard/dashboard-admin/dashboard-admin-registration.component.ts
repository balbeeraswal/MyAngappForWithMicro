import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import {
  DashboardAdminRegistrationPayload,
  DashboardAdminRegistrationService,
} from './dashboard-admin-registration.service';

const NAME_MAX = 100;
const NAME_MIN = 2;
const NAME_PATTERN = /^[a-zA-Z\s.'-]+$/;

const ADDRESS_MAX = 500;
const ADDRESS_MIN = 10;

function noWhitespaceOnly(control: AbstractControl): ValidationErrors | null {
  const value = (control.value ?? '').toString();
  return value.trim().length === 0 ? { whitespaceOnly: true } : null;
}

@Component({
  selector: 'app-dashboard-admin-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-admin-registration.component.html',
})
export class DashboardAdminRegistrationComponent implements OnDestroy {
  private readonly fb = inject(FormBuilder);

  readonly registrationForm = this.fb.group({
    name: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.minLength(NAME_MIN),
        Validators.maxLength(NAME_MAX),
        Validators.pattern(NAME_PATTERN),
        noWhitespaceOnly,
      ],
    }),
    fatherName: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.minLength(NAME_MIN),
        Validators.maxLength(NAME_MAX),
        Validators.pattern(NAME_PATTERN),
        noWhitespaceOnly,
      ],
    }),
    addresses: this.fb.array<FormControl<string | null>>([this.createAddressControl()]),
  });

  isSubmitting = false;
  submitError: string | null = null;
  submitSuccess = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly registrationApi: DashboardAdminRegistrationService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  get addresses(): FormArray<FormControl<string | null>> {
    return this.registrationForm.controls.addresses;
  }

  createAddressControl(): FormControl<string | null> {
    return this.fb.control('', {
      validators: [
        Validators.required,
        Validators.minLength(ADDRESS_MIN),
        Validators.maxLength(ADDRESS_MAX),
        noWhitespaceOnly,
      ],
    });
  }

  addAddress(): void {
    this.addresses.push(this.createAddressControl());
    this.cdr.markForCheck();
  }

  removeAddress(index: number): void {
    if (this.addresses.length <= 1) {
      return;
    }
    this.addresses.removeAt(index);
    this.cdr.markForCheck();
  }

  addressControlAt(index: number): FormControl<string | null> {
    return this.addresses.at(index);
  }

  onSubmit(): void {
    this.submitError = null;
    this.submitSuccess = false;

    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      this.cdr.markForCheck();
      return;
    }

    const raw = this.registrationForm.getRawValue();
    const payload: DashboardAdminRegistrationPayload = {
      name: raw.name!.trim(),
      fatherName: raw.fatherName!.trim(),
      addresses: raw.addresses!.map((a) => (a ?? '').trim()),
    };

    this.isSubmitting = true;
    this.registrationApi
      .submit(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.submitSuccess = true;
          this.registrationForm.reset();
          while (this.addresses.length > 1) {
            this.addresses.removeAt(this.addresses.length - 1);
          }
          this.addresses.at(0).reset('');
          this.cdr.markForCheck();
        },
        error: () => {
          this.isSubmitting = false;
          this.submitError = 'Submission failed. Please try again.';
          this.cdr.markForCheck();
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
