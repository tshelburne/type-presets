const assert = require('assert')
const sass = require('sass')

describe('scss', function() {
	it('supports defining and using typescales', function() {
		const scss = `
			@use 'type-presets' as t with (
				$typescales: (
					1: 12px (md: 14px, xl: 16px),
					2: 14px (lg: 20px),
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
				:global {
					--typescale-1-font-size: 12px;
					--typescale-1-line-height: 20px;
					--typescale-2-font-size: 14px;
					--typescale-2-line-height: 22px;
				}
			}
			@media screen and (min-width: 600px) {
				:global {
					--typescale-1-font-size: 12px;
					--typescale-1-line-height: 20px;
					--typescale-2-font-size: 14px;
					--typescale-2-line-height: 22px;
				}
			}
			@media screen and (min-width: 900px) {
				:global {
					--typescale-1-font-size: 14px;
					--typescale-1-line-height: 22px;
					--typescale-2-font-size: 14px;
					--typescale-2-line-height: 22px;
				}
			}
			@media screen and (min-width: 1200px) {
				:global {
					--typescale-1-font-size: 14px;
					--typescale-1-line-height: 22px;
					--typescale-2-font-size: 20px;
					--typescale-2-line-height: 28px;
				}
			}
			@media screen and (min-width: 1800px) {
				:global {
					--typescale-1-font-size: 16px;
					--typescale-1-line-height: 24px;
					--typescale-2-font-size: 20px;
					--typescale-2-line-height: 28px;
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
					2: (scale: 1, family: 'Comic Sans', transform: uppercase),
					3: (scale: 2, family: 'Comic Sans', weight: 800),
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
				:global {
					--typescale-1-font-size: 12px;
					--typescale-1-line-height: 20px;
					--typescale-2-font-size: 14px;
					--typescale-2-line-height: 22px;
				}
			}
			@media screen and (min-width: 600px) {
				:global {
					--typescale-1-font-size: 12px;
					--typescale-1-line-height: 20px;
					--typescale-2-font-size: 14px;
					--typescale-2-line-height: 22px;
				}
			}
			@media screen and (min-width: 900px) {
				:global {
					--typescale-1-font-size: 14px;
					--typescale-1-line-height: 22px;
					--typescale-2-font-size: 14px;
					--typescale-2-line-height: 22px;
				}
			}
			@media screen and (min-width: 1200px) {
				:global {
					--typescale-1-font-size: 14px;
					--typescale-1-line-height: 22px;
					--typescale-2-font-size: 20px;
					--typescale-2-line-height: 28px;
				}
			}
			@media screen and (min-width: 1800px) {
				:global {
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
				font-family: Comic Sans !important;
				font-weight: normal !important;
				text-transform: uppercase !important;
				letter-spacing: normal !important;
			}

			.preset-3 {
				font-size: var(--typescale-2-font-size);
				line-height: var(--typescale-2-line-height);
				font-family: Comic Sans;
				font-weight: 800;
				text-transform: none;
				letter-spacing: normal;
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