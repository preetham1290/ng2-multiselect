import { Pipe } from '@angular/core';
export var MultiSelectSearchFilter = (function () {
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
        { type: Pipe, args: [{
                    name: 'searchFilter'
                },] },
    ];
    /** @nocollapse */
    MultiSelectSearchFilter.ctorParameters = function () { return []; };
    return MultiSelectSearchFilter;
}());
//# sourceMappingURL=search-filter.pipe.js.map