const { src, dest } = require('gulp');

function buildIcons() {
	return src('static/musicgpt.png')
		.pipe(dest('dist/nodes/MusicGPT'))
		.pipe(dest('dist/nodes/MusicGPTTrigger'));
}

exports.default = buildIcons;
exports['build:icons'] = buildIcons;