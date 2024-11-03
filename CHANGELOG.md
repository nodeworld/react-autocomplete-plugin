# Module version changes and fixes.

## 2.0.1

`Users are safe to upgrade to 2.0.1 from any lower version without any module level changes.`

- Added `View More` to List dropdown at the end of the list as an alternative to call API when reaching the end of scroll.
- Now the developers who consume this package can decide how they should trigger an API Call. Using `View More`, or triggering API Call when reaching end of scroll. Both can be configured as well. Refer below for more information.
- Added input props - showViewMore, viewMoreText and optViewMoreOnlyForApiCall.
- Renamed the internal class `loader`  to `autocomplete-plugin-loader` as `loader` class is too common name and may collide with other libraries.
- Updated Readme file and stackblitz examples.
- Upgrade to this package is recommended.

## 2.0.0
- Search algorithm has been updated for better search results. No change in types or schema. Upgrading from `1.0.1` to `2.0.0`is safe without any impact.

## 1.0.1
- React Autocomplete plugin package deployment.

