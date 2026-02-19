module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'n8n-nodes-base'],
	extends: [
		'plugin:n8n-nodes-base/nodes',
		'plugin:n8n-nodes-base/credentials',
	],
	rules: {
		// This rule is for the main n8n repository (camelCase short identifiers).
		// Community nodes must use full HTTP URLs (enforced by cred-class-field-documentation-url-not-http-url).
		'n8n-nodes-base/cred-class-field-documentation-url-miscased': 'off',
	},
};
