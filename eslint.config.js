module.exports = {
	env: {
		browser: true,
		node: true,
		jest: true,
		es6: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: 'module',
		ecmaFeatures: {
			impliedStrict: 'error',
			experimentalObjectRestSpread: 'error',
			jsx: true,
		},
	},
	settings: {
		react: {
			version: 'detect',
		},
  },
  plugins: [
    'react',
  ],
	extends: [
    'eslint:recommended',
    'plugin:react/recommended',
	],
	rules: {
    'no-unused-vars': 'off',
    'no-empty': 'off',
	},
};
