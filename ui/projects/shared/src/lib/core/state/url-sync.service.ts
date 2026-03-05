import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class UrlSyncService<T extends Record<string, any>> {
  private router = inject(Router);

  readFromUrl<State extends T>(): Partial<State> {
    const sp = new URL(window.location.href).searchParams;
    const result: Partial<State> = {};

    for (const [key, value] of sp.entries()) {
      if (key === "page") {
        const pageNum = Number(value);
        result[key as keyof State] = (Number.isFinite(pageNum) ? pageNum : 1) as any;
      } else {
        result[key as keyof State] = value as any;
      }
    }

    return result;
  }

  writeToUrl<State extends T>(state: Partial<State>, opts: { replace?: boolean } = {}) {
    const tree = this.router.createUrlTree([], {
      queryParams: state,
      queryParamsHandling: "merge",
    });
    const url = this.router.serializeUrl(tree);
    if (opts.replace !== false) {
      window.history.replaceState({}, "", url); // no navigation → no blink
    } else {
      window.history.pushState({}, "", url);
    }
  }

  onPopState<State extends T>(cb: (state: Partial<State>) => void) {
    window.addEventListener("popstate", () => cb(this.readFromUrl<State>()));
  }
}
