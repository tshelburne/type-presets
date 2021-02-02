type-presets
============

[![CircleCI](https://circleci.com/gh/tshelburne/type-presets.svg?style=svg)](https://circleci.com/gh/tshelburne/type-presets)

## Intention

Using typography throughout a complicated app gets complicated fast. I choose to trust the experts.

Having worked on several projects with the talented people at [SuperFriendly](https://superfriendlydesign.systems/about/), I've fully adopted their [approach to typography](https://superfriendlydesign.systems/articles/typography-in-design-systems/), with some adaptations and tooling to make it easier.

The article linked above does a better job explaining everything than I could ever do, so I'll simply say that every project I've worked on benefits from creating an intentionally limited and explicit set of type presets which are *the only* way to assign typographical rules.

There are two concepts:

1. *typescales*, which are explicit responsive rules that encapsulate `font-size` and `line-height` (the vertical space consumed by text)
1. *type presets*, which are explicit combinations of a typescale, `font-family`, `font-weight`, `text-transform`, and `letter-spacing` to create a conceptual preset

The goal is to provide this set of tools in a variety of languages and use-cases such that it encourages the ecosystem on the whole to adopt. Check out examples below.

## Installation

```bash
npm install type-presets
```

## Usage

### SCSS

#### Example

```scss
@use 'type-presets' as t with (
	$default-family: 'Arial, sans-serif',
	$typescales: (
		1: 12px (md: 14px, xl: 16px),
		2: 14px (lg: 20px),
	),
	$presets: (
		1: (scale: 1, spacing: .5),
		2: (scale: 1, family: 'Comic Sans', transform: uppercase),
		3: (scale: 2, family: 'Comic Sans', weight: 800),
	)
);

@include t.utility-classes($namespace: 'co');

h1, h2, h3 {
	@include t.type-preset(1);
}

p {
	@include t.type-preset(3);
}

.btn-primary {
	@include t.type-preset(2);
}
```

Which generates responsive media queries for scales, utility definitions for typescales and presets, and assign presets to a few components:

```css
@media screen and (min-width: 0) {
	:root {
		--typescale-1-font-size: 12px;
		--typescale-1-line-height: 20px;
		--typescale-2-font-size: 14px;
		--typescale-2-line-height: 22px;
	}
}
@media screen and (min-width: 600px) {
	:root {
		--typescale-1-font-size: 12px;
		--typescale-1-line-height: 20px;
		--typescale-2-font-size: 14px;
		--typescale-2-line-height: 22px;
	}
}
@media screen and (min-width: 900px) {
	:root {
		--typescale-1-font-size: 14px;
		--typescale-1-line-height: 22px;
		--typescale-2-font-size: 14px;
		--typescale-2-line-height: 22px;
	}
}
@media screen and (min-width: 1200px) {
	:root {
		--typescale-1-font-size: 14px;
		--typescale-1-line-height: 22px;
		--typescale-2-font-size: 20px;
		--typescale-2-line-height: 28px;
	}
}
@media screen and (min-width: 1800px) {
	:root {
		--typescale-1-font-size: 16px;
		--typescale-1-line-height: 24px;
		--typescale-2-font-size: 20px;
		--typescale-2-line-height: 28px;
	}
}

.test-u-typescale-1 {
	font-size: var(--typescale-1-font-size) !important;
	line-height: var(--typescale-1-line-height) !important;
}

.test-u-typescale-2 {
	font-size: var(--typescale-2-font-size) !important;
	line-height: var(--typescale-2-line-height) !important;
}

.test-u-type-preset-1 {
	font-size: var(--typescale-1-font-size) !important;
	line-height: var(--typescale-1-line-height) !important;
	font-family: "Arial, sans-serif" !important;
	font-weight: normal !important;
	text-transform: none !important;
	letter-spacing: 0.5 !important;
}

.test-u-type-preset-2 {
	font-size: var(--typescale-1-font-size) !important;
	line-height: var(--typescale-1-line-height) !important;
	font-family: "Comic Sans" !important;
	font-weight: normal !important;
	text-transform: uppercase !important;
	letter-spacing: normal !important;
}

.test-u-type-preset-3 {
	font-size: var(--typescale-2-font-size) !important;
	line-height: var(--typescale-2-line-height) !important;
	font-family: "Comic Sans" !important;
	font-weight: 800 !important;
	text-transform: none !important;
	letter-spacing: normal !important;
}

h1, h2, h3 {
	font-size: var(--typescale-1-font-size);
	line-height: var(--typescale-1-line-height);
	font-family: "Arial, sans-serif";
	font-weight: normal;
	text-transform: none;
	letter-spacing: 0.5;
}

p {
	font-size: var(--typescale-2-font-size);
	line-height: var(--typescale-2-line-height);
	font-family: "Comic Sans";
	font-weight: 800;
	text-transform: none;
	letter-spacing: normal;
}

.btn-primary {
	font-size: var(--typescale-1-font-size) !important;
	line-height: var(--typescale-1-line-height) !important;
	font-family: "Comic Sans" !important;
	font-weight: normal !important;
	text-transform: uppercase !important;
	letter-spacing: normal !important;
}
```

#### API

All configuration is exposed via [Sass module configuration](https://sass-lang.com/documentation/at-rules/use#configuration) - a full example is detailed below:

```scss
@use 'type-presets' with (
	$default-family: 'Arial, sans-serif',
	$default-weight: 500,
	$default-transform: uppercase,
	$default-spacing: 1.5,
	$line-height-scale: 10,

	$breakpoints: (
		small: 400px,
		med: 600px,
		largo: 1000px,
		extralargo: 2000px,
	),

	$typescales: (
		1: 12px (med: 14px, extralargo: (16px 32px)),
		2: (14px 18px) (largo: 20px),
	),
	$presets: (
		1: (scale: 1, spacing: .5),
		2: (scale: 1, family: 'Comic Sans', transform: uppercase),
		3: (scale: 2, family: 'Comic Sans', weight: 800),
	),
);
```
