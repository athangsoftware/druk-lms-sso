import { Component } from '@angular/core';
import { GetUserListItem } from '@core/api/model';
import { TableCustom, SvgIconComponent } from '@projects/shared-lib';

@Component({
  selector: 'app-table-cell-enable-disable',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './table-cell-enable-disable.component.html',
})
export class TableCellEnableDisableComponent extends TableCustom<GetUserListItem> {}
