
# React Autocomplete 

A simple, powerful, lightweight and customizable autocomplete tool programmed for React projects!

## Whats better in this package?

- Lightweight
- No 3rd party packages installed
- Supports large data set
- Customizable scroll functionality
- Supports custom events
- Easy virtual scrolling for large data set without 3rd party
- Custom classes and ng-styles are allowed
- Ability to use 3rd party style packages like bootstrap, tailwind. (You can update the classes from your component)
- Solid test cases to validate the module.

## Installation

Install react-autocomplete-plugin with npm

```bash
  npm install react-autocomplete-plugin --save
```

## API Usage

| Props | Type  | Required | Description |
| -------- | ------- | ------- | ------- |
| `dropdownData` | `string[] or object[]`  | **Yes**. | Accepts array of strings or numbers or array of objects |  |
| `objectProperty` | `string` |**_Yes_** | Required only if `dropdownData` is object[]. Helps to display dropdown value in dropdown list. |
|`initialVisibleData`| `number` | `No` | `initialVisibleData` denotes the number of records that will be displayed in dropdown list. Default value is 1000. It can be customized as per project requirement or can be left untouched. |
|`broadcastSelectedValue`|`Function` |**Yes** | Custom function to broadcast the selected value when dropdown value is selected from list. Accepts one parameter which will give the selected value. |
| `placeHolder` | `string` | `No` | Custom placeholder for auto-complete input field. |
| `scrollData` | `number`| `No` | 1000 by default. Displays 1000 records by default. Can be changed as per project convenience. |
| `scrollThreshold` | `number` | `No` | 3 by default. Helps to boost performance. It controls the scroll data and removes top or botton records during user scroll based on the scrollThreshold & scrollData configured. Check below for more details. |
|`defaultValue`| `string` or `object` | `No` | `defaultValue` pre-populates the value in text-field by matching the value from dropdown data. It can be a simple value or simple json object. For simple json object, `objectProperty` value should be available. |
|`totalRecords` | `number` | `No` | If total number of records is known, totalRecords can be provided which will avoid extra condtions that will be executed in the package.
|`disableProperty` | `string` | `No` | To disable specific dropdown list in dropdown. User cannot select the dropdown if disabled. This property can be used for object[] dropdown and `disableProperty` should be one of the boolean property in object|
|`disableListFn` |`Function` |`No` | If disable should be calculated dynamically using a function and custom code, assign customized function to `disableListFn`. disableListFn accepts two parameters (index, data)|
|`searchFn` |`Function` |`No` | Customized search function. Customized search function accepts one parameter, `event`. On keyUp, the customized search function will be called to perform custom execution.|
|`noSearchResultMessage` |`string` |`No` | By default **No results found** message will be displayed when search result is 0  |
|`isAutoCompleteDisabled` |`boolean` |`No` | By default value is false. If updated as true, the input fields gets disabled. |
|`customClass` | `object` |`No` | Allows custom class styling at various dom levels. Check below for more information|
|`customStyle` | `object` |`No` | Allows custom ng-style. Check below for more information |
|`showdropDownArrow` | `boolean` |`No` | Show or hide dropdown icon in autocomplete field. Default is `true`.  |
|`showClearOption` |`boolean` |`No` | Shows clear option to allow user to clear the selected value. Default is `true`. |
|`triggerOnFocusEvent`| `Function` |`No`|Triggers on-focus event when input field is focussed.`triggerOnFocusEvent` accepts a function as props. The function can have one event parameter (Eg: triggerOnFocusEvent(event)) and the parameter will be a focus event. By default, `triggerOnFocusEvent` will be undefined and will not be triggered until a function is assigned to it.|
| `triggerBlurEvent`|`Function` |`No` | Triggers blur event when input field is out of focus. `triggerBlurEvent` accepts a function as props. The function can have one event parameter (Eg: triggerBlurEvent(event)) and the parameter will be a blur event. By default, `triggerBlurEvent` will be undefined and will not be triggered until function is assigned to it.|
|`triggerApiLoadEvent` |`Function` |`No` | A custom function for lazy loading the dropdown data. `triggerApiLoadEvent` accepts a function as props. It triggers a custom function to call the API when the end of scroll is reached. Depends on `props.isApiLoad`. Pass `isApiLoad` as true if `triggerApiLoadEvent` function needs to be triggered. The custom function can have one parameter which would return an object with length of the dropdown data. This object can be used to calculate next paginated data, and using this param is optional. When lazy loading of the API is complete or all the dropdown data has been loaded, set `isApiLoad` as false, so that `triggerApiLoadEvent` will not be called. |
| `isApiLoad` | `boolean` | `No` | Default value is false. This props is required if the dropdown data is being lazy-loaded. To trigger `triggerApiLoadEvent`, `isApiLoad` must be set to true. Once lazy loading or API calls are complete, set `isApiLoad` to false. |
|`triggerClearSelectionEvent` |`Function` |`No` | Triggers custom function `triggerClearSelectionEvent(event)` input field is cleared.  |
|`isScrollThresholdRequired`|`boolean`|`No` | Default is true. If scrollData and scrollThreshold is performance calculation is not required, set it to false. See below for more information.|
|`inspectAutoCompleteList`|`boolean`|`No`|Default value is false. When set to true, it will not allow hiding the dropdown list on blur. This is helpful to inspect the dropdown list in dom and is recommended only for development.|
|`showInputlabel`|`boolean`|`No`|Default value is false. making it true will show the input text label.|
|`inputLabel`|`string`|`No`|Default value is `Select a value` and can be customized. `inputLabel` will be shown when `showInputlabel` is set to true.|
|`showLoadingSpinner` | `boolean`|`No` | Shows the spinner at the botton of the list if lazy loaded. Default is `false` |
|`isCustomSpinner`|`boolean`|`No`|Set as `true` to set customize spinner during lazy load or paginated API calls. Set your own class properties in `customClass.customSpinnerClass`. `showLoadingSpinner` must be set to `true` to show the spinner.|
|`aria`|`object`|`No`|Helps to set aria roles at various levels of DOM to provide Accessible Rich Internet Application. Check below for more details.|

