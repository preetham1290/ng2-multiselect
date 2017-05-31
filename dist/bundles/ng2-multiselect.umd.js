(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/forms', '@angular/common'], factory) :
	(factory((global['ng2-multiselect'] = global['ng2-multiselect'] || {}),global.ng.core,global.ng.forms,global.ng.common));
}(this, (function (exports,_angular_core,_angular_forms,_angular_common) { 'use strict';

var MultiSelectSearchFilter = (function () {
    function MultiSelectSearchFilter() {
    }
    MultiSelectSearchFilter.prototype.transform = function (options, args) {
        // const matchPredicate = (option: IMultiSelectOption) => option.name.toLowerCase().indexOf((args || '').toLowerCase()) > -1,
        //   getChildren = (option: IMultiSelectOption) => options.filter(child => child.parentId === option.id),
        //   getParent = (option: IMultiSelectOption) => options.find(parent => option.parentId === parent.id);
        // return options.filter((option: IMultiSelectOption) => {
        //   return matchPredicate(option) ||
        //     (typeof (option.parentId) === 'undefined' && getChildren(option).some(matchPredicate)) ||
        //     (typeof (option.parentId) !== 'undefined' && matchPredicate(getParent(option)));
        // });
    };
    MultiSelectSearchFilter.decorators = [
        { type: _angular_core.Pipe, args: [{
                    name: 'searchFilter'
                },] },
    ];
    /** @nocollapse */
    MultiSelectSearchFilter.ctorParameters = function () { return []; };
    return MultiSelectSearchFilter;
}());

var MULTISELECT_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return MultiselectDropdown; }),
    multi: true
};
var MultiselectDropdown = (function () {
    function MultiselectDropdown(element, differs) {
        this.element = element;
        this.disabled = false;
        this.selectionLimitReached = new _angular_core.EventEmitter();
        this.dropdownClosed = new _angular_core.EventEmitter();
        this.dropdownOpened = new _angular_core.EventEmitter();
        this.onAdded = new _angular_core.EventEmitter();
        this.onRemoved = new _angular_core.EventEmitter();
        this.numSelected = 0;
        this.isVisible = false;
        this.searchFilterText = '';
        this.defaultSettings = {
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
        this.defaultTexts = {
            checkAll: 'Check all',
            uncheckAll: 'Uncheck all',
            checked: 'checked',
            checkedPlural: 'checked',
            searchPlaceholder: 'Search...',
            defaultTitle: 'Select',
            allSelected: 'All selected',
        };
        this.onModelChange = function (_) { };
        this.onModelTouched = function () { };
        this.differ = differs.find([]).create(null);
    }
    MultiselectDropdown.prototype.onClick = function (target) {
        if (!this.isVisible)
            return;
        var parentFound = false;
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
    };
    MultiselectDropdown.prototype.getItemStyle = function (option) {
        if (!option.isLabel) {
            return { 'cursor': 'pointer' };
        }
    };
    MultiselectDropdown.prototype.getKeyValue = function (option) {
        if (this.settings.isSimpleArray) {
            return option;
        }
        else {
            return option[this.settings.keyToSelect];
        }
    };
    MultiselectDropdown.prototype.getLabelValue = function (option) {
        if (this.settings.isSimpleArray) {
            return option;
        }
        else {
            return option[this.settings.lableToDisplay];
        }
    };
    MultiselectDropdown.prototype.ngOnInit = function () {
        this.settings = Object.assign(this.defaultSettings, this.settings);
        this.texts = Object.assign(this.defaultTexts, this.texts);
        this.title = this.texts.defaultTitle || '';
        if (this.settings.isSimpleArray && (this.settings.keyToSelect !== '' || this.settings.lableToDisplay !== '')) {
            throw new Error('Do no pass keyToSelect or lableToDisplay if it is simple array');
        }
        else if (!this.settings.isSimpleArray && (this.settings.keyToSelect === '' || this.settings.lableToDisplay === '')) {
            throw new Error('Pass keyToSelect or lableToDisplay if it is not simple array');
        }
    };
    MultiselectDropdown.prototype.ngOnChanges = function (changes) {
        if (changes['options']) {
            this.options = this.options || [];
        }
        if (changes['texts'] && !changes['texts'].isFirstChange()) {
            this.updateTitle();
        }
    };
    MultiselectDropdown.prototype.writeValue = function (value) {
        if (value !== undefined && value !== null) {
            this.model = value;
        }
        else {
            this.model = [];
        }
    };
    MultiselectDropdown.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    MultiselectDropdown.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    MultiselectDropdown.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    MultiselectDropdown.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.model);
        if (changes) {
            this.updateNumSelected();
            this.updateTitle();
        }
    };
    MultiselectDropdown.prototype.validate = function (_c) {
        return (this.model && this.model.length) ? null : {
            required: {
                valid: false,
            },
        };
    };
    MultiselectDropdown.prototype.registerOnValidatorChange = function (_fn) {
        throw new Error('Method not implemented.');
    };
    MultiselectDropdown.prototype.clearSearch = function (event) {
        event.stopPropagation();
        this.searchFilterText = '';
    };
    MultiselectDropdown.prototype.toggleDropdown = function () {
        this.isVisible = !this.isVisible;
        this.isVisible ? this.dropdownOpened.emit() : this.dropdownClosed.emit();
    };
    MultiselectDropdown.prototype.isSelected = function (option) {
        return this.model && this.model.indexOf(this.getKeyValue(option)) > -1;
    };
    MultiselectDropdown.prototype.setSelected = function (_event, option) {
        _event.stopPropagation();
        if (!this.model) {
            this.model = [];
        }
        var index = this.model.indexOf(this.getKeyValue(option));
        if (index > -1) {
            this.model.splice(index, 1);
            this.onRemoved.emit(this.getKeyValue(option));
        }
        else {
            if (this.settings.selectionLimit === 0 || (this.settings.selectionLimit && this.model.length < this.settings.selectionLimit)) {
                this.model.push(this.getKeyValue(option));
                this.onAdded.emit(this.getKeyValue(option));
            }
            else {
                if (this.settings.autoUnselect) {
                    this.model.push(this.getKeyValue(option));
                    this.onAdded.emit(this.getKeyValue(option));
                    var removedOption = this.model.shift();
                    this.onRemoved.emit(removedOption);
                }
                else {
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
    };
    MultiselectDropdown.prototype.updateNumSelected = function () {
        this.numSelected = this.model && this.model.length || 0;
    };
    MultiselectDropdown.prototype.updateTitle = function () {
        var _this = this;
        if (this.numSelected === 0 || this.settings.fixedTitle) {
            this.title = this.texts.defaultTitle || '';
        }
        else if (this.settings.displayAllSelectedText && this.model.length === this.options.length) {
            this.title = this.texts.allSelected || '';
        }
        else if (this.settings.dynamicTitleMaxItems && this.settings.dynamicTitleMaxItems >= this.numSelected) {
            this.title = this.options
                .filter(function (option) {
                return _this.model && _this.model.indexOf(_this.getKeyValue(option)) > -1;
            })
                .map(function (option) { return _this.getLabelValue(option); })
                .join(', ');
        }
        else {
            this.title = this.numSelected
                + ' '
                + (this.numSelected === 1 ? this.texts.checked : this.texts.checkedPlural);
        }
    };
    MultiselectDropdown.prototype.searchFilterApplied = function () {
        return this.settings.enableSearch && this.searchFilterText && this.searchFilterText.length > 0;
    };
    MultiselectDropdown.prototype.checkAll = function () {
        this.model = [];
        //TODO: select only filtered options if searchFilterApplied
        var checkedOptions = (!this.searchFilterApplied() ? this.options : this.options);
        for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
            var option = _a[_i];
            this.model.push(this.getKeyValue(option));
        }
        this.onModelChange(this.model);
        this.onModelTouched();
    };
    MultiselectDropdown.prototype.uncheckAll = function () {
        this.model = [];
        this.onModelChange(this.model);
        this.onModelTouched();
    };
    MultiselectDropdown.prototype.preventCheckboxCheck = function (event, option) {
        if (this.settings.selectionLimit && !this.settings.autoUnselect &&
            this.model.length >= this.settings.selectionLimit &&
            this.model.indexOf(this.getKeyValue(option)) === -1) {
            event.preventDefault();
        }
    };
    MultiselectDropdown.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ng2-multiselect',
                    template: "<div class=\"dropdown\" [ngClass]=\"settings.containerClasses\" [class.open]=\"isVisible\" >\n  <button type=\"button\" class=\"dropdown-toggle\" [ngClass]=\"settings.buttonClasses\" (click)=\"toggleDropdown()\" [disabled]=\"disabled\">{{ title }}<span class=\"caret\"></span></button>\n  <ul *ngIf=\"isVisible\" class=\"dropdown-menu\" [class.pull-right]=\"settings.pullRight\" [class.dropdown-menu-right]=\"settings.pullRight\"\n    [style.max-height]=\"settings.maxHeight\" style=\"display: block; height: auto; overflow-y: auto;width:100% !important;\">\n    <li class=\"dropdown-item search\" *ngIf=\"settings.enableSearch\">\n      <div class=\"input-group input-group-sm\">\n        <span class=\"input-group-addon\" id=\"sizing-addon3\"><i class=\"fa fa-search\"></i></span>\n        <input type=\"text\" class=\"form-control\" placeholder=\"{{ texts.searchPlaceholder }}\" aria-describedby=\"sizing-addon3\" [(ngModel)]=\"searchFilterText\"\n          [ngModelOptions]=\"{standalone: true}\" autofocus>\n        <span class=\"input-group-btn\" *ngIf=\"searchFilterText.length > 0\">\n          <button class=\"btn btn-default btn-secondary\" type=\"button\" (click)=\"clearSearch($event)\"><i class=\"fa fa-times\"></i></button>\n        </span>\n      </div>\n    </li>\n    <li class=\"dropdown-divider divider\" *ngIf=\"settings.enableSearch\"></li>\n    <li class=\"dropdown-item check-control check-control-check\" *ngIf=\"settings.showCheckAll\">\n      <a href=\"javascript:;\" role=\"menuitem\" tabindex=\"-1\" (click)=\"checkAll()\">\n        <span style=\"width: 16px;\" [ngClass]=\"{'glyphicon glyphicon-ok': settings.checkedStyle !== 'fontawesome','fa fa-check': settings.checkedStyle === 'fontawesome'}\"></span>        {{ texts.checkAll }}\n      </a>\n    </li>\n    <li class=\"dropdown-item check-control check-control-uncheck\" *ngIf=\"settings.showUncheckAll\">\n      <a href=\"javascript:;\" role=\"menuitem\" tabindex=\"-1\" (click)=\"uncheckAll()\">\n        <span style=\"width: 16px;\" [ngClass]=\"{'glyphicon glyphicon-remove': settings.checkedStyle !== 'fontawesome','fa fa-times': settings.checkedStyle === 'fontawesome'}\"></span>        {{ texts.uncheckAll }}\n      </a>\n    </li>\n    <li *ngIf=\"settings.showCheckAll || settings.showUncheckAll\" class=\"dropdown-divider divider\"></li>\n    <li class=\"dropdown-item\" [ngStyle]=\"getItemStyle(option)\" *ngFor=\"let option of options\"\n      (click)=\"setSelected($event, option)\">\n      <a href=\"javascript:;\" role=\"menuitem\" tabindex=\"-1\">\n        <input *ngIf=\"settings.checkedStyle === 'checkboxes'\" type=\"checkbox\" [checked]=\"isSelected(option)\" (click)=\"preventCheckboxCheck($event, option)\"\n        />\n        <span *ngIf=\"settings.checkedStyle === 'glyphicon'\" style=\"width: 16px;\" class=\"glyphicon\" [class.glyphicon-ok]=\"isSelected(option)\"></span>\n        <span *ngIf=\"settings.checkedStyle === 'fontawesome'\" style=\"width: 16px;display: inline-block;\">\n          <i *ngIf=\"isSelected(option)\" class=\"fa fa-check\" aria-hidden=\"true\"></i>\n        </span>\n        <span [ngClass]=\"settings.itemClasses\">\n          {{ getLabelValue(option) }}\n        </span>\n      </a>\n    </li>\n  </ul>\n</div>",
                    styles: ["a {\n  outline: none !important;\n}\n\n.dropdown-toggle .caret {\n  margin-left: 4px;\n  white-space: nowrap;\n  display: inline-block;\n}\n"],
                    providers: [MULTISELECT_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    MultiselectDropdown.ctorParameters = function () { return [
        { type: _angular_core.ElementRef, },
        { type: _angular_core.IterableDiffers, },
    ]; };
    MultiselectDropdown.propDecorators = {
        'options': [{ type: _angular_core.Input },],
        'settings': [{ type: _angular_core.Input },],
        'texts': [{ type: _angular_core.Input },],
        'disabled': [{ type: _angular_core.Input },],
        'selectionLimitReached': [{ type: _angular_core.Output },],
        'dropdownClosed': [{ type: _angular_core.Output },],
        'dropdownOpened': [{ type: _angular_core.Output },],
        'onAdded': [{ type: _angular_core.Output },],
        'onRemoved': [{ type: _angular_core.Output },],
        'onClick': [{ type: _angular_core.HostListener, args: ['document: click', ['$event.target'],] },],
    };
    return MultiselectDropdown;
}());

var MultiselectDropdownModule = (function () {
    function MultiselectDropdownModule() {
    }
    MultiselectDropdownModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [_angular_common.CommonModule, _angular_forms.FormsModule],
                    exports: [MultiselectDropdown, MultiSelectSearchFilter],
                    declarations: [MultiselectDropdown, MultiSelectSearchFilter],
                },] },
    ];
    /** @nocollapse */
    MultiselectDropdownModule.ctorParameters = function () { return []; };
    return MultiselectDropdownModule;
}());

exports.MultiSelectSearchFilter = MultiSelectSearchFilter;
exports.MultiselectDropdownModule = MultiselectDropdownModule;
exports.MultiselectDropdown = MultiselectDropdown;

Object.defineProperty(exports, '__esModule', { value: true });

})));
