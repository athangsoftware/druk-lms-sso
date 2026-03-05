import { signal, computed, effect, untracked, inject } from "@angular/core";
import { UrlSyncService } from "./url-sync.service";

export abstract class RouteParam<T extends Record<string, any>> {
  protected params = signal<T>(this.getDefaultParams());

  // Type get as an object of functions returning query parameter values
  readonly get = new Proxy(
    {},
    {
      get: (_, prop: string) => computed(() => this.params()[prop as keyof T]),
    },
  ) as { [K in keyof T]: () => T[K] };

  protected urlSyncService = inject(UrlSyncService<T>, { optional: true });

  constructor() {
    if (this.urlSyncService) {
      // Hydrate from URL on app start
      const initial = this.urlSyncService.readFromUrl<T>();
      untracked(() => this.replaceParams(initial));

      // Keep URL in sync without navigation
      effect(() => {
        this.urlSyncService!.writeToUrl(this.params(), { replace: true });
      });

      // Listen to back/forward (popstate) and rehydrate params
      this.urlSyncService.onPopState<T>((params) => {
        untracked(() => this.replaceParams(params));
      });
    }
  }

  protected abstract getDefaultParams(): T;

  updateParams(updates: Partial<T>) {
    this.params.update((current) => ({ ...current, ...updates }));
  }

  protected replaceParams(updates: Partial<T>) {
    this.updateParams(updates);
  }
}
