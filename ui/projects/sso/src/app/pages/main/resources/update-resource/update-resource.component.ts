import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Button, TextInputComponent, httpMutation } from '@projects/shared-lib';
import { ApiService } from '@core/api/api.service';
import { RbacResourceItem, UpdateRbacResourceResponse } from '@core/api/model';

interface UpdateResourceData {
  name: string;
}

@Component({
  selector: 'app-update-resource',
  standalone: true,
  imports: [BaseOverlay, TextInputComponent, Button, FormField],
  templateUrl: './update-resource.component.html',
})
export class UpdateResourceComponent {
  private apiService = inject(ApiService);
  dialogRef = inject(DialogRef);
  data: RbacResourceItem = inject(DIALOG_DATA);

  resourceModel = signal<UpdateResourceData>({
    name: this.data.name,
  });

  resourceForm = form(this.resourceModel, (s) => {
    required(s.name);
  });

  updateResourceMutation = httpMutation<UpdateRbacResourceResponse>({
    request: () => this.apiService.updateRbacResource(this.data.id, {
      name: this.resourceModel().name,
    }),
    handleSuccess: true,
    onSuccess: (response) => {
      this.dialogRef.close(response);
    },
  });

  isFormValid() {
    return this.resourceForm.name().valid();
  }

  async onSubmit() {
    if (!this.isFormValid()) return;
    await this.updateResourceMutation.trigger();
  }
}
