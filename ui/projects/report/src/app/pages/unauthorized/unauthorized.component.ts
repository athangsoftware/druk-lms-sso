import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  template: `
    <div class="p-8 text-center">
      <h1 class="text-2xl font-bold text-red-600">Unauthorized</h1>
      <p class="mt-2 text-gray-600">You do not have permission to access this page.</p>
    </div>
  `,
})
export class UnauthorizedComponent {}
