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
		'n8n-nodes-base/node-filename-against-convention': 'off',
		'n8n-nodes-base/cred-class-field-documentation-url-miscased': 'off',
		'n8n-nodes-base/node-class-description-name-miscased': 'off',
		'n8n-nodes-base/node-param-default-wrong-for-limit': 'off',
		'n8n-nodes-base/node-param-type-options-max-value-present': 'off',
		'n8n-nodes-base/node-param-description-wrong-for-limit': 'off',
	},
};
