import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastStore } from '../toast/toast-store';
import { Subscription } from 'rxjs';

interface Toast {
  id: number;
  message: string;
  type: string;
}

let nextId = 0;

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-9999 flex flex-col gap-2">
      @for (toast of toasts(); track toast.id) {
        <div
          class="px-4 py-3 rounded-lg shadow-lg text-white text-sm min-w-70 max-w-100 animate-slide-in"
          [class]="getToastClass(toast.type)"
        >
          <div class="flex items-start gap-2">
            <span class="flex-1">{{ toast.message }}</span>
            <button class="opacity-70 hover:opacity-100" (click)="remove(toast.id)">✕</button>
          </div>
        </div>
      }
    </div>
  `,
  styles: `
    @keyframes slide-in {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    .animate-slide-in {
      animation: slide-in 0.3s ease-out;
    }
  `,
})
export class ToasterComponent implements OnInit, OnDestroy {
  private toastStore = inject(ToastStore);
  private sub?: Subscription;
  toasts = signal<Toast[]>([]);

  ngOnInit(): void {
    this.sub = this.toastStore.toastEvents.subscribe((event: any) => {
      const id = ++nextId;
      const toast: Toast = { id, message: event.message, type: event.type };
      this.toasts.update((list) => [...list, toast]);
      const duration = event.duration ?? ToastStore.defaultDuration;
      setTimeout(() => this.remove(id), duration);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  remove(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  getToastClass(type: string): string {
    switch (type) {
      case 'success':
        return 'bg-green-600';
      case 'error':
        return 'bg-red-600';
      case 'warning':
        return 'bg-amber-600';
      case 'info':
        return 'bg-blue-600';
      default:
        return 'bg-neutral-700';
    }
  }
}
