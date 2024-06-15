# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Releases

### [0.1.0] - 2023-06-27

* Initial release
* Add README.md
* Add yaml-section-builder Plugin
* Add custom theme
* Configure Reveal
* Add first YAML configuration config.yml

## Add new version

```bash
# Checkout master branch
$ git checkout main && git pull

# Increase patch version
$ vi VERSION

# Change package.json version
$ vi package.json

# Change changelog
$ vi CHANGELOG.md

# Push new version
$ git add CHANGELOG.md VERSION package.json && git commit -m "Add version $(cat VERSION)" && git push

# Tag and push new version
$ git tag -a "$(cat VERSION)" -m "Version $(cat VERSION)" && git push origin "$(cat VERSION)"
```
