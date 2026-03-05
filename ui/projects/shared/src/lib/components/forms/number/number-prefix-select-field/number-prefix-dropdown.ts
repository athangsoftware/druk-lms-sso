import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { NumberPrefixSelectOption } from './number-prefix-select-field';

@Component({
    selector: 'ui-number-prefix-dropdown',
    imports: [CommonModule],
    templateUrl: './number-prefix-dropdown.html'
})
export class NumberPrefixDropdown {
    data = inject(DIALOG_DATA) as { options: NumberPrefixSelectOption[], currentValue: string };
    dialogRef = inject(DialogRef);

    select(value: string) {
        this.dialogRef.close(value);
    }
}
