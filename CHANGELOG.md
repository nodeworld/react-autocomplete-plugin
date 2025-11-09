# Module version changes and fixes.

## 2.1.5

`Users are safe to upgrade to 2.1.4 from any lower version without any module level changes.`
- Recommended. Relative Search feature has been introduced to search the entire object. Refer API usage for details. Upgrading from lower version to 2.1.5 is safe without any configuration change.
- Updated ReadMe file.

## 2.1.4

`Users are safe to upgrade to 2.1.4 from any lower version without any module level changes.`
- Added banner for readme file. Refer [modulejs.org](https://modulejs.org) for clean documentation.

## 2.1.3

`Users are safe to upgrade to 2.1.3 from any lower version without any module level changes.`
- Fixed a bug related to keyboard navigation. Now, keyboard navigation listeners will be removed after selection or blur.
- Added excape key keyboard event to close autocomplete on pressing escape.
- Added callbacks for few functions

## 2.1.1

`Users are safe to upgrade to 2.1.1 from any lower version without any module level changes.`
- Added keyboard navigation events to scroll through dropdown list and select when pressing Enter Key.
- Added Aria label to the dropdown list to help the screen readers.
- Fixed a bug during view more click.

## 2.0.3

`Users are safe to upgrade to 2.0.3 from any lower version without any module level changes.`
- Fixed a minor bug related to width of the autocomplete dropdown list when using the module multiple times in the same component.
- Removed native javascript reference to get width of the div and implemented useRef.
- The module is healthy with this version and gives better interactivity.

## 2.0.2

`Users are safe to upgrade to 2.0.2 from any lower version without any module level changes.`

- Fixed a non-impact bug related to View More Input props
- Added resize listener to adjust the width of dropdownlist during resize events. Resize event listener will be destroyed once dropdown list is closed on select or onBlur.
- Upgrade to this package is recommended for better interactivity.

## 2.0.1

`Users are safe to upgrade to 2.0.1 from any lower version without any module level changes.`

- Added `View More` to List dropdown at the end of the list as an alternative to call API when reaching the end of scroll.
- Now the developers who consume this package can decide how they should trigger an API Call. Using `View More`, or triggering API Call when reaching end of scroll. Both can be configured as well. Refer below for more information.
- Added input props - showViewMore, viewMoreText and optViewMoreOnlyForApiCall.
- Renamed the internal class `loader`  to `autocomplete-plugin-loader` as `loader` class is too common name and may collide with other libraries.
- By default `showLoadingSpinner` marked as `true` in `2.0.1` . Spinner will be shown by default, if lazy loading / API calls are configured. It can be passed as `false` through input props if not required.
- Updated Readme file and stackblitz examples.

## 2.0.0
- Search algorithm has been updated for better search results. No change in types or schema. Upgrading from `1.0.1` to `2.0.0`is safe without any impact.

## 1.0.1
- React Autocomplete plugin package deployment.

