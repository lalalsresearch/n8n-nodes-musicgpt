# MusicGPT n8n Node Documentation

Complete API reference for the MusicGPT n8n community node package.

## Table of Contents

1. [Installation](#installation)
2. [Authentication](#authentication)
3. [Node Overview](#node-overview)
4. [Actions](#actions)
   - [Audio Generation](#audio-generation)
   - [Audio Processing](#audio-processing)
   - [Advanced Generation](#advanced-generation)
5. [Searches](#searches)
6. [Triggers](#triggers)
7. [Common Patterns](#common-patterns)
8. [Error Handling](#error-handling)
9. [Examples](#examples)

---

## Installation

### Via n8n Community Nodes

1. Open your n8n instance
2. Go to **Settings** → **Community Nodes**
3. Click **Install**
4. Enter package name: `n8n-nodes-musicgpt`
5. Click **Install**

### Via npm (Self-Hosted)

```bash
cd ~/.n8n/nodes
npm install n8n-nodes-musicgpt
```

### Via Docker

Add to your `docker-compose.yml`:

```yaml
environment:
  - N8N_CUSTOM_EXTENSIONS=/data/custom-nodes
  - API_BASE_URL=https://api.musicgpt.com
volumes:
  - ./custom-nodes:/data/custom-nodes
```

Then install:

```bash
cd custom-nodes
npm install n8n-nodes-musicgpt
```

---

## Authentication

### Environment Setup

**Required**: Before starting n8n, set the API base URL environment variable:

```bash
export API_BASE_URL=https://api.musicgpt.com
```

For Docker deployments, add to your `docker-compose.yml`:
```yaml
environment:
  - API_BASE_URL=https://api.musicgpt.com
```

### Creating Credentials

1. In n8n, go to **Credentials** → **New**
2. Search for "MusicGPT API"
3. Enter your credentials:
   - **API Key**: Your MusicGPT API key

### Getting an API Key

1. Visit [https://musicgpt.com](https://musicgpt.com)
2. Sign up or log in
3. Navigate to **Settings** → **API Keys**
4. Generate a new API key
5. Copy and save it securely

---

## Node Overview

The MusicGPT n8n package includes:

- **1 Action Node**: MusicGPT (25 operations across 4 resources)
- **1 Trigger Node**: MusicGPT Trigger (2 trigger types)

### Resources

| Resource | Operations | Description |
|----------|-----------|-------------|
| Audio Generation | 6 | Generate music, TTS, voice changing, covers, stems, denoise |
| Audio Processing | 9 | Clean, master, trim, speed, MIDI, BPM/key extraction, convert, transcribe |
| Advanced Generation | 6 | Remix, extend, inpaint, sing over instrumental, sound FX, lyrics |
| Search | 4 | Voice lookup, conversion status |

---

## Actions

## Audio Generation

### 1. Generate Audio

Generate original music from text prompts or lyrics with music style.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `generationMode` | `options` | Yes | `prompt` or `custom` (lyrics + style) |
| `prompt` | `string` | Conditional | Text description of music (if mode = prompt) |
| `music_style` | `string` | Conditional | Music genre/style (if mode = custom) |
| `lyrics` | `string` | No | Custom lyrics (if mode = custom) |
| `voice_id` | `options` | No | Voice to use (dynamically loaded) |
| `make_instrumental` | `boolean` | No | Generate without vocals |
| `vocal_only` | `boolean` | No | Generate vocals only |
| `negative_tags` | `string` | No | Tags/themes to avoid |
| `webhook_url` | `string` | No | Callback URL for completion |

**Returns:**

```json
{
  "success": true,
  "task_id": "task_abc123",
  "conversion_id_1": "conv_xyz789",
  "conversion_id_2": "conv_xyz790",
  "eta": 45,
  "message": "Music generation started"
}
```

**Example Use Cases:**
- Generate background music for videos
- Create music from song lyrics
- Produce instrumental tracks
- Generate vocals with specific voices

---

### 2. Text to Speech

Convert text to natural-sounding speech.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text to convert to speech |
| `voiceSelection` | `options` | Yes | `gender` or `voice` |
| `voice_id` | `options` | Conditional | Specific voice (if voiceSelection = voice) |
| `gender` | `options` | Conditional | `m` or `f` (if voiceSelection = gender) |
| `language` | `options` | Yes | Language code (`auto`, `en`, `es`, `fr`, `de`, `it`, `pt`, `zh`, `ja`, `ko`) |
| `webhook_url` | `string` | No | Callback URL for completion |

**Returns:**

```json
{
  "success": true,
  "task_id": "task_def456",
  "conversion_id": "conv_ghi789",
  "eta": 15,
  "message": "Text-to-speech conversion started"
}
```

**Example Use Cases:**
- Generate podcast voiceovers
- Create audiobook narrations
- Produce automated announcements
- Generate multilingual content

---

### 3. Voice Changer

Transform voices in existing audio files.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `audioSource` | `options` | Yes | `url` or `file` |
| `audio_url` | `string` | Conditional | Audio URL (if source = url) |
| `audio_file` | `string` | Conditional | Binary property name (if source = file) |
| `voice_id` | `options` | Yes | Target voice ID (dynamically loaded) |
| `remove_background` | `options` | No | `0` (no) or `1` (yes) |
| `pitch` | `number` | No | Pitch adjustment (-12 to 12) |
| `webhook_url` | `string` | No | Callback URL for completion |

**Returns:**

```json
{
  "success": true,
  "task_id": "task_jkl123",
  "conversion_id": "conv_mno456",
  "eta": 30,
  "output_url": "https://cdn.musicgpt.com/output.mp3"
}
```

**Example Use Cases:**
- Create celebrity voice impressions
- Change voice gender in recordings
- Anonymize speaker identity
- Generate character voices for animations

---

### 4. Cover Song

Create cover versions of songs with different voices.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `audioSource` | `options` | Yes | `url` or `file` |
| `audio_url` | `string` | Conditional | Original song URL (if source = url) |
| `audio_file` | `string` | Conditional | Binary property name (if source = file) |
| `voice_id` | `options` | Yes | Voice for the cover |
| `pitch` | `number` | No | Pitch adjustment (-12 to 12) |
| `webhook_url` | `string` | No | Callback URL for completion |

**Returns:**

```json
{
  "success": true,
  "task_id": "task_pqr789",
  "conversion_id": "conv_stu012",
  "eta": 60,
  "output_url": "https://cdn.musicgpt.com/cover.mp3"
}
```

**Example Use Cases:**
- Generate AI covers by different artists
- Create tribute songs
- Produce mashups
- Generate demo versions with different vocals

---

### 5. Extraction (Stem Separation)

Extract individual stems (vocals, instruments) from audio.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `audioSource` | `options` | Yes | `url` or `file` |
| `audio_url` | `string` | Conditional | Audio URL (if source = url) |
| `audio_file` | `string` | Conditional | Binary property name (if source = file) |
| `stems` | `multiOptions` | Yes | Stems to extract (vocals, instrumental, bass, drums, guitar, piano, etc.) |
| `preprocessing_options` | `multiOptions` | No | Apply denoise, deecho, dereverb before extraction |
| `webhook_url` | `string` | No | Callback URL for completion |

**Available Stems:**
- `vocals` - All vocals
- `instrumental` - All instruments
- `male_vocal` - Male vocals only
- `female_vocal` - Female vocals only
- `lead_vocal` - Lead vocals
- `back_vocal` - Background vocals
- `bass` - Bass guitar/synth
- `drums` - Drum kit
- `guitar` - All guitars
- `piano` - Piano/keys
- `keys` - Keyboard instruments
- `strings` - String section
- `winds` - Wind instruments
- `rhythm_guitar` - Rhythm guitar
- `solo_guitar` - Lead guitar
- `acoustic_guitar` - Acoustic guitar
- `electric_guitar` - Electric guitar
- `kick_drum` - Kick drum
- `snare_drum` - Snare drum
- `toms` - Tom drums
- `hi_hat` - Hi-hat cymbal
- `ride` - Ride cymbal
- `crash` - Crash cymbal

**Returns:**

```json
{
  "success": true,
  "task_id": "task_vwx345",
  "conversion_ids": ["conv_stem1", "conv_stem2"],
  "eta": 90,
  "stems": ["vocals", "instrumental"]
}
```

**Example Use Cases:**
- Create karaoke tracks (remove vocals)
- Extract instrumentals for remixing
- Isolate specific instruments for sampling
- Create stems for music production

---

### 6. Denoise

Remove background noise from audio.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `audioSource` | `options` | Yes | `url` or `file` |
| `audio_url` | `string` | Conditional | Audio URL (if source = url) |
| `audio_file` | `string` | Conditional | Binary property name (if source = file) |
| `webhook_url` | `string` | No | Callback URL for completion |

**Returns:**

```json
{
  "success": true,
  "task_id": "task_yz1234",
  "conversion_id": "conv_abc567",
  "eta": 20,
  "output_url": "https://cdn.musicgpt.com/denoised.mp3"
}
```

**Example Use Cases:**
- Clean podcast recordings
- Remove background noise from interviews
- Improve audio quality
- Prepare audio for further processing

---

## Audio Processing

### 1. Deecho

Remove echo from audio recordings.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `audioSource` | `options` | Yes | `url` or `file` |
| `audio_url` | `string` | Conditional | Audio URL (if source = url) |
| `audio_file` | `string` | Conditional | Binary property name (if source = file) |
| `webhook_url` | `string` | No | Callback URL for completion |

**Returns:**

```json
{
  "success": true,
  "task_id": "task_abc890",
  "conversion_id": "conv_def123",
  "eta": 25,
  "output_url": "https://cdn.musicgpt.com/deechoed.mp3"
}
```

**Example Use Cases:**
- Fix room echo in recordings
- Clean up live recordings
- Improve voice clarity
- Prepare audio for broadcasting

---

### 2. Dereverb

Remove reverb from audio.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `audioSource` | `options` | Yes | `url` or `file` |
| `audio_url` | `string` | Conditional | Audio URL (if source = url) |
| `audio_file` | `string` | Conditional | Binary property name (if source = file) |
| `webhook_url` | `string` | No | Callback URL for completion |

**Returns:**

```json
{
  "success": true,
  "task_id": "task_ghi456",
  "conversion_id": "conv_jkl789",
  "eta": 25,
  "output_url": "https://cdn.musicgpt.com/dereverbed.mp3"
}
```

**Example Use Cases:**
- Remove unwanted room reverb
- Dry out vocals for re-processing
- Clean up location recordings
- Prepare stems for mixing

---

### 3. Audio Mastering

Master audio tracks to professional quality using reference tracks.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `audioSource` | `options` | Yes | `url` or `file` |
| `audio_url` | `string` | Conditional | Audio to master URL (if source = url) |
| `audio_file` | `string` | Conditional | Binary property name (if source = file) |
| `referenceAudioSource` | `options` | Yes | `url` or `file` |
| `reference_audio_url` | `string` | Conditional | Reference track URL |
| `reference_audio_file` | `string` | Conditional | Reference binary property name |
| `output_extension` | `options` | No | Output format (`mp3`, `wav`, `flac`, `ogg`, `aac`, `webm`) |
| `webhook_url` | `string` | No | Callback URL for completion |

**Returns:**

```json
{
  "success": true,
  "task_id": "task_mno012",
  "conversion_id": "conv_pqr345",
  "eta": 40,
  "output_url": "https://cdn.musicgpt.com/mastered.mp3"
}
```

**Example Use Cases:**
- Match commercial loudness standards
- Apply professional EQ/compression
- Finalize tracks for distribution
- Match sonic characteristics of reference tracks

---

### 4. Trim Audio

Cut audio to a specific time range.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `audioSource` | `options` | Yes | `url` or `file` |
| `audio_url` | `string` | Conditional | Audio URL (if source = url) |
| `audio_file` | `string` | Conditional | Binary property name (if source = file) |
| `start_time` | `number` | Yes | Start time in seconds |
| `end_time` | `number` | Yes | End time in seconds |
| `webhook_url` | `string` | No | Callback URL for completion |

**Returns:**

```json
{
  "success": true,
  "task_id": "task_stu678",
  "conversion_id": "conv_vwx901",
  "eta": 10,
  "output_url": "https://cdn.musicgpt.com/trimmed.mp3"
}
```

**Example Use Cases:**
- Extract specific sections
- Remove intro/outro
- Create audio clips
- Prepare segments for editing

---

### 5. Change Audio Speed

Adjust playback speed of audio.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `audioSource` | `options` | Yes | `url` or `file` |
| `audio_url` | `string` | Conditional | Audio URL (if source = url) |
| `audio_file` | `string` | Conditional | Binary property name (if source = file) |
| `speed_factor` | `number` | Yes | Speed multiplier (0.5 to 2.0) |
| `webhook_url` | `string` | No | Callback URL for completion |

**Returns:**

```json
{
  "success": true,
  "task_id": "task_yz2345",
  "conversion_id": "conv_abc678",
  "eta": 15,
  "output_url": "https://cdn.musicgpt.com/speed_changed.mp3"
}
```

**Example Use Cases:**
- Create slow-motion effects
- Speed up audiobooks
- Time-stretch music
- Adjust podcast playback

---

### 6. Audio to MIDI

Convert audio to MIDI notation.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `audioSource` | `options` | Yes | `url` or `file` |
| `audio_url` | `string` | Conditional | Audio URL (if source = url) |
| `audio_file` | `string` | Conditional | Binary property name (if source = file) |
| `webhook_url` | `string` | No | Callback URL for completion |

**Returns:**

```json
{
  "success": true,
  "task_id": "task_def901",
  "conversion_id": "conv_ghi234",
  "eta": 35,
  "output_url": "https://cdn.musicgpt.com/output.mid"
}
```

**Example Use Cases:**
- Transcribe melodies
- Extract chord progressions
- Create sheet music
- Analyze musical structure

---

### 7. Extract Key/BPM

Extract musical key and tempo from audio.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `audioSource` | `options` | Yes | `url` or `file` |
| `audio_url` | `string` | Conditional | Audio URL (if source = url) |
| `audio_file` | `string` | Conditional | Binary property name (if source = file) |
| `webhook_url` | `string` | No | Callback URL for completion |

**Returns:**

```json
{
  "success": true,
  "task_id": "task_jkl567",
  "key": "C Major",
  "bpm": 120,
  "confidence": 0.95
}
```

**Example Use Cases:**
- DJ track matching
- Music library cataloging
- Remix preparation
- Music theory analysis

---

### 8. File Convert

Convert audio between different formats.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `audioSource` | `options` | Yes | `url` or `file` |
| `audio_url` | `string` | Conditional | Audio URL (if source = url) |
| `audio_file` | `string` | Conditional | Binary property name (if source = file) |
| `target_format` | `options` | Yes | Output format (`mp3`, `wav`, `flac`, `ogg`, `aac`, `webm`) |
| `target_sr` | `options` | No | Sample rate (8000-192000 Hz) |
| `target_bit_depth` | `options` | No | Bit depth (`16` or `24` bit) |
| `webhook_url` | `string` | No | Callback URL for completion |

**Returns:**

```json
{
  "success": true,
  "task_id": "task_mno890",
  "conversion_id": "conv_pqr123",
  "eta": 20,
  "output_url": "https://cdn.musicgpt.com/converted.wav"
}
```

**Example Use Cases:**
- Convert to web-friendly formats
- Prepare high-res files for archival
- Convert for specific platforms
- Optimize file size

---

### 9. Audio Transcribe

Transcribe speech to text.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `audioSource` | `options` | Yes | `url` or `file` |
| `audio_url` | `string` | Conditional | Audio URL (if source = url) |
| `audio_file` | `string` | Conditional | Binary property name (if source = file) |
| `language` | `options` | No | Language (`auto`, `en`, `es`, `fr`, `de`, `it`, `pt`, `zh`, `ja`, `ko`) |
| `webhook_url` | `string` | No | Callback URL for completion |

**Returns:**

```json
{
  "success": true,
  "task_id": "task_stu456",
  "transcription": "Hello, this is a test transcription.",
  "language": "en",
  "confidence": 0.92
}
```

**Example Use Cases:**
- Generate podcast transcripts
- Create subtitles
- Index audio content
- Extract quotes from interviews

---

## Advanced Generation

### 1. Remix

AI-powered remixing of audio tracks.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `audioSource` | `options` | Yes | `url` or `file` |
| `audio_url` | `string` | Conditional | Audio URL (if source = url) |
| `audio_file` | `string` | Conditional | Binary property name (if source = file) |
| `prompt` | `string` | No | Remix transformation description |
| `lyrics` | `string` | No | New lyrics for remix |
| `gender` | `options` | No | Vocal gender (`male`, `female`, `neutral`) |
| `title` | `string` | No | Track title |
| `webhook_url` | `string` | No | Callback URL for completion |

**Returns:**

```json
{
  "success": true,
  "task_id": "task_vwx789",
  "conversion_id_1": "conv_abc012",
  "conversion_id_2": "conv_abc013",
  "eta": 90
}
```

**Example Use Cases:**
- Transform genre/style
- Create EDM versions
- Generate lo-fi remixes
- Produce alternative versions

---

### 2. Extend

Extend audio duration with AI-generated continuation.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `audioSource` | `options` | Yes | `url` or `file` |
| `audio_url` | `string` | Conditional | Audio URL (if source = url) |
| `audio_file` | `string` | Conditional | Binary property name (if source = file) |
| `extend_after` | `number` | Yes | Timestamp (seconds) to extend after (0-300) |
| `prompt` | `string` | No | Extension style description (max 280 chars) |
| `lyrics` | `string` | No | Lyrics for extension (max 2000 chars) |
| `gender` | `options` | No | Vocal gender (`male`, `female`, `neutral`) |
| `title` | `string` | No | Track title |
| `webhook_url` | `string` | No | Callback URL for completion |

**Returns:**

```json
{
  "success": true,
  "task_id": "task_def345",
  "conversion_id_1": "conv_ghi678",
  "conversion_id_2": "conv_ghi679",
  "eta": 75
}
```

**Example Use Cases:**
- Extend short loops
- Create longer versions
- Add outro sections
- Generate extended mixes

---

### 3. Inpaint

Replace specific sections of audio with AI-generated content.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `audioSource` | `options` | Yes | `url` or `file` |
| `audio_url` | `string` | Conditional | Audio URL (if source = url) |
| `audio_file` | `string` | Conditional | Binary property name (if source = file) |
| `start_time` | `number` | Yes | Inpaint region start (seconds) |
| `end_time` | `number` | Yes | Inpaint region end (seconds) |
| `prompt` | `string` | No | Desired content description |
| `webhook_url` | `string` | No | Callback URL for completion |

**Returns:**

```json
{
  "success": true,
  "task_id": "task_jkl901",
  "conversion_id": "conv_mno234",
  "eta": 50
}
```

**Example Use Cases:**
- Fix mistakes in recordings
- Replace sections
- Fill gaps
- Create seamless transitions

---

### 4. Sing Over Instrumental

Add AI-generated vocals to instrumental tracks.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `audioSource` | `options` | Yes | `url` or `file` |
| `audio_url` | `string` | Conditional | Instrumental URL (if source = url) |
| `audio_file` | `string` | Conditional | Binary property name (if source = file) |
| `lyrics` | `string` | Yes | Lyrics to sing |
| `prompt` | `string` | No | Singing style description (max 280 chars) |
| `gender` | `options` | No | Vocal gender (`male`, `female`, `neutral`) |
| `title` | `string` | No | Song title |
| `webhook_url` | `string` | No | Callback URL for completion |

**Returns:**

```json
{
  "success": true,
  "task_id": "task_pqr567",
  "conversion_id": "conv_stu890",
  "eta": 80
}
```

**Example Use Cases:**
- Add vocals to beats
- Create song demos
- Generate vocal tracks
- Produce complete songs from instrumentals

---

### 5. Sound Generator

Generate sound effects from text descriptions.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `prompt` | `string` | Yes | Sound description |
| `audio_length` | `number` | No | Duration in seconds |
| `webhook_url` | `string` | No | Callback URL for completion |

**Returns:**

```json
{
  "success": true,
  "task_id": "task_vwx123",
  "conversion_id": "conv_yz456",
  "eta": 25,
  "output_url": "https://cdn.musicgpt.com/sound_effect.mp3"
}
```

**Example Use Cases:**
- Generate game sound effects
- Create ambient sounds
- Produce foley effects
- Generate environmental audio

---

### 6. Prompt to Lyrics

Generate song lyrics from text prompts.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `prompt` | `string` | Yes | Theme/idea for lyrics |
| `style` | `string` | No | Musical style/genre |
| `webhook_url` | `string` | No | Callback URL for completion |

**Returns:**

```json
{
  "success": true,
  "lyrics": "Verse 1:\nWalking down the street...\n\nChorus:\nThis is my song...",
  "style": "pop",
  "theme": "starting over"
}
```

**Example Use Cases:**
- Generate songwriting ideas
- Create lyrics for specific themes
- Produce genre-specific lyrics
- Overcome writer's block

---

## Searches

### 1. Get All Voices

Retrieve list of available voices.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | `number` | No | Results per page (1-100, default: 20) |
| `page` | `number` | No | Page number (starts from 0) |

**Returns:**

```json
{
  "success": true,
  "voices": [
    {
      "voice_id": "voice_abc123",
      "voice_name": "John Doe",
      "tts_only": false,
      "description": "Male voice, American accent"
    }
  ],
  "total": 150,
  "page": 0
}
```

**Example Use Cases:**
- List available voices
- Build voice selection UI
- Cache voice metadata
- Discover new voices

---

### 2. Search Voices

Search for voices by name.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | `string` | Yes | Search term (voice name) |
| `limit` | `number` | No | Results per page (1-100, default: 20) |
| `page` | `number` | No | Page number (starts from 0) |

**Returns:**

```json
{
  "success": true,
  "voices": [
    {
      "voice_id": "voice_def456",
      "voice_name": "Justin Bieber",
      "tts_only": false,
      "match_score": 0.95
    }
  ],
  "total": 5
}
```

**Example Use Cases:**
- Find specific voices
- Implement voice search
- Match voice by name
- Filter voice lists

---

### 3. Get Conversion by ID

Retrieve status/results of a specific conversion.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `conversionType` | `options` | Yes | Type: `voice_changer`, `text_to_speech`, `cover_song`, `audio_generation`, `remix`, `extraction`, `other` |
| `task_id` | `string` | Conditional | Task identifier |
| `conversion_id` | `string` | Conditional | Conversion identifier |

**Note:** Either `task_id` OR `conversion_id` must be provided.

**Returns:**

```json
{
  "success": true,
  "conversion": {
    "conversion_id": "conv_ghi789",
    "task_id": "task_jkl012",
    "status": "completed",
    "output_url": "https://cdn.musicgpt.com/result.mp3",
    "created_at": "2025-01-01T12:00:00Z",
    "completed_at": "2025-01-01T12:01:30Z"
  }
}
```

**Status Values:**
- `pending` - Queued for processing
- `processing` - Currently being processed
- `completed` - Successfully completed
- `failed` - Processing failed
- `cancelled` - User cancelled

**Example Use Cases:**
- Poll for completion
- Retrieve results
- Check processing status
- Monitor progress

---

### 4. Get Conversions by User

Retrieve user's conversion history with filters.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `conversionType` | `options` | No | Filter by type (empty = all types) |
| `startDate` | `dateTime` | No | Filter from date (ISO 8601) |
| `endDate` | `dateTime` | No | Filter to date (ISO 8601) |
| `sortOrder` | `options` | No | `DESC` (newest first) or `ASC` (oldest first) |
| `limit` | `number` | No | Results to return (1-100, default: 10) |
| `LastEvaluatedKey` | `string` | No | Pagination key from previous request |

**Returns:**

```json
{
  "success": true,
  "conversions": [
    {
      "conversion_id": "conv_abc123",
      "task_id": "task_def456",
      "type": "voice_changer",
      "status": "completed",
      "created_at": "2025-01-01T10:00:00Z"
    }
  ],
  "LastEvaluatedKey": "key_xyz789",
  "total": 45
}
```

**Example Use Cases:**
- Display conversion history
- Filter by date range
- Paginate results
- Monitor user activity

---

## Triggers

### MusicGPT Trigger Node

Poll for conversion events and trigger workflows automatically.

#### Trigger Type 1: Get Conversion

Monitor a specific conversion until completion.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `triggerOn` | `options` | Yes | Select `getConversionById` |
| `conversionType` | `options` | Yes | Conversion type |
| `task_id` | `string` | Conditional | Task ID to monitor |
| `conversion_id` | `string` | Conditional | Conversion ID to monitor |

**Behavior:**
- Polls API at regular intervals
- Triggers when conversion status changes
- Returns conversion data

**Example Use Case:**
```
Trigger (monitor task_abc123) →
Wait for completion →
Send notification →
Download result
```

---

#### Trigger Type 2: New Conversions

Monitor for new conversions in user account.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `triggerOn` | `options` | Yes | Select `getConversionsByUser` |
| `conversionType` | `options` | No | Filter by type (empty = all) |
| `startDate` | `dateTime` | No | Start date filter |
| `endDate` | `dateTime` | No | End date filter |
| `sortOrder` | `options` | No | Sort order |
| `limit` | `number` | No | Results per poll (default: 10) |

**Behavior:**
- Polls API at configured intervals
- Tracks last poll time automatically
- Only triggers on NEW conversions since last poll
- Returns array of new conversions

**Example Use Case:**
```
Trigger (poll every 5 minutes) →
Filter (status = completed) →
Auto-process results →
Upload to storage
```

---

## Common Patterns

### Pattern 1: Generate → Poll → Retrieve

```
Manual Trigger →
Generate Audio (returns task_id) →
Wait Node (30-60s) →
Get Conversion by ID (using task_id) →
Process Result
```

### Pattern 2: Webhook Callback

```
Manual Trigger →
Generate Audio (with webhook_url) →
Respond to Webhook →
End

(Separate Workflow)
Webhook Trigger (listens for callback) →
Process Completion Data
```

### Pattern 3: Parallel Processing

```
Manual Trigger →
├─ Denoise Audio → Wait → Get Result
└─ Extract BPM → Wait → Get Result
→ Merge Results →
Continue Processing
```

### Pattern 4: Automated Monitoring

```
MusicGPT Trigger (New Conversions) →
Filter (status = completed) →
IF (type = music_generation) →
  Auto-Master →
  Upload to S3 →
  Send Notification
```

---

## Error Handling

### Common Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| `401` | Authentication failed | Check API key validity |
| `403` | Insufficient permissions | Verify account limits |
| `404` | Resource not found | Check task_id/conversion_id |
| `422` | Invalid parameters | Verify parameter values |
| `429` | Rate limit exceeded | Add delays between requests |
| `500` | Server error | Retry with exponential backoff |

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "Voice ID not found",
    "details": {
      "parameter": "voice_id",
      "value": "invalid_voice"
    }
  }
}
```

### Best Practices

1. **Enable "Continue on Fail"** in node settings for production workflows
2. **Implement retry logic** with exponential backoff
3. **Validate inputs** before making API calls
4. **Handle timeouts** gracefully with appropriate wait times
5. **Log errors** for debugging and monitoring

---

## Examples

### Example 1: Podcast Production

```
Schedule Trigger (weekly) →
Fetch Script (HTTP Request) →
Text to Speech (generate episode) →
Wait (20s) →
Get Conversion →
Denoise Audio →
Wait (15s) →
Get Denoised →
Audio Mastering →
Wait (30s) →
Get Mastered →
Upload to Podcast Host →
Send Email Notification
```

### Example 2: Cover Song Generator API

```
Webhook (receive request) →
Search Voices (find artist voice) →
Cover Song (generate cover) →
Respond (return task_id)

(Callback workflow)
Webhook (completion callback) →
Get Conversion →
Upload to Storage →
HTTP Request (notify original requester)
```

### Example 3: Music Analysis Pipeline

```
Manual Trigger →
Read File (audio file) →
├─ Extract Key/BPM
├─ Audio Transcribe
└─ Extraction (stems)
→ Wait (parallel)
→ Merge Results →
Airtable (save metadata) →
Discord (post results)
```

---

## Additional Resources

- **API Documentation**: [https://docs.musicgpt.com](https://docs.musicgpt.com)
- **Support**: support@musicgpt.com

---

## Changelog

### v0.1.0 (Initial Release)
- 25 operations across 4 resources
- 2 trigger types
- Dynamic voice loading
- Webhook support
- Binary file handling

---

**Package**: `n8n-nodes-musicgpt`
**Version**: 0.1.0
**License**: MIT
**Last Updated**: 2025
