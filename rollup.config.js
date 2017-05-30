export default {
	entry: 'dist/index.js',
	dest: 'dist/bundles/ng2-multiselect.umd.js',
	sourceMap: false,
	format: 'umd',
	moduleName: 'ng2-multiselect',
	globals: {
		'@angular/core': 'ng.core',
		'@angular/common': 'ng.common',
		'@angular/forms': 'ng.forms',
		'rxjs/Observable': 'Rx'
	}
}
