const assert = require('assert')
const sass = require('sass')

describe('scss', function() {
	it('supports defining and using typescales', function() {
		expect(`
			@use 'type-presets' as t with (
				$typescales: (
					1: 12px (md: 14px, xl: 16px),
					2: 14px (lg: 20px),
				)
			);

			p {
				@include t.typescale(1);
			};
			`).toRender(`
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
			}`)
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