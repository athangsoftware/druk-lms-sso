import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  template: `
    <div style="text-align: center; padding: 48px 20px;">
      <h2>403 – Unauthorized</h2>
      <p>You do not have permission to access this page.</p>
      <button (click)="goHome()">Go to Home</button>
    </div>
  `,
})
export class UnauthorizedComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/main']);
  }
}
