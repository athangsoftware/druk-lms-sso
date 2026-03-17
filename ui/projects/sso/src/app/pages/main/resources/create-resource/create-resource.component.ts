import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Button, TextInputComponent, httpMutation } from '@projects/shared-lib';
import { ApiService } from '@core/api/api.service';
import { CreateRbacResourceResponse } from '@core/api/model';

interface CreateResourceData {
  name: string;
}

@Component({
  selector: 'app-create-resource',
  standalone: true,
  imports: [BaseOverlay, TextInputComponent, Button, FormField],
  templateUrl: './create-resource.component.html',
})
export class CreateResourceComponent {
  private apiService = inject(ApiService);
  dialogRef = inject(DialogRef);

  resourceModel = signal<CreateResourceData>({
    name: '',
  });

  resourceForm = form(this.resourceModel, (s) => {
    required(s.name);
  });

  createResourceMutation = httpMutation<CreateRbacResourceResponse>({
    request: () => this.apiService.createRbacResource({
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
    await this.createResourceMutation.trigger();
  }
}