# Using the module

import Autocomplete Module into your component.

In your HTML template

For dropdown string array,Eg: ["Apple", "Banana", "Kiwi"], do as below.

```html
<Autocomplete
    dropdownData="YOUR_DROPDOWN_DATA"
    broadcastSelectedValue="YOUR_CUSTOM_FUNTION($event)">
</Autocomplete>
```

For dropdown object array, Eg: [{"name": "Alex"}, {"name": "John"}], do as below.

```html
<Autocomplete
    dropdownData="YOUR_DROPDOWN_DATA"
    broadcastSelectedValue="YOUR_CUSTOM_FUNTION($event)"
    objectProperty="'name'">
</Autocomplete>
```

## Setting `scrollThreshold` & `initialVisibleData` for maximizng performance

By default, `initialVisibleData` is set to 1000 and `scrollThreshold` is set to 3. It can be customized as per requirement.

#### What is `scrollThreshold` & `initialVisibleData`?

Both `scrollThreshold` & `initialVisibleData` helps to improve virtual scrolling for better performance.

`initialVisibleData` is the number of records / data that will be loaded virtually during initial load.

Consider, there are 5000 records to be shown. `initialVisibleData` is 1000 and `scrollThreshold` is 3.

During initial load, dropdown list will show 1000 records. When user reaches the end of scroll, the formula will be calculated based on `initialVisibleData` & `scrollThreshold` and number of filteredData records.

```js
Math.ceil(filteredData.length /scrollThreshold);

Math.ceil(1000/3);
```
If calculated result does not exceed `initialVisibleData`, next set of data will be loaded. And now the dropdown list(filteredData) will hold 2000 records.

Similary same calculation will be performed during the end of scroll and when the result exceeds `initialVisibleData`, first set of records will be removed from the dropdown list and next set of records will be loaded everytime, to improve performance.

When `scrollThreshold` is set to 1, the virtual dropdown list will hold the records based on `initialVisibleData` configuration. When end of scroll is reached, the current set will be replaced by next set.

`initialVisibleData` & `scrollThreshold` does not affect or mutate original data and will update only the virtually filtered data.

