import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Button, TextInputComponent, httpMutation } from '@projects/shared-lib';
import { ApiService } from '@core/api/api.service';
import { RbacActionItem, UpdateRbacActionResponse } from '@core/api/model';

interface UpdateActionData {
  name: string;
}

@Component({
  selector: 'app-update-action',
  standalone: true,
  imports: [BaseOverlay, TextInputComponent, Button, FormField],
  templateUrl: './update-action.component.html',
})
export class UpdateActionComponent {
  private apiService = inject(ApiService);
  dialogRef = inject(DialogRef);
  data: RbacActionItem = inject(DIALOG_DATA);

  actionModel = signal<UpdateActionData>({
    name: this.data.name,
  });

  actionForm = form(this.actionModel, (s) => {
    required(s.name);
  });

  updateActionMutation = httpMutation<UpdateRbacActionResponse>({
    request: () => this.apiService.updateRbacAction(this.data.id, {
      name: this.actionModel().name,
    }),
    handleSuccess: true,
    onSuccess: (response) => {
      this.dialogRef.close(response);
    },
  });

  isFormValid() {
    return this.actionForm.name().valid();
  }

  async onSubmit() {
    if (!this.isFormValid()) return;
    await this.updateActionMutation.trigger();
  }
}
