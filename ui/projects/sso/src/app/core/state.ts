import { signal, Signal } from '@angular/core';

export class State<T> {
  private _loading = signal(false);
  private _success = signal(false);
  private _hasError = signal(false);
  private _response = signal<T | null>(null);
  private _error = signal<string | null>(null);

  loading: Signal<boolean> = this._loading.asReadonly();
  success: Signal<boolean> = this._success.asReadonly();
  hasError: Signal<boolean> = this._hasError.asReadonly();
  response: Signal<T | null> = this._response.asReadonly();
  error: Signal<string | null> = this._error.asReadonly();

  notifyLoading() {
    this._loading.set(true);
    this._success.set(false);
    this._hasError.set(false);
    this._error.set(null);
  }

  notifySuccess(response: T) {
    this._response.set(response);
    this._loading.set(false);
    this._success.set(true);
  }

  notifyError(error: any) {
    const message =
      error?.error?.message || error?.message || 'An unexpected error occurred.';
    this._error.set(message);
    this._loading.set(false);
    this._hasError.set(true);
  }
}
