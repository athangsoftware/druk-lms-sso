import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { DatePrefixSelectOption } from './date-prefix-select-field';

@Component({
    selector: 'ui-date-prefix-dropdown',
    imports: [CommonModule],
    templateUrl: './date-prefix-dropdown.html'
})
export class DatePrefixDropdown {
    data = inject(DIALOG_DATA) as { options: DatePrefixSelectOption[], currentValue: string };
    dialogRef = inject(DialogRef);

    select(value: string) {
        this.dialogRef.close(value);
    }
}
