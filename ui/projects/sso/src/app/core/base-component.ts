import { inject, Directive } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { State } from './state';
import { ToastStore } from '@projects/shared-lib';

export interface ExecuteRequestOptions<T> {
  state: State<T>;
  request: Observable<T>;
  handleError?: boolean;
  handleSuccess?: boolean;
  onSuccess?: (response: T) => void | Promise<void>;
}

@Directive()
export abstract class BaseComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  private toastStore = inject(ToastStore);

  executeRequest<T>(options: ExecuteRequestOptions<T>): void {
    const { state, request, handleError, handleSuccess, onSuccess } = options;
    state.notifyLoading();
    request.subscribe({
      next: async (response: T) => {
        state.notifySuccess(response);
        if (handleSuccess) {
          this.toastStore.success('Operation completed successfully.');
        }
        if (onSuccess) {
          await onSuccess(response);
        }
      },
      error: (error: any) => {
        state.notifyError(error);
        if (handleError) {
          const message =
            error?.error?.message || error?.message || 'An error occurred.';
          this.toastStore.error(message);
        }
      },
    });
  }
}
