The whole project is heavily inspired by [Simon Lindh](https://github.com/softsimon/angular-2-dropdown-multiselect)
Also removed parent grouping options. As that was not needed.

# AngularX Dropdown Multiselect for Bootstrap CSS

Works with Angular Final and AOT compilation

Customizable dropdown multiselect in AngularX, TypeScript with bootstrap css.

See demo: http://softsimon.github.io/angular-2-dropdown-multiselect

## Dependencies
* Bootstrap CSS 3 or 4
* Font Awesome (optional)

## Quick start options
* Install with [npm](https://www.npmjs.com): `npm install ng2-multiselect --save-dev`.

## Usage

Import `MultiselectDropdown` into your @NgModule.

```js
import { MultiselectDropdownModule } from 'ng2-multiselect';

@NgModule({
  // ...
  imports: [
    MultiselectDropdownModule,
  ]
  // ...
})
```

Define options in your consuming component:

```js
import { IMultiSelectOption,IMultiSelectSettings } from 'ng2-multiselect';

export class MyClass implements OnInit {
    optionsModel: number[];
    mySettings: IMultiSelectSettings = {
    keyToSelect: "key1", //Give empty for selecting whole object
    lableToDisplay: "key2"
};
    ngOnInit() {
        myOptions: any[] = [
            { key1: 1, key2: 'Option 1' },
            { key1: 2, key2: 'Option 2' },
        ];
    }
    onChange() {
        console.log(this.optionsModel);
    }
}
```

In your template, use the component directive:

```html
<ng2-multiselect [options]="myOptions" [settings]="mySettings" [(ngModel)]="optionsModel" (ngModelChange)="onChange($event)"></ng2-multiselect>
```

## Customize

Import the `IMultiSelectTexts` interfaces to enable/override settings and text strings:
```js

// Default selection
optionsModel: number[] = [1, 2];

// Settings configuration
mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default btn-block',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true
};

// Text configuration
myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    defaultTitle: 'Select',
    allSelected: 'All selected',
};

// Labels / Parents
myOptions: IMultiSelectOption[] = [
    { id: 1, name: 'Car brands', isLabel: true },
    { id: 2, name: 'Volvo', parentId: 1 },
    { id: 3, name: 'Honda', parentId: 1 },
    { id: 4, name: 'BMW', parentId: 1 },
    { id: 5, name: 'Colors', isLabel: true },
    { id: 6, name: 'Blue', parentId: 5 },
    { id: 7, name: 'Red', parentId: 5 },
    { id: 8, name: 'White', parentId: 5 }
];

```

```html
<ng2-multiselect [options]="myOptions" [texts]="myTexts" [settings]="mySettings" [(ngModel)]="optionsModel"></ng2-multiselect>
```
### Settings
| Setting              | Description                                                        | Default Value     |
| -------------------- | ------------------------------------------------------------------ | ----------------  |
| pullRight            | Float the dropdown to the right                                    | false             |
| enableSearch         | Enable searching the dropdown items                                | false             |
| checkedStyle         | Style of checked items one of 'checkboxes', 'glyphicon' or 'fontawesome'  | 'checkboxes'      |
| buttonClasses        | CSS classes to apply to the trigger button                         | 'btn btn-default' |
| itemClasses          | CSS classes to apply to items                                      | ''                |
| containerClasses     | CSS classes to apply to container div                              | 'dropdown-inline' |
| selectionLimit       | Maximum number of items that may be selected (0 = no limit)        | 0                 |
| autoUnselect         | Unselect the previous selection(s) once selectionLimit is reached  | false             |
| closeOnSelect        | If enabled, dropdown will be closed after selection                | false             |
| showCheckAll         | Display the `checkAll` item to select all options                   | false             |
| showUncheckAll       | Display the `uncheckAll` item to unselect all options               | false             |
| fixedTitle           | Use the default title (do not apply the dynamic title)             | false             |
| dynamicTitleMaxItems | The maximum number of options to display in the dynamic title      | 3                 |
| maxHeight            | The maximum height for the dropdown (including unit)               | '300px'           |
| displayAllSelectedText | Display the `allSelected` text when all options are selected    | false             |

### Texts
| Text Item             | Description                                | Default Value     |
| --------------------- | ------------------------------------------ | ----------------  |
| checkAll              | The text for the "check all" option        | 'Check all'       |
| uncheckAll            | The text for the "uncheck all" option      | 'Uncheck all'     |
| checked               | Text for "checked" with single item selected (used in dynamic title)    | 'checked' |
| checkedPlural         | Text for "checked" with multiple items selected (used in dynamic title) | 'checked' |
| searchPlaceholder     | Text initially displayed in search input   | 'Search...'       |
| defaultTitle          | Title displayed in button before selection | 'Select'          |
| allSelected           | Text displayed when all items are selected (must be enabled in options) | 'All selected' |

## Other examples

### Single select
Although this dropdown is designed for multiple selections, a common request is to only allow a single selection without requiring the user to unselect their previous selection each time. This can be accomplished by setting selectionLimit to 1 and autoUnselect to true.
```
{
  ...
  selectionLimit: 1,
  autoUnselect: true,
  ...
}
```

### Use model driven forms with ReactiveFormsModule:

```js

export class MyClass implements OnInit {
    model: number[];
    myOptions: any[] = [
        { id: 1, name: 'Option 1' },
        { id: 2, name: 'Option 2' },
    ];

    ngOnInit() {
        this.myForm = this.formBuilder.group({
            optionsModel: [1, 2], // Default model
        });

        this.myForm.controls['optionsModel'].valueChanges
            .subscribe((selectedOptions) => {
                // changes
            });
    }
}
```

```html
<form [formGroup]="myForm">
    <ng2-multiselect [options]="myOptions" formControlName="optionsModel"></ng2-multiselect>
</form>
```

## Developing

Pull requests are welcome!

## License

[MIT]
