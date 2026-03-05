import { Component, Inject, OnInit, signal, computed } from '@angular/core';

import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { ColumnDef } from '../../data-table-model';
import { TextPrefixSelectField } from '../../../../forms/text/text-prefix-select-field/text-prefix-select-field';
import { NumberPrefixSelectField } from '../../../../forms/number/number-prefix-select-field/number-prefix-select-field';
import { MultiSelectDropdownField } from '../../../../forms/select/multi-select-dropdown-field/multi-select-dropdown-field';
import { DatePrefixSelectField } from '../../../../forms/date/date-prefix-select-field/date-prefix-select-field';

export interface MobileColumnFiltersData {
    columns: ColumnDef[];
    currentFilters: { [key: string]: { value?: any; min?: any; max?: any; operation: string } };
}

interface FilterValues {
    value?: any;
    min?: any;
    max?: any;
}

@Component({
    selector: 'ui-mobile-column-filters-overlay',
    standalone: true,
    imports: [
        TextPrefixSelectField,
        NumberPrefixSelectField,
        MultiSelectDropdownField,
        DatePrefixSelectField
    ],
    templateUrl: './mobile-column-filters-overlay.html'
})
export class MobileColumnFiltersOverlay implements OnInit {
    filterableColumns = signal<ColumnDef[]>([]);
    filterValues = signal<{ [key: string]: FilterValues }>({});
    filterOperations = signal<{ [key: string]: string }>({});

    hasActiveFilters = computed(() => {
        const values = this.filterValues();
        return this.filterableColumns().some(col => {
            const key = this.getFilterKey(col);
            const value = values[key]?.value;

            if (Array.isArray(value)) {
                return value.length > 0;
            }
            return value != null && value !== '';
        });
    });

    constructor(
        public dialogRef: DialogRef<any>,
        @Inject(DIALOG_DATA) public data: MobileColumnFiltersData
    ) { }

    ngOnInit(): void {
        // Filter columns that have filterConfig
        const filterable = this.data.columns.filter(col => !!col.filterConfig);
        this.filterableColumns.set(filterable);

        // Initialize filter values and operations
        const initialValues: { [key: string]: FilterValues } = {};
        const initialOperations: { [key: string]: string } = {};

        filterable.forEach(column => {
            const filterKey = this.getFilterKey(column);
            const currentFilter = this.data.currentFilters[filterKey];

            // Set operation
            initialOperations[filterKey] = currentFilter?.operation || this.getDefaultOperation(column.filterConfig?.type);

            // Initialize values
            const initialValue = currentFilter?.value ?? (column.filterConfig?.type === 'select' ? [] : null);

            initialValues[filterKey] = {
                value: column.filterConfig?.type === 'date' && initialValue
                    ? (this.isValidDate(new Date(initialValue)) ? new Date(initialValue) : null)
                    : initialValue,
                min: currentFilter?.min,
                max: currentFilter?.max
            };
        });

        this.filterValues.set(initialValues);
        this.filterOperations.set(initialOperations);
    }

    getFilterKey(column: ColumnDef): string {
        return column.key || column.sortKey || (column.displayTemplate?.replace(/^\$/, '') || '');
    }

    getFilterValue(column: ColumnDef, property: 'min' | 'max' | 'value'): any {
        const filterKey = this.getFilterKey(column);
        return this.filterValues()[filterKey]?.[property] ?? null;
    }

    getDefaultOperation(type?: string): string {
        switch (type) {
            case 'text':
                return 'contains';
            case 'number':
            case 'date':
                return 'equals';
            case 'select':
                return 'equals';
            default:
                return 'contains';
        }
    }

    getFilterOperations(type?: string): { value: string; label: string; fullName: string; isRange: boolean }[] {
        switch (type) {
            case 'text':
                return [
                    { value: 'contains', label: '⊇', fullName: 'Contains', isRange: false },
                    { value: 'exact', label: '≡', fullName: 'Exact', isRange: false }
                ];
            case 'number':
                return [
                    { value: 'greaterThan', label: '>', fullName: 'Greater Than', isRange: false },
                    { value: 'greaterThanOrEqual', label: '≥', fullName: 'Greater Than or Equal', isRange: false },
                    { value: 'lesserThan', label: '<', fullName: 'Lesser Than', isRange: false },
                    { value: 'lesserThanOrEqual', label: '≤', fullName: 'Lesser Than or Equal', isRange: false },
                    { value: 'equals', label: '=', fullName: 'Equals', isRange: false },
                    { value: 'notEqual', label: '≠', fullName: 'Not Equal', isRange: false },
                    { value: 'between', label: '↔', fullName: 'Between', isRange: true },
                ];
            case 'date':
                return [
                    { value: 'equals', label: '=', fullName: 'Equal', isRange: false },
                    { value: 'before', label: '<', fullName: 'Before', isRange: false },
                    { value: 'after', label: '>', fullName: 'After', isRange: false },
                    { value: 'between', label: '↔', fullName: 'Between', isRange: true }
                ];
            case 'select':
                return [
                    { value: 'equals', label: '=', fullName: 'Equals', isRange: false },
                    { value: 'notEqual', label: '≠', fullName: 'Not Equal', isRange: false }
                ];
            default:
                return [];
        }
    }

