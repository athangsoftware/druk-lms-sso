import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Button, TextInputComponent, httpMutation } from '@projects/shared-lib';
import { ApiService } from '@core/api/api.service';
import { CreateRbacActionResponse } from '@core/api/model';

interface CreateActionData {
  name: string;
}

@Component({
  selector: 'app-create-action',
  standalone: true,
  imports: [BaseOverlay, TextInputComponent, Button, FormField],
  templateUrl: './create-action.component.html',
})
export class CreateActionComponent {
  private apiService = inject(ApiService);
  dialogRef = inject(DialogRef);

  actionModel = signal<CreateActionData>({
    name: '',
  });

  actionForm = form(this.actionModel, (s) => {
    required(s.name);
  });

  createActionMutation = httpMutation<CreateRbacActionResponse>({
    request: () => this.apiService.createRbacAction({
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
    await this.createActionMutation.trigger();
  }
}
