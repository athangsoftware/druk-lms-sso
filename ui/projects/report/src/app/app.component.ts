import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogModule } from '@angular/cdk/dialog';
import { ToasterComponent } from '@projects/shared-lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DialogModule, ToasterComponent],
  template: `
    <router-outlet />
    <app-toaster />
  `,
})
export class AppComponent {
  protected readonly title = signal('report-web');
}