    getCurrentOperation(column: ColumnDef): string {
        const filterKey = this.getFilterKey(column);
        return this.filterOperations()[filterKey] || this.getDefaultOperation(column.filterConfig?.type);
    }

    onOperationChange(operation: string, column: ColumnDef): void {
        const filterKey = this.getFilterKey(column);

        // Update operation
        this.filterOperations.update(ops => ({
            ...ops,
            [filterKey]: operation
        }));

        // Clear values when switching operations
        this.filterValues.update(values => {
            const current = values[filterKey] || {};
            if (operation === 'between') {
                return {
                    ...values,
                    [filterKey]: {
                        value: null,
                        min: current.min,
                        max: current.max
                    }
                };
            } else {
                return {
                    ...values,
                    [filterKey]: {
                        value: current.value,
                        min: null,
                        max: null
                    }
                };
            }
        });
    }

    onFilterValueChange(value: any, column: ColumnDef, property: 'min' | 'max' | 'value' = 'value'): void {
        const filterKey = this.getFilterKey(column);

        this.filterValues.update(values => ({
            ...values,
            [filterKey]: {
                ...(values[filterKey] || {}),
                [property]: value
            }
        }));
    }

    onApply(): void {
        const filters: { [key: string]: { value?: any; min?: any; max?: any; operation: string } } = {};
        const currentValues = this.filterValues();
        const currentOperations = this.filterOperations();

        this.filterableColumns().forEach(column => {
            const filterKey = this.getFilterKey(column);
            const operation = currentOperations[filterKey] || this.getDefaultOperation(column.filterConfig?.type);
            const filterData = currentValues[filterKey];
            let value = filterData?.value;

            if (operation === 'between') {
                const min = filterData?.min;
                const max = filterData?.max;

                if (min != null || max != null) {
                    filters[filterKey] = {
                        min: this.parseFilterValue(min, column.filterConfig?.type),
                        max: this.parseFilterValue(max, column.filterConfig?.type),
                        operation
                    };
                }
            } else if (operation === 'between') {
                if (value && typeof value === 'object' && ('startDate' in value || 'endDate' in value)) {
                    filters[filterKey] = {
                        min: value.startDate,
                        max: value.endDate,
                        operation
                    };
                }
            } else {
                const parsedValue = this.parseFilterValue(value, column.filterConfig?.type);
                if (parsedValue != null && (Array.isArray(parsedValue) ? parsedValue.length > 0 : true)) {
                    filters[filterKey] = { value: parsedValue, operation };
                }
            }
        });

        this.dialogRef.close({ action: 'apply', filters });
    }

    onClearAll(): void {
        const clearedValues: { [key: string]: FilterValues } = {};
        const defaultOperations: { [key: string]: string } = {};

        this.filterableColumns().forEach(column => {
            const filterKey = this.getFilterKey(column);

            clearedValues[filterKey] = {
                value: column.filterConfig?.type === 'select' ? [] : null,
                min: null,
                max: null
            };

            defaultOperations[filterKey] = this.getDefaultOperation(column.filterConfig?.type);
        });

        this.filterValues.set(clearedValues);
        this.filterOperations.set(defaultOperations);
    }

    onClose(): void {
        this.dialogRef.close({ action: 'cancel' });
    }

    private parseFilterValue(value: any, type?: string): any {
        if (type === 'select') {
            if (Array.isArray(value)) {
                return value.map(v => typeof v === 'string' ? v : v?.value).filter(Boolean);
            } else if (value) {
                return [typeof value === 'string' ? value : value?.value].filter(Boolean);
            } else {
                return [];
            }
        } else if (type === 'date') {
            const parsed = value ? new Date(value) : null;
            return this.isValidDate(parsed) ? parsed : null;
        }
        return value;
    }

    private isValidDate(date: any): boolean {
        return date instanceof Date && !isNaN(date.getTime());
    }
}
