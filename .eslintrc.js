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
	rules: {},
};
