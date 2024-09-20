
# React Autocomplete 

A simple, powerful, lightweight and customizable autocomplete tool programmed for React projects!

# Requirements

React 16.8+, 17, 18 or higher

## Package information

- Lightweight module with complete customization
- Supports both JSX and TSX webapp projects
- No 3rd party package installed in this module
- Supports lazy loading and large dataset
- Advanced and customizable scroll functionality
- Supports custom events
- Virtual scrolling for large data sets
- Supports custom classes and custom css styles at various DOM levels
- Ability to integrate 3rd party styling packages like bootstrap, tailwind or other CSS libraries.
- Complete test case coverage.

## Installation

Install react-autocomplete-plugin with npm

```bash
  npm install react-autocomplete-plugin --save
```

or

```bash
  npm i react-autocomplete-plugin
```

## Running Tests

react-autocomplete-plugin has solid test cases to make sure components executes without any issues.

To run tests, clone the repository, install the packages and run the following command. If you are facing any issues, you may need to check your node version (may require v18+) when running this package as a standlone module in local system.

```bash
  npm run test
```

## API Usage

| Props | Type  | Required | Description |
| -------- | ------- | ------- | ------- |
| `dropdownData` | `string[], number[], object[] or any[]`  | **Yes**. | Accepts array of strings, numbers or array of objects. |  |
| `objectProperty` | `string` |**_Yes_** | Required only if `dropdownData` is object[]. `objectProperty` will determine the value to be displayed in dropdown. |
|`initialVisibleData`| `number` | `No` | `initialVisibleData` denotes the number of records that will be displayed in dropdown list. Default value is 1000. It can be customized as per project requirement or can be left untouched. |
|`broadcastSelectedValue`|`Function` |**Yes** | Custom function to broadcast the selected value when dropdown value is selected from list. Accepts one parameter which will give the selected value. |
| `placeHolder` | `string` | `No` | Custom placeholder for auto-complete input field. |
| `scrollData` | `number`| `No` | 1000 by default. Displays 1000 records by default. Can be changed as per project convenience. |
| `scrollThreshold` | `number` | `No` | 3 by default. Helps to boost performance. It controls the scroll data and removes top or botton records during user scroll based on the scrollThreshold & scrollData configured. Check below for more details. |
|`defaultValue`| `string` or `object` | `No` | `defaultValue` pre-populates the value in input textfield by matching the value from dropdown data. It can be a simple value or simple json object. For simple json object, `objectProperty` value should be available. |
|`totalRecords` | `number` | `No` | If total number of records is known, totalRecords can be provided which will avoid extra condtions that will be executed in the package.
|`disableProperty` | `string` | `No` | To disable specific dropdown list in dropdown from being selected. This property can be used when dropdownData is an object[] and the `disableProperty` should be a property name from the object which can determine whether the specific list should be disabled from selection. Eg: If an object conatins a property `disabled`, then this property name can be passed to `disableProperty` props to disbale the list from selection when condition matches. |
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

```js
import { Autocomplete } from 'react-autocomplete-plugin';
```
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

## Setting `scrollThreshold` & `initialVisibleData` for maximizing performance

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

Please note that, if you are using JSX template, you may not be able to import the type CustomClassType. However you can refer this documentation and pass the custom classes without importing type.

#### Import CustomClassType from the module (Optional).

```js
import { CustomClassType } from 'react-autocomplete-plugin';
```

| CustomClassTypes              | Required    | Description |
| :--------                     | :-----------| :-----------|
| `parentContainerClass`        | `No` | Adds class to parent `div` surrounding the input field and dropdown list. |
| `inputFieldClass`             | `No` | Adds class to `input textfield`|
| `listContainerClass`          | `No` | Adds class to `div` that surrounds `ul` of dropdown list. |
| `dropdownUnorderedListClass`  | `No` | Adds class to `ul` of dropdown list. |
| `dropdownListClass`           | `No` | Adds class to each `li` items|
| `noResultClass`               | `No` | Adds class to separate `li` item to show no result message. |
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

## Adding Custom CSS styles to autocomplete

Please note that, if you are using JSX template, you may not be able to import the type CustomStyleType. However you can refer this documentation and pass the custom styles without importing type.