`initialVisibleData` & `scrollThreshold` is customizable based on project needs. If this performance calculation is not required, set `isScrollThresholdRequired` to `false`.

## Adding Custom CSS Class to autocomplete

#### Import CustomClassType from the module (Optional).

| CustomClassTypes              | Required    | Description |
| :--------                     | :-----------| :-----------|
| `parentContainerClass`        | `No` | Adds class to parent `div` surrounding the input field and dropdown list. |
| `inputFieldClass`             | `No` | Adds class to `input textfield`|
| `listContainerClass`          | `No` | Adds class to `div` that surrounds `ul` of dropdown list. |
| `dropdownUnorderedListClass`  | `No` | Adds class to `ul` of dropdown list. |
| `dropdownListClass`           | `No` | Adds class to each `li` items|
| `noResultClass`               | `No` | Adds class to separate `li` item to show no result message. |
| `disableListClass`            | `No` | Adds class to each `li` items. Depends on `disableListFn` function or `disableProperty`  |
| `inputLabelClass`             | `No` | Adds class to `<label>` field |
| `inputLabelContainerClass`    | `No` | Adds class to surrounding `div` of input label.|
| `customSpinnerClass`          | `No` | Adds class to `span` to show customized spinner.|

```ts
customClassType: CustomClassType = {
    inputFieldClass: 'class1',
    dropdownListClass: 'class1 class2'
}
```

```html
<Autocomplete
    dropdownData="YOUR_DROPDOWN_DATA"
    broadcastSelectedValue="YOUR_CUSTOM_FUNTION($event)"
    objectProperty="'name'"
    customClassType="customClassType">
</Autocomplete>
```

## Adding Custom NgStyle to autocomplete

#### Import CustomNgStyleType from the module (Optional).


| CustomNgStyleTypes | Required | Description |
| :-------- | :-----------| :-----------|
| `parentContainerStyle`      | `No` | Adds style to `div` surrounding the input field and dropdown list. |
| `inputFieldStyle`      | `No` | Adds style to `input textfield`|
| `listContainerStyle`      | `No` | Adds style to `div` that surrounds `ul` of dropdown list. |
| `dropdownUnorderedListStyle`      | `No` | Adds style to `ul` of dropdown list. |
| `dropdownListStyle`      | `No` | Adds style to each `li` items|
| `disableListStyle`      | `No` | Adds style to each `li` items. Alternatively `dropdownListStyle` can also be used for custom style.|
| `noResultStyle`      | `No` | Adds style to separate `li` item to show no result message. |
| `inputLabelStyle`      | `No` | Adds style to `<label>` field |
| `inputLabelContainerStyle`    | `No` | Adds style to surrounding `div` of input label.|
| `customSpinnerStyle`          | `No` | Adds style to `span` to style the customized spinner.|

```ts
customStyle: CustomStyleType = {
    inputFieldStyle: {color: '#FFFFFF' },
    dropdownListStyle: {padding: 2px }
}
```

```html
<Autocomplete
    dropdownData="YOUR_DROPDOWN_DATA"
    broadcastSelectedValue="YOUR_CUSTOM_FUNTION($event)"
    objectProperty="'name'"
    customStyle="customStyle">
</Autocomplete>
```
## Adding Accessible Rich Internet Applications (ARIA)

#### ARIA provides easy access to the content for people with disabilities with help of screen reader.

| Attributes | Required | Description |
| :-------- | :-----------| :-----------|
| `ariaRole`            | `No` | Adds ARIA role  to `input textfield`. Default value is `textbox`. |
| `ariaRoleDescription` | `No` | Adds ARIA role description to `input textfield`. Default value is `Autocomplete input field`. |
| `ariaInputField`      | `No` | Adds ARIA label  to `input textfield`|
| `ariaNoSearchResult`  | `No` | Adds ARIA label to no result found `li` item|
| `ariaULList`          | `No` | Adds ARIA label to `ul` list item |
| `ariaListContainer`   | `No` | Adds ARIA label to list container `div`. |
| `ariaInputLabel`      | `No` | Adds ARIA label to `label field`. |