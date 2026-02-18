const { src, dest } = require('gulp');

function buildIcons() {
	return src('static/musicgpt.svg')
		.pipe(dest('dist/nodes/MusicGPT'))
		.pipe(dest('dist/nodes/MusicGPTTrigger'));
}

exports.default = buildIcons;
exports['build:icons'] = buildIcons;