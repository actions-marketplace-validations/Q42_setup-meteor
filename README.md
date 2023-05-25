# setup-meteor

This GitHub Action provides functionality to set up a Meteor environment.

## Fork disclaimer

This fork is not maintained, and does not add any functionality on top of the original version. It only exists for internal usage inside the Q42 org. If you want to use the action in your personal repository, it is recommended to use the official version which can be found here: https://github.com/EmJee1/setup-meteor.

## Why

- 📌 **No pinned version necessary**, it just looks at your Meteor release file
- ⚙️ **It's customizable**, you can specify a different file or pin it on a version.
- 🚫 **No-nonsense errors**, they are as descriptive as can be

## Example

1. With a Meteor release file

```yml
- uses: Q42/setup-meteor@v1.0.0
  with:
    meteor-version-file: '.meteor/release'
    # Or pin a version, this always takes precedence if supplied
    meteor-version: '2.11.0'
```
