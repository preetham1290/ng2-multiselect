import { IMultiSelectSettings, IMultiSelectTexts } from './types';
import { DoCheck, ElementRef, EventEmitter, IterableDiffers, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, Validator } from '@angular/forms';
export declare class MultiselectDropdown implements OnInit, OnChanges, DoCheck, ControlValueAccessor, Validator {
    private element;
    options: Array<any>;
    settings: IMultiSelectSettings;
    texts: IMultiSelectTexts;
    disabled: boolean;
    selectionLimitReached: EventEmitter<{}>;
    dropdownClosed: EventEmitter<{}>;
    dropdownOpened: EventEmitter<{}>;
    onAdded: EventEmitter<{}>;
    onRemoved: EventEmitter<{}>;
    onClick(target: HTMLElement): void;
    model: any[];
    title: string;
    differ: any;
    numSelected: number;
    isVisible: boolean;
    searchFilterText: string;
    defaultSettings: IMultiSelectSettings;
    defaultTexts: IMultiSelectTexts;
    constructor(element: ElementRef, differs: IterableDiffers);
    getItemStyle(option: any): any;
    getKeyValue(option: any): any;
    getLabelValue(option: any): any;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    onModelChange: Function;
    onModelTouched: Function;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(isDisabled: boolean): void;
    ngDoCheck(): void;
    validate(_c: AbstractControl): {
        [key: string]: any;
    };
    registerOnValidatorChange(_fn: () => void): void;
    clearSearch(event: Event): void;
    toggleDropdown(): void;
    isSelected(option: any): boolean;
    setSelected(_event: Event, option: any): void;
    updateNumSelected(): void;
    updateTitle(): void;
    searchFilterApplied(): boolean;
    checkAll(): void;
    uncheckAll(): void;
    preventCheckboxCheck(event: Event, option: any): void;
}