import { HttpErrorResponse, httpResource, HttpResourceRequest } from "@angular/common/http";
import { effect, inject, Resource, signal, untracked } from "@angular/core";
import { LoaderStore } from "../../components/feedback/loader/loader-store";
import { ToastStore } from "../../components/misc/toast/toast-store";

export interface HttpWrapperOptions<T> {
  request: () => string | HttpResourceRequest | undefined;
  onSuccess?: (res: T) => void;
  onFailed?: (err: HttpErrorResponse) => void;
  onLoading?: () => void;
  showLoader?: boolean; // default true
  handleError?: boolean; // default true
  errorMessage?: string;
  handleSuccess?: boolean; // default false
  successMessage?: string;
}

export interface HttpQueryResource<T> extends Resource<T | undefined> {
  refetch: () => void;
}

export function httpQuery<T>(opts: HttpWrapperOptions<T>): HttpQueryResource<T> {
  const toast = inject(ToastStore);
  const loader = inject(LoaderStore);

  const resource = httpResource<T>(() => {
    const req = opts.request();
    if (req === undefined) return undefined;
    return typeof req === 'string' ? { url: req } : req;
  });

  const lastValue = signal<T | undefined>(undefined);
  const isLoaderShown = signal<boolean>(false);
  const requestCycle = signal<number>(0);
  const shownToasts = new Set<string>();
  const successHandled = signal<Map<number, boolean>>(new Map()); // Track handled success per cycle

  // Apply default values
  const showLoader = opts.showLoader ?? true;
  const handleSuccess = opts.handleSuccess ?? false;
  const handleError = opts.handleError ?? true;

  effect(() => {
    const status = resource.status();
    const currentCycle = requestCycle();

    if (showLoader) {
      if (status === "loading" && !isLoaderShown()) {
        loader.show();
        isLoaderShown.set(true);
        requestCycle.set(currentCycle + 1);
        opts.onLoading?.();
      } else if ((status === "resolved" || status === "error") && isLoaderShown()) {
        loader.hide();
        isLoaderShown.set(false);
      }
    }

    if (status === "resolved") {
      const value = untracked(() => resource.value()) as T;
      if (value !== undefined) {
        lastValue.set(value);

        // Check if success has already been handled for this cycle
        if (!successHandled().get(currentCycle)) {
          successHandled.update((map) => new Map(map).set(currentCycle, true));
          opts.onSuccess?.(value);
        }

        if (handleSuccess) {
          const toastId = `success-${currentCycle}`;
          if (!shownToasts.has(toastId)) {
            toast.success(opts.successMessage ?? "✅ Success");
            shownToasts.add(toastId);
          }
        }
      }
    }

    if (status === "error") {
      const err = untracked(() => resource.error()) as HttpErrorResponse;
      opts.onFailed?.(err);
      if (handleError) {
        const toastId = `error-${currentCycle}`;
        if (!shownToasts.has(toastId)) {
          let msg = opts.errorMessage ?? err?.error?.message ?? err?.message ?? "❌ Something went wrong";
          toast.error(msg);
          shownToasts.add(toastId);
        }
      }
    }

    if (shownToasts.size > 100) {
      shownToasts.clear();
    }
  });

  const refetch = () => {
    // Reset state for refetch
    successHandled.update(() => new Map());
    const currentCycle = requestCycle();
    requestCycle.set(currentCycle + 1);

    // Trigger refetch by calling reload on the resource
    resource.reload();
  };

  return {
    ...resource,
    value: () => {
      const v = resource.value();
      return v !== undefined ? v : lastValue();
    },
    refetch,
  } as unknown as HttpQueryResource<T>;
}
