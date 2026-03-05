import { Component, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OAuthService } from '@core/oauth.service';
import { environment } from '@environments/environment';
import { QRCodeComponent } from 'angularx-qrcode';
import { interval, Subscription, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-bhutan-ndi',
  standalone: true,
  imports: [QRCodeComponent],
  templateUrl: './bhutan-ndi.component.html',
})
export class BhutanNdiComponent {
  private http = inject(HttpClient);
  private authService = inject(OAuthService);

  proofRequest = signal<any | null>(null);
  threadId = signal<string | null>(null);
  error = signal<string | null>(null);
  private pollingSubscription: Subscription | null = null;

  ngOnInit() {
    this.createProofRequest();
  }

  ngOnDestroy() {
    this.pollingSubscription?.unsubscribe();
  }

  async createProofRequest(): Promise<void> {
    try {
      const response = await this.authService.initiateNdiLogin();
      this.proofRequest.set(response);
      this.threadId.set(response?.data?.proofRequestThreadId || null);
      this.error.set(null);

      if (this.threadId()) {
        this.startPolling();
      } else {
        this.error.set('Missing threadId in proof request response');
      }
    } catch (err: any) {
      this.error.set(`Failed to create proof request: ${err.message || 'Unknown error'}`);
      this.proofRequest.set(null);
      this.threadId.set(null);
    }
  }

  startPolling(): void {
    const maxPollingDuration = 5 * 60 * 1000;
    this.pollingSubscription = interval(2000)
      .pipe(takeUntil(timer(maxPollingDuration)))
      .subscribe({
        next: () => {
          this.http
            .get<{ status: string; redirectUrl?: string }>(`${environment.apiUrl}/ndi/status`, {
              params: { threadId: this.threadId()! },
              observe: 'response',
              responseType: 'json',
            })
            .subscribe({
              next: (response) => {
                if (
                  response.status === 202 ||
                  (response.status === 200 && response.body?.status === 'pending')
                ) {
                  // Continue polling
                } else if (
                  response.status === 200 &&
                  response.body?.status === 'completed' &&
                  response.body?.redirectUrl
                ) {
                  this.pollingSubscription?.unsubscribe();
                  window.location.href = response.body.redirectUrl;
                } else {
                  this.error.set('Unexpected response from NDI status check');
                  this.pollingSubscription?.unsubscribe();
                }
              },
              error: (err: HttpErrorResponse) => {
                this.error.set(`Failed to poll NDI status: ${err.message || 'Unknown error'}`);
                this.pollingSubscription?.unsubscribe();
              },
            });
        },
        complete: () => {
          this.error.set('Authentication timed out. Please try again.');
          this.pollingSubscription?.unsubscribe();
        },
      });
  }
}
