# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.6] - 2026-02-17

### Fixed
- Added `peerDependencies` with `n8n-workflow` to package.json
- Replaced raw `throw error` with `NodeApiError`/`NodeOperationError` from n8n-workflow in all node files
- Fixed inpaint operation field name mismatch (`start_time`/`end_time` renamed to `replace_start_at`/`replace_end_at` to match API)
- Removed unused `style` and `webhook_url` UI fields from `promptToLyrics` operation (not supported by API)
- Fixed subtitle expression order from `operation: resource` to `resource: operation`
- Added `noDataExpression: true` to `triggerOn` field in MusicGPT Trigger node
- Removed unused `apiRequestAllItems` dead code from transport module
- Added ESLint configuration and dev dependencies (`eslint`, `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`, `eslint-plugin-n8n-nodes-base`)

## [0.1.5] - 2026-01-13

### Fixed
- Added missing `pairedItem` linking to all operation functions for proper workflow data tracking
- All INodeExecutionData objects now include `pairedItem: { item: index }` property
- Affects all operations in search, audioGeneration, audioProcessing, and advancedGeneration modules

## [0.1.4] - 2025-11-05

## [0.1.3] - 2025-11-05

## [0.1.2] - 2025-11-05

## [0.1.1] - 2025-11-05

## [0.1.0] - 2025-11-05

### Added
- Initial release of n8n-nodes-musicgpt
- MusicGPT action node with 25 operations
- MusicGPT Trigger node with 2 trigger types
- Complete API integration for MusicGPT platform

#### Audio Generation Operations
- **Generate Audio**: Create music from text prompts or lyrics with music style
- **Text to Speech**: Convert text to natural speech in 10+ languages
- **Voice Changer**: Transform voices in audio files with 100+ voice options
- **Cover Song**: Create AI cover versions with different voices
- **Extraction**: Separate 20+ stems (vocals, instruments, drums, etc.)
- **Denoise**: Remove background noise from audio recordings

#### Audio Processing Operations
- **Deecho**: Remove echo effects from audio
- **Dereverb**: Remove reverb from recordings
- **Audio Mastering**: Master tracks to professional quality using reference tracks
- **Trim Audio**: Cut audio to specific time ranges
- **Change Audio Speed**: Adjust playback speed (0.5x - 2.0x)
- **Audio to MIDI**: Convert audio to MIDI notation
- **Extract Key/BPM**: Detect musical key and tempo
- **File Convert**: Convert between audio formats with customizable sample rates
- **Audio Transcribe**: Transcribe speech to text in multiple languages

#### Advanced Generation Operations
- **Remix**: AI-powered audio remixing and style transformation
- **Extend**: Extend audio duration with AI-generated continuation
- **Inpaint**: Replace specific sections of audio seamlessly
- **Sing Over Instrumental**: Add AI-generated vocals to instrumental tracks
- **Sound Generator**: Generate sound effects from text descriptions
- **Prompt to Lyrics**: Generate song lyrics from text prompts

#### Search Operations
- **Get All Voices**: List all available voices with pagination
- **Search Voices**: Search voices by name with filtering
- **Get Conversion by ID**: Retrieve status and results of specific conversions
- **Get Conversions by User**: Get user conversion history with date filters

#### Trigger Operations
- **Get Conversion Trigger**: Monitor specific conversion until completion
- **New Conversions Trigger**: Trigger workflow on new user conversions

### Features
- Dynamic voice loading from API (100+ voices)
- Webhook support for async processing
- Binary file handling from previous nodes
- Support for multiple audio formats (MP3, WAV, FLAC, OGG, AAC, WEBM)
- Multi-language support (English, Spanish, French, German, Italian, Portuguese, Chinese, Japanese, Korean)
- Comprehensive error handling
- Detailed API responses with task tracking

### Documentation
- Complete API documentation (DOCUMENTATION.md)
- Quick reference guide (API-REFERENCE.md)
- Comprehensive README with examples
- Usage examples for all operations
- Troubleshooting guide

### Developer Experience
- TypeScript implementation
- Full type definitions
- ESLint configuration
- Prettier formatting
- Build scripts for development and production
- Local development support with npm link

---

## Version History

- **0.1.6** - Error handling, ESLint setup, and field name fixes for n8n community node review
- **0.1.5** - Fixed missing pairedItem linking in all operations
- **0.1.4** - Previous version
- **0.1.3** - Previous version
- **0.1.2** - Previous version
- **0.1.1** - Previous version
- **0.1.0** - Initial release with 25 operations and 2 triggers

---

**Note**: This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible API changes
- **MINOR** version for new functionality in a backwards compatible manner
- **PATCH** version for backwards compatible bug fixes
