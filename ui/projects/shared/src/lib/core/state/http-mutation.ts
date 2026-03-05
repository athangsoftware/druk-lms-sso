import { HttpErrorResponse } from "@angular/common/http";
import { inject, signal } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import { LoaderStore } from "../../components/feedback/loader/loader-store";
import { ToastStore } from "../../components/misc/toast/toast-store";

export interface HttpWrapperOptions<T> {
  request: () => Observable<T>;
  onSuccess?: (res: T) => void;
  onFailed?: (err: HttpErrorResponse) => void;
  onLoading?: () => void;
  showLoader?: boolean;
  handleSuccess?: boolean;
  handleError?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

export function httpMutation<T>(opts: HttpWrapperOptions<T>) {
  const loader = inject(LoaderStore);
  const toast = inject(ToastStore);

  const isLoading = signal(false);
  const data = signal<T | null>(null);
  const error = signal<HttpErrorResponse | null>(null);
  const requestId = Date.now().toString();

  // Set default values
  const showLoader = opts.showLoader ?? true;
  const handleSuccess = opts.handleSuccess ?? true;
  const handleError = opts.handleError ?? true;

  return {
    trigger: async () => {
      console.log(`httpMutation[${requestId}]: Triggering request`);
      try {
        isLoading.set(true);
        opts.onLoading?.();
        if (showLoader) loader.show();

        const res = await firstValueFrom(opts.request());

        console.log(`httpMutation[${requestId}]: Success`);
        data.set(res as T);
        opts.onSuccess?.(res as T);

        if (handleSuccess || opts.successMessage) {
          toast.success(opts.successMessage ?? (res as any)?.successMessage ?? "✅ Success");
        }

        return res as T;
      } catch (err) {
        console.log(`httpMutation[${requestId}]: Error`, err);
        error.set(err as HttpErrorResponse);
        opts.onFailed?.(err as HttpErrorResponse);

        if (handleError || opts.errorMessage) {
          toast.error(opts.errorMessage ?? (err as any)?.error?.message ?? "❌ Something went wrong");
        }

        throw err;
      } finally {
        console.log(`httpMutation[${requestId}]: Request complete`);
        isLoading.set(false);
        if (showLoader) loader.hide();
      }
    },
    isLoading,
    data,
    error,
  };
}
