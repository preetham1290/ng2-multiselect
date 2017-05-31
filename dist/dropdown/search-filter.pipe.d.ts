import { PipeTransform } from '@angular/core';
import { IMultiSelectOption } from './types';
export declare class MultiSelectSearchFilter implements PipeTransform {
    transform(options: Array<IMultiSelectOption>, args: string): void;
}
