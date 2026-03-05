import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button, TextInputComponent, httpMutation } from '@projects/shared-lib';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@core/api/api.service';

@Component({
  selector: 'app-set-password',
  standalone: true,
  imports: [ReactiveFormsModule, TextInputComponent, Button],
  templateUrl: './set-password.component.html',
})
export class SetPasswordComponent implements OnInit {
  form!: FormGroup;
  token: string = '';

  formBuilder = inject(FormBuilder);
  apiService = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  setPasswordMutation = httpMutation<any>({
    request: () => this.apiService.setPassword({ token: this.token, password: this.form.value.password }),
    handleSuccess: false,
    handleError: true,
    onSuccess: () => {
      this.router.navigate(['/login']);
    },
  });

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'] || this.route.snapshot.queryParams['token'];

    if (!this.token) {
      this.router.navigate(['/login']);
      return;
    }

    this.form = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      },
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    await this.setPasswordMutation.trigger();
  }

  getPasswordStrength(): string {
    const password = this.form.get('password')?.value || '';
    if (password.length === 0) return '';
    if (password.length < 6) return 'weak';
    if (password.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return 'medium';
    if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) return 'strong';
    return 'medium';
  }

  hasMinLength(): boolean {
    return (this.form.get('password')?.value?.length || 0) >= 8;
  }

  hasLowercase(): boolean {
    return /(?=.*[a-z])/.test(this.form.get('password')?.value || '');
  }

  hasUppercase(): boolean {
    return /(?=.*[A-Z])/.test(this.form.get('password')?.value || '');
  }

  hasNumber(): boolean {
    return /(?=.*\d)/.test(this.form.get('password')?.value || '');
  }

  hasSpecialChar(): boolean {
    return /(?=.*[@$!%*?&])/.test(this.form.get('password')?.value || '');
  }
}
