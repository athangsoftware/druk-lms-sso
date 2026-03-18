import { Component, inject, signal } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Tab, TabModel } from '@projects/shared-lib';
import { ResourcesComponent } from '../../resources/resources.component';
import { ActionsComponent } from '../../actions/actions.component';
import { PermissionGroupsComponent } from '../../permission-groups/permission-groups.component';

type SettingsTab = 'resources' | 'actions' | 'groups';

@Component({
  selector: 'app-permission-settings',
  standalone: true,
  imports: [BaseOverlay, Tab, ResourcesComponent, ActionsComponent, PermissionGroupsComponent],
  templateUrl: './permission-settings.component.html',
})
export class PermissionSettingsComponent {
  dialogRef = inject(DialogRef);

  activeTab = signal<SettingsTab>('resources');

  tabs: TabModel[] = [
    { id: 'resources', title: 'Resources', content: 'resources' },
    { id: 'actions', title: 'Actions', content: 'actions' },
    { id: 'groups', title: 'Groups', content: 'groups' },
  ];

  onTabChange(tabId: string): void {
    this.activeTab.set(tabId as SettingsTab);
  }
}
