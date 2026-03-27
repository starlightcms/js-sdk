# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## 4.0.0 - 2026-03-27

### Added
- `IntegerField`, `DecimalField`, `FloatField` and `SelectField` types to represent new data types supported by Starlight 
- `GetFromStructure` utility to retrieve Group and Field types deeply nested into a structure definition type
- `getMediaFile` and `getMediaSource` functions now accept a string or and array of strings in the `variation` argument


### Changed
- All Group and Field types (StringField, MediaField, etc.) now return `undefined` along with their previous types
  - For instance, `type StringField = string` is now `type StringField = string | undefined`
  - This change makes it more obvious that content saved in Starlight can always be undefined since
    content structures are mutable, which means that groups and fields can be added or removed freely 
    by developers at any given time
- The `RepeaterItem` utility type was renamed to `GetRepeaterItem` to better follow TypeScript naming guidelines
- `getMediaFile` and `getMediaSource` functions now accept `undefined` as the first parameter
  - In case the given media object is `undefined`, the function also returns `undefined`

## 3.2.0 - 2026-03-18

### Added
- `Group` and `RepeaterGroup` types to represent Groups in content structures
- `RepeaterItem` utility to retrieve the type of items inside repeater groups

## 3.1.0 - 2025-12-23

### Added
- All client methods that make API requests now accept both `params` and `options` arguments.
    - `params` is an optional object of parameters that will be sent with the request
    - `options` is an optional [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/RequestInit) object with
      request options that are passed directly to the `fetch` method

## 3.0.0 - 2025-12-17

### Added
- `AlignableBlock` and `StretchableBlock` types to support new features in Starlight's Visual Editor
  - Most content blocks are now Alignable and/or Stretchable

### Changed
- Minimum Node version is now 24

## 2.2.1 - 2023-10-06

### Added
- "video" to `BlockType`

## 2.2.0 - 2023-10-03

### Added
- Changelog
