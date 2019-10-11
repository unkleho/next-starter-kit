module.exports = {
  '*.{js,ts,tsx}': [
    'eslint --fix',
    'npm test -- --forceExit --runInBand --bail --findRelatedTests',
    'git add',
  ],
  '*.{scss}': ['stylelint **/*.scss --fix', 'git add'],
};
