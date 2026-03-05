import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { TextPrefixSelectOption } from './text-prefix-select-field';

@Component({
    selector: 'ui-text-prefix-dropdown',
    imports: [CommonModule],
    templateUrl: './text-prefix-dropdown.html'
})
export class TextPrefixDropdown {
    data = inject(DIALOG_DATA) as { options: TextPrefixSelectOption[], currentValue: string };
    dialogRef = inject(DialogRef);

    select(value: string) {
        this.dialogRef.close(value);
    }
}
