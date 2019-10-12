# Changelog

## [2.0.3] 2019-10-12

- Add useAnalytics hook and remove `analytics.js` and `AnalyticsSender`

## [2.0.2] 2019-10-12

- Add HeadMeta component for social meta tags

## [2.0.1] 2019-10-12

- Update home page

## [2.0.0] 2019-10-11

- Update Next JS to 9.1.1
- Update React to 16.10.1
- Succumb to hype and add Typescript
- Remove Apollo GraphQL and Redux (will put in feature branches)
- Add new `/public` folder and remove `/static` folder
- Remove CSSNext and add Next CSS and Next SASS with CSS Modules

## [1.5.0] 2019-07-28

- Update Next JS to 9.02
- Replace `react-testing-library` with `@testing-library/react`

## [1.4.9] 2019-05-28

- Update Next JS to 8.1

## [1.4.8] 2019-05-28

- Replace Enzyme with `react-testing-library` and update tests.
- Update Hygen template to create functional component (instead of class) and add new component test file.

## [1.4.7] 2019-03-09

### Changed

- Update `next.config.js` settings to ensure eslint/stylelint errors still hot reload. Note that Next 8 solves eslint-loader issue of not hot reloading on warning.
- Update eslint config with `airbnb` config

### Removed

- `eslint-config-dxlab` no longer needed. Using custom config.

## [1.4.6] 2019-02-26

### Changed

- Update from Next 7 to 8
- Ran `npm audit fix`

## [1.4.5] 2019-02-23

### Added

- Add browserslist setting in `package.json` to ensure `autoprefixer` does its thang.

## [1.4.4] 2019-02-08

### Added

- Added `postcss-nested` and tweaked `variables.css`
- Added `styles/root.css` and only imported it in `App.js`. Was getting imported multiple times.

## [1.4.3] 2019-02-08

### Changed

- Updated React to 16.8 to get Hooks goodness
- Update `_templates/component.ejs.t` to use tabs
- Fix `next.config.js` stylelint config

### Added

- `stylelint-config-prettier` to disable stylelint formatting rules and let Prettier do its thang
- Add className to `App`
- Add `eslint-plugin-flowtype` to satisfy `eslint-config-react-app`

### Removed

- `/lib/initRedux.js` no longer needed

## [1.4.0] 2018-12-27

### Changed

- Updated tests, enabling testing of Apollo and Redux in `jest`.
- Updated `apollo-client` and `react-apollo`
- Moved Apollo, Redux HOCs and `withRouter` to `_app.js`.

### Added

- Replaced `postcss-cssnext` with `postcss-preset-env`
- Added `stylelint` to `lint-staged`
- Set up mocking for `next/router`
- Added `dotenv` testing for `jest`.

### Removed

- Removed `postcss-cssnext`

## [1.3.0] 2018-12-22

- Fix Jest by adding `jest.config.js`, `jest.setup.js` and adding css transforms.
- Set up pre-commit tests
- Clean up package.json

## [1.2.0] 2018/10/31

- Updated to Next JS 7 from 5. Removing `.babelrc` seems to fix `.env["development"].presets must be an array, or undefined` error.
- Updated React from 16.2 to 16.6
- Updated next-css
- Removed Flow
- Removed cssnano to fix critical vulnerability
- Updated jest from 20 to 23.6, fixes lots of vulnerabilities
