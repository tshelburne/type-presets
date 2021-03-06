const assert = require('assert')
const sass = require('sass')

describe('scss', function() {
	it('supports defining and using typescales', function() {
		const scss = `
			@use 'type-presets' as t with (
				$typescales: (
					1: 12px (md: 14px, xl: 16px),
					2: (14px, 20px) (lg: 20px),
					3: 16px,
					4: (18px, 24px),
				)
			);

			p {
				@include t.typescale(1);
			}

			.u-typescale-2 {
				@include t.typescale(2, $important: true);
			}`
		const css = `
			@media screen and (min-width: 0) {
				:root {
					--typescale-1-font-size: 12px;
					--typescale-1-line-height: 20px;
					--typescale-2-font-size: 14px;
					--typescale-2-line-height: 20px;
					--typescale-3-font-size: 16px;
					--typescale-3-line-height: 24px;
					--typescale-4-font-size: 18px;
					--typescale-4-line-height: 24px;
				}
			}
			@media screen and (min-width: 600px) {
				:root {
					--typescale-1-font-size: 12px;
					--typescale-1-line-height: 20px;
					--typescale-2-font-size: 14px;
					--typescale-2-line-height: 20px;
					--typescale-3-font-size: 16px;
					--typescale-3-line-height: 24px;
					--typescale-4-font-size: 18px;
					--typescale-4-line-height: 24px;
				}
			}
			@media screen and (min-width: 900px) {
				:root {
					--typescale-1-font-size: 14px;
					--typescale-1-line-height: 22px;
					--typescale-2-font-size: 14px;
					--typescale-2-line-height: 20px;
					--typescale-3-font-size: 16px;
					--typescale-3-line-height: 24px;
					--typescale-4-font-size: 18px;
					--typescale-4-line-height: 24px;
				}
			}
			@media screen and (min-width: 1200px) {
				:root {
					--typescale-1-font-size: 14px;
					--typescale-1-line-height: 22px;
					--typescale-2-font-size: 20px;
					--typescale-2-line-height: 28px;
					--typescale-3-font-size: 16px;
					--typescale-3-line-height: 24px;
					--typescale-4-font-size: 18px;
					--typescale-4-line-height: 24px;
				}
			}
			@media screen and (min-width: 1800px) {
				:root {
					--typescale-1-font-size: 16px;
					--typescale-1-line-height: 24px;
					--typescale-2-font-size: 20px;
					--typescale-2-line-height: 28px;
					--typescale-3-font-size: 16px;
					--typescale-3-line-height: 24px;
					--typescale-4-font-size: 18px;
					--typescale-4-line-height: 24px;
				}
			}

			p {
				font-size: var(--typescale-1-font-size);
				line-height: var(--typescale-1-line-height);
			}

			.u-typescale-2 {
				font-size: var(--typescale-2-font-size) !important;
				line-height: var(--typescale-2-line-height) !important;
			}`
		expect(scss).toRender(css)
	})

	it('supports defining and using type presets', function() {
		const scss = `
			@use 'type-presets' as t with (
				$default-family: 'Arial, sans-serif',
				$typescales: (
					1: 12px (md: 14px, xl: 16px),
					2: 14px (lg: 20px),
				),
				$presets: (
					1: (scale: 1, spacing: .5),
					2: (scale: 1, family: '"Comic Sans 1211"', transform: uppercase),
					3: (scale: 2, family: '"Comic Sans 1211"', weight: 800),
				)
			);

			.preset-1 {
				@include t.type-preset(1);
			}

			.preset-2 {
				@include t.type-preset(2, $important: true);
			}

			.preset-3 {
				@include t.type-preset(3);
			}`
		const css = `
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

			.preset-1 {
				font-size: var(--typescale-1-font-size);
				line-height: var(--typescale-1-line-height);
				font-family: Arial, sans-serif;
				font-weight: normal;
				text-transform: none;
				letter-spacing: 0.5;
			}

			.preset-2 {
				font-size: var(--typescale-1-font-size) !important;
				line-height: var(--typescale-1-line-height) !important;
				font-family: "Comic Sans 1211" !important;
				font-weight: normal !important;
				text-transform: uppercase !important;
				letter-spacing: normal !important;
			}

			.preset-3 {
				font-size: var(--typescale-2-font-size);
				line-height: var(--typescale-2-line-height);
				font-family: "Comic Sans 1211";
				font-weight: 800;
				text-transform: none;
				letter-spacing: normal;
			}`
		expect(scss).toRender(css)
	})

	it('supports generating utility classes', function() {
		const scss = `
			@use 'type-presets' as t with (
				$default-family: 'Arial, sans-serif',
				$typescales: (
					1: 12px (md: 14px, xl: 16px),
					2: 14px (lg: 20px),
				),
				$presets: (
					1: (scale: 1, spacing: .5),
					2: (scale: 1, family: '"Comic Sans", sans-serif', transform: uppercase),
					3: (scale: 2, family: '"Comic Sans", sans-serif', weight: 800),
				)
			);

			@include t.utility-classes($namespace: 'test');`
		const css = `
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
				font-family: Arial, sans-serif !important;
				font-weight: normal !important;
				text-transform: none !important;
				letter-spacing: 0.5 !important;
			}

			.test-u-type-preset-2 {
				font-size: var(--typescale-1-font-size) !important;
				line-height: var(--typescale-1-line-height) !important;
				font-family: "Comic Sans", sans-serif !important;
				font-weight: normal !important;
				text-transform: uppercase !important;
				letter-spacing: normal !important;
			}

			.test-u-type-preset-3 {
				font-size: var(--typescale-2-font-size) !important;
				line-height: var(--typescale-2-line-height) !important;
				font-family: "Comic Sans", sans-serif !important;
				font-weight: 800 !important;
				text-transform: none !important;
				letter-spacing: normal !important;
			}`
		expect(scss).toRender(css)
	})

	it('supports custom breakpoints for typescales', function() {
		const scss = `
			@use 'type-presets' as t with (
				$breakpoints: (
					small: 400px,
					med: 500px,
					largo: 2000px,
				),
				$typescales: (
					1: 12px (med: 14px, largo: 16px),
					2: 14px (small: 20px),
				)
			);`
		const css = `
			@media screen and (min-width: 0) {
				:root {
					--typescale-1-font-size: 12px;
					--typescale-1-line-height: 20px;
					--typescale-2-font-size: 14px;
					--typescale-2-line-height: 22px;
				}
			}
			@media screen and (min-width: 400px) {
				:root {
					--typescale-1-font-size: 12px;
					--typescale-1-line-height: 20px;
					--typescale-2-font-size: 20px;
					--typescale-2-line-height: 28px;
				}
			}
			@media screen and (min-width: 500px) {
				:root {
					--typescale-1-font-size: 14px;
					--typescale-1-line-height: 22px;
					--typescale-2-font-size: 20px;
					--typescale-2-line-height: 28px;
				}
			}
			@media screen and (min-width: 2000px) {
				:root {
					--typescale-1-font-size: 16px;
					--typescale-1-line-height: 24px;
					--typescale-2-font-size: 20px;
					--typescale-2-line-height: 28px;
				}
			}`
		expect(scss).toRender(css)
	})

	it('supports customizing line heights', function() {
		const scss = `
			@use 'type-presets' as t with (
				$line-height-scale: 10,
				$typescales: (
					1: 12px (md: 14px, xl: 16px),
					2: (12px 20px) (md: 13px, xl: (16px 32px)),
				)
			);`
		const css = `
			@media screen and (min-width: 0) {
				:root {
					--typescale-1-font-size: 12px;
					--typescale-1-line-height: 22px;
					--typescale-2-font-size: 12px;
					--typescale-2-line-height: 20px;
				}
			}
			@media screen and (min-width: 600px) {
				:root {
					--typescale-1-font-size: 12px;
					--typescale-1-line-height: 22px;
					--typescale-2-font-size: 12px;
					--typescale-2-line-height: 20px;
				}
			}
			@media screen and (min-width: 900px) {
				:root {
					--typescale-1-font-size: 14px;
					--typescale-1-line-height: 24px;
					--typescale-2-font-size: 13px;
					--typescale-2-line-height: 23px;
				}
			}
			@media screen and (min-width: 1200px) {
				:root {
					--typescale-1-font-size: 14px;
					--typescale-1-line-height: 24px;
					--typescale-2-font-size: 13px;
					--typescale-2-line-height: 23px;
				}
			}
			@media screen and (min-width: 1800px) {
				:root {
					--typescale-1-font-size: 16px;
					--typescale-1-line-height: 26px;
					--typescale-2-font-size: 16px;
					--typescale-2-line-height: 32px;
				}
			}`
		expect(scss).toRender(css)
	})
})

// ---------------- HELPERS ----------------

function expect(src) {
	return {
		toRender(css) {
			const expected = css.replace(/\t/g, '  ').replace(/\n      /g, '\n').replace(/^\n/, '')
			const result = sass.renderSync({
				data: src,
				includePaths: [__dirname],
			})
			const actual = result.css.toString()
			assert.equal(expected, actual)
		}
	}
}