/*
 * Angular 2 Dropdown Multiselect for Bootstrap
 *
 * Simon Lindh
 * https://github.com/softsimon/angular-2-dropdown-multiselect
 */
import { MultiSelectSearchFilter } from './search-filter.pipe';
import { IMultiSelectSettings, IMultiSelectTexts } from './types';
import {
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  IterableDiffers,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';

const MULTISELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiselectDropdown),
  multi: true
};

@Component({
  selector: 'ng2-multiselect',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [MULTISELECT_VALUE_ACCESSOR]
})
export class MultiselectDropdown implements OnInit, OnChanges, DoCheck, ControlValueAccessor, Validator {
  @Input() options: Array<any>;
  @Input() settings: IMultiSelectSettings;
  @Input() texts: IMultiSelectTexts;
  @Input() disabled: boolean = false;
  @Output() selectionLimitReached = new EventEmitter();
  @Output() dropdownClosed = new EventEmitter();
  @Output() dropdownOpened = new EventEmitter();
  @Output() onAdded = new EventEmitter();
  @Output() onRemoved = new EventEmitter();

  @HostListener('document: click', ['$event.target'])
  onClick(target: HTMLElement) {
    if (!this.isVisible) return;
    let parentFound = false;
    while (target != null && !parentFound) {
      if (target === this.element.nativeElement) {
        parentFound = true;
      }
      target = target.parentElement;
    }
    if (!parentFound) {
      this.isVisible = false;
      this.dropdownClosed.emit();
    }
  }

  model: any[];
  parents: any[];
  title: string;
  differ: any;
  numSelected: number = 0;
  isVisible: boolean = false;
  searchFilterText: string = '';

  defaultSettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: false,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default btn-secondary',
    containerClasses: 'dropdown-inline',
    selectionLimit: 0,
    closeOnSelect: false,
    autoUnselect: false,
    showCheckAll: false,
    showUncheckAll: false,
    fixedTitle: false,
    dynamicTitleMaxItems: 3,
    maxHeight: '300px',
    keyToSelect: '',
    lableToDisplay: '',
    isSimpleArray: false
  };
  defaultTexts: IMultiSelectTexts = {
    checkAll: 'Check all',
    uncheckAll: 'Uncheck all',
    checked: 'checked',
    checkedPlural: 'checked',
    searchPlaceholder: 'Search...',
    defaultTitle: 'Select',
    allSelected: 'All selected',
  };

  constructor(private element: ElementRef,
    differs: IterableDiffers) {
    this.differ = differs.find([]).create(null);
  }

  getItemStyle(option: any): any {
    if (!option.isLabel) {
      return { 'cursor': 'pointer' };
    }
  }

  getKeyValue(option: any) {
    if (this.settings.isSimpleArray) {
      return option;
    } else {
      return option[this.settings.keyToSelect];
    }
  }

  getLabelValue(option: any) {
    if (this.settings.isSimpleArray) {
      return option;
    } else {
      return option[this.settings.lableToDisplay];
    }
  }

  ngOnInit() {
    this.settings = Object.assign(this.defaultSettings, this.settings);
    this.texts = Object.assign(this.defaultTexts, this.texts);
    this.title = this.texts.defaultTitle || '';
    if (this.settings.isSimpleArray && (this.settings.keyToSelect !== '' || this.settings.lableToDisplay !== '')) {
      throw new Error('Do no pass keyToSelect or lableToDisplay if it is simple array');
    } else if (!this.settings.isSimpleArray && (this.settings.keyToSelect === '' || this.settings.lableToDisplay === '')) {
      throw new Error('Pass keyToSelect or lableToDisplay if it is not simple array');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.options = this.options || [];
    }

    if (changes['texts'] && !changes['texts'].isFirstChange()) {
      this.updateTitle();
    }
  }

  onModelChange: Function = (_: any) => { };
  onModelTouched: Function = () => { };

  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.model = value;
    } else {
      this.model = [];
    }
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  ngDoCheck() {
    const changes = this.differ.diff(this.model);
    if (changes) {
      this.updateNumSelected();
      this.updateTitle();
    }
  }

  validate(_c: AbstractControl): { [key: string]: any; } {
    return (this.model && this.model.length) ? null : {
      required: {
        valid: false,
      },
    };
  }

  registerOnValidatorChange(_fn: () => void): void {
    throw new Error('Method not implemented.');
  }

  clearSearch(event: Event) {
    event.stopPropagation();
    this.searchFilterText = '';
  }

  toggleDropdown() {
    this.isVisible = !this.isVisible;
    this.isVisible ? this.dropdownOpened.emit() : this.dropdownClosed.emit();
  }

  isSelected(option: any): boolean {
    return this.model && this.model.indexOf(this.getKeyValue(option)) > -1;
  }

  setSelected(_event: Event, option: any) {
    _event.stopPropagation();
    if (!this.model) {
      this.model = [];
    }
    const index = this.model.indexOf(this.getKeyValue(option));
    if (index > -1) {
      this.model.splice(index, 1);
      this.onRemoved.emit(this.getKeyValue(option));
    } else {
      if (this.settings.selectionLimit === 0 || (this.settings.selectionLimit && this.model.length < this.settings.selectionLimit)) {
        this.model.push(this.getKeyValue(option));
        this.onAdded.emit(this.getKeyValue(option));
      } else {
        if (this.settings.autoUnselect) {
          this.model.push(this.getKeyValue(option));
          this.onAdded.emit(this.getKeyValue(option));
          const removedOption = this.model.shift();
          this.onRemoved.emit(removedOption);
        } else {
          this.selectionLimitReached.emit(this.model.length);
          return;
        }
      }
    }
    if (this.settings.closeOnSelect) {
      this.toggleDropdown();
    }
    this.model = this.model.slice();
    this.onModelChange(this.model);
    this.onModelTouched();
  }

  updateNumSelected() {
    this.numSelected = this.model && this.model.filter(id => this.parents.indexOf(id) < 0).length || 0;
  }

  updateTitle() {
    if (this.numSelected === 0 || this.settings.fixedTitle) {
      this.title = this.texts.defaultTitle || '';
    } else if (this.settings.displayAllSelectedText && this.model.length === this.options.length) {
      this.title = this.texts.allSelected || '';
    } else if (this.settings.dynamicTitleMaxItems && this.settings.dynamicTitleMaxItems >= this.numSelected) {
      this.title = this.options
        .filter((option: any) =>
          this.model && this.model.indexOf(this.getKeyValue(option)) > -1
        )
        .map((option: any) => this.getLabelValue(option))
        .join(', ');
    } else {
      this.title = this.numSelected
        + ' '
        + (this.numSelected === 1 ? this.texts.checked : this.texts.checkedPlural);
    }
  }

  searchFilterApplied() {
    return this.settings.enableSearch && this.searchFilterText && this.searchFilterText.length > 0;
  }

  checkAll() {
    let checkedOptions = (!this.searchFilterApplied() ? this.options :
      (new MultiSelectSearchFilter()).transform(this.options, this.searchFilterText))
      .filter((option: any) => {
        if (this.model.indexOf(this.getKeyValue(option)) === -1) {
          this.onAdded.emit(this.getKeyValue(option));
          return true;
        }
        return false;
      }).map((option: any) => this.getKeyValue(option));
    this.model = this.model.concat(checkedOptions);
    this.onModelChange(this.model);
    this.onModelTouched();
  }

  uncheckAll() {
    let unCheckedOptions = (!this.searchFilterApplied() ? this.model
      : (new MultiSelectSearchFilter()).transform(this.options, this.searchFilterText).map((option: any) => this.getKeyValue(option))
    );
    this.model = this.model.filter((id: any) => {
      if (unCheckedOptions.indexOf(id) < 0) {
        return true;
      } else {
        this.onRemoved.emit(id);
        return false;
      }
    });
    this.onModelChange(this.model);
    this.onModelTouched();
  }

  preventCheckboxCheck(event: Event, option: any) {
    if (this.settings.selectionLimit && !this.settings.autoUnselect &&
      this.model.length >= this.settings.selectionLimit &&
      this.model.indexOf(this.getKeyValue(option)) === -1
    ) {
      event.preventDefault();
    }
  }
}
