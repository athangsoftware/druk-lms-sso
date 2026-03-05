import { type Signal } from '@angular/core';
import { inject } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { OverlayStore } from '../overlay/overlay';

export interface UnsavedAware {
    hasUnsavedChanges: Signal<boolean>;
}


export class UnsavedChangesGuard implements CanDeactivate<UnsavedAware> {
    private overlayStore = inject(OverlayStore);

    async canDeactivate(component: UnsavedAware): Promise<boolean> {
        if (component.hasUnsavedChanges()) {
            return await this.overlayStore.openAlert('Unsaved Changes', 'You have unsaved changes. Do you really want to leave?');
        }
        return true;
    }
}