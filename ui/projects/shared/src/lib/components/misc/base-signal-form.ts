import { computed, Directive, HostListener } from '@angular/core';
import { UnsavedAware } from './un-saved-changes-guard';

@Directive()
export abstract class BaseSignalForm implements UnsavedAware {
    abstract signalForm: any;
    readonly hasUnsavedChanges = computed(() => {
        return this.signalForm().dirty();
    });

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: BeforeUnloadEvent): void {
        if (this.hasUnsavedChanges()) {
            $event.preventDefault();
            ($event as any).returnValue = '';
        }
    }
}
