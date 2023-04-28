# setup-meteor

This GitHub Action provides functionality to set up a Meteor environment.

## Why

- 📌 **No pinned version necessary**, it just looks at your Meteor release file
- ⚙️ **It's customizable**, you can specify a different file or pin it on a version.
- 🚫 **No-nonsense errors**, they are as descriptive as can be

## Example

1. With a Meteor release file

```yml
- uses: EmJee1/setup-meteor@v1
  with:
    meteor-version-file: '.meteor/release'
    # Or pin a version, this always takes precedence if supplied
    meteor-version: '2.11.0'
```
