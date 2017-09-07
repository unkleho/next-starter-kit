module.exports = {
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-lost"
  ],
  "rules": {
    "at-rule-empty-line-before": null,
    "at-rule-no-unknown": [ true, {
      ignoreAtRules: ["define-mixin", "mixin", "mixin-content"],
    }],
    "comment-whitespace-inside": null,
    "custom-property-empty-line-before": null,
    "declaration-empty-line-before": null,
    "selector-list-comma-newline-after": null,
  }
}
