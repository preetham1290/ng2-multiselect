import { MultiselectDropdown } from './dropdown.component';
import { MultiSelectSearchFilter } from './search-filter.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
export var MultiselectDropdownModule = (function () {
    function MultiselectDropdownModule() {
    }
    MultiselectDropdownModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule],
                    exports: [MultiselectDropdown, MultiSelectSearchFilter],
                    declarations: [MultiselectDropdown, MultiSelectSearchFilter],
                },] },
    ];
    /** @nocollapse */
    MultiselectDropdownModule.ctorParameters = function () { return []; };
    return MultiselectDropdownModule;
}());
//# sourceMappingURL=dropdown.module.js.map