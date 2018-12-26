# Changelog

## [1.4.0] 2018-12-27

### Changed

* Updated tests, enabling testing of Apollo and Redux in `jest`.
* Updated `apollo-client` and `react-apollo`
* Moved Apollo, Redux HOCs and `withRouter` to `_app.js`.

### Added

* Replaced `postcss-cssnext` with `postcss-preset-env`
* Added `stylelint` to `lint-staged`
* Set up mocking for `next/router`
* Added `dotenv` testing for `jest`.

### Removed

* Removed `postcss-cssnext`

## [1.3.0] 2018-12-22

* Fix Jest by adding `jest.config.js`, `jest.setup.js` and adding css transforms.
* Set up pre-commit tests
* Clean up package.json

## [1.2.0] 2018/10/31

* Updated to Next JS 7 from 5. Removing `.babelrc` seems to fix `.env["development"].presets must be an array, or undefined` error.
* Updated React from 16.2 to 16.6
* Updated next-css
* Removed Flow
* Removed cssnano to fix critical vulnerability
* Updated jest from 20 to 23.6, fixes lots of vulnerabilities
