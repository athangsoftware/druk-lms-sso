// utils/explicit-effect.ts
import { effect, type EffectRef, type EffectCleanupFn, type EffectCleanupRegisterFn, type Injector } from "@angular/core";

export interface ExplicitEffectOptions {
  injector?: Injector;
  manualCleanup?: boolean;
  debugName?: string;
}

export function explicitEffect<T extends readonly any[]>(
  deps: T,
  fn: (values: { [K in keyof T]: any }, onCleanup: EffectCleanupRegisterFn) => void | EffectCleanupFn,
  options: ExplicitEffectOptions = {},
): EffectRef {
  const { injector, manualCleanup, debugName } = options;

  // Upfront read to track exactly these deps (ensures subscription)
  deps.forEach((dep) => dep());

  return effect(
    (onCleanup) => {
      // Re-read for reactivity (tracks changes to these deps only)
      const values = deps.map((dep) => dep());

      // Execute user fn with values and onCleanup (for registering multiple cleanups)
      const userCleanup = fn(values as any, onCleanup);

      // If fn returns a cleanup, register it via onCleanup
      if (typeof userCleanup === "function") {
        onCleanup(userCleanup);
      }
    },
    {
      injector,
      manualCleanup,
      ...(debugName && { debugName }),
    },
  );
}