#### Import CustomStyleType from the module (Optional).

```js
import { CustomStyleType } from 'react-autocomplete-plugin';
```

| CustomStyleTypes | Required | Description |
| :-------- | :-----------| :-----------|
| `parentContainerStyle`      | `No` | Adds style to `div` surrounding the input field and dropdown list. |
| `inputFieldStyle`      | `No` | Adds style to `input textfield`|
| `listContainerStyle`      | `No` | Adds style to `div` that surrounds `ul` of dropdown list. |
| `dropdownUnorderedListStyle`      | `No` | Adds style to `ul` of dropdown list. |
| `dropdownListStyle`      | `No` | Adds style to each `li` items|
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

For inspecting the classes or styles during develeopment, pass `inspectAutoCompleteList` as `true` so that the dropdown list will not close which will help to inspect the list. But don't forget to remove or make it `false` during production deployment

## Adding Accessible Rich Internet Applications (ARIA)

#### ARIA provides easy access to the content for people with disabilities with help of screen reader.

Please note that, if you are using JSX template, you may not be able to import the type CustomAriaType. However you can refer this documentation and pass the custom styles without importing type.

#### Import CustomAriaType from the module (Optional).

```js
import { CustomAriaType } from 'react-autocomplete-plugin';
```

| Attributes | Required | Description |
| :-------- | :-----------| :-----------|
| `ariaRole`            | `No` | Adds ARIA role  to `input textfield`. Default value is `textbox`. |
| `ariaRoleDescription` | `No` | Adds ARIA role description to `input textfield`. Default value is `Autocomplete input field`. |
| `ariaInputField`      | `No` | Adds ARIA label  to `input textfield`|
| `ariaNoSearchResult`  | `No` | Adds ARIA label to no result found `li` item|
| `ariaULList`          | `No` | Adds ARIA label to `ul` list item |
| `ariaListContainer`   | `No` | Adds ARIA label to list container `div`. |
| `ariaInputLabel`      | `No` | Adds ARIA label to `label field`. |


## Running the github code locally to test automcomplete module in local react-app.

- Download the [react-autocomplete-plugin](https://github.com/nodeworld/react-autocomplete-plugin) code locally through github.

- Execute `npm install`.

- Execute `npm run build` to created build files for develeopment.

- (Optional) - Execute `npm run test` to see if all test cases are passed.

- To test this package locally in a react app do the below actions

    - Remove react packages - react, react-dom, @types/react, @types/react-dom from `react-autocomplete-plugin` package.json's dev dependencies
    - This is because, when we npm link this module to the local react application, it may cause the react application to crash due to 2 different react versions being mapped. Refer the [link](https://legacy.reactjs.org/warnings/invalid-hook-call-warning.html) for more information on this issue.
    - From `react-autocomplete-plugin` execute the command `npm link`
    - Go to the react application that needs to integrate this module and execute `npm link react-autocomplete-plugin`
    - Now this package will get mapped to the node modules of the react application.
    - If node_modules is removed from the react application, then the same steps must be followed again.
    - Now go back to the `react-autocomplete-plugin` module and follow below actions
    - npm link <PATH_TO_YOUR_REACT_APP>/node_modules/react
    - npm link <PATH_TO_YOUR_REACT_APP>/node_modules/react-dom
    - These command will make sure the `react-autocomplete-plugin` module uses the same version of react libraries that your react application use.
    - From your react app, import the autocomplete module, start the app and validate if it works.
    - If there is any error like `Invalid hook call`, then do the following again
    - Execute `npm link` from `react-autocomplete-plugin` module
    - Go to the react application and execute `npm link react-autocomplete-plugin`, then start the app.
    - If the issue still persists, there are many forums that helps to resolve this issue.
    - If nothing works, just copy the components folder and utils folder into your webapp and import the Autocomplete component.
    - Cheers 👋

## Github link

Github Link - [react-autocomplete-plugin](https://github.com/nodeworld/react-autocomplete-plugin)

## Roadmap

Enhancements of the autocomplete plugin

## Support

Please raise an issue in github repository

Github Link - [Raise an issue](https://github.com/nodeworld/react-autocomplete-plugin/issues)
