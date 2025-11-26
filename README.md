# n8n-nodes-musicgpt

Official n8n community node for [MusicGPT](https://musicgpt.com) - AI-powered audio processing, music generation, and voice transformation.

[![npm version](https://img.shields.io/npm/v/n8n-nodes-musicgpt)](https://www.npmjs.com/package/n8n-nodes-musicgpt)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n community node](https://img.shields.io/badge/n8n-community--node-orange)](https://n8n.io)

## Features

- 🎵 **Audio Generation**: Create music from text prompts or lyrics
- 🎙️ **Text-to-Speech**: Convert text to natural-sounding speech in 10+ languages
- 🎤 **Voice Transformation**: Change voices in audio files with 100+ voice options
- 🎸 **Stem Separation**: Extract vocals, instruments, and 20+ individual stems
- 🎛️ **Audio Processing**: Denoise, deecho, dereverb, master, trim, speed, convert
- 🎹 **Advanced Generation**: Remix, extend, inpaint, add vocals, generate sound effects
- 🔍 **Voice Search**: Find and list available voices dynamically
- ⚡ **Triggers**: Monitor conversions and automate workflows
- 🌐 **Webhook Support**: Async processing with callbacks
- 📦 **Binary File Handling**: Process files from previous nodes seamlessly

## Quick Start

### Installation

#### Via n8n Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings** → **Community Nodes**
3. Click **Install**
4. Enter: `n8n-nodes-musicgpt`
5. Click **Install**

#### Via npm (Self-Hosted)

```bash
cd ~/.n8n/nodes
npm install n8n-nodes-musicgpt
```

### Setup Credentials

1. Get your API key from [musicgpt.com](https://musicgpt.com)
2. In n8n, go to **Credentials** → **New**
3. Search for "MusicGPT API"
4. Enter your API key

### Your First Workflow

```
Manual Trigger →
MusicGPT (Generate Audio):
  - Prompt: "Upbeat electronic dance music"
→ Wait (45 seconds) →
MusicGPT (Get Conversion by ID) →
Process result
```

## Operations Overview

### 📦 What's Included

- **1 Action Node**: MusicGPT (25 operations across 4 resources)
- **1 Trigger Node**: MusicGPT Trigger (2 trigger types)

### Audio Generation (6 operations)

| Operation | Description | Processing Time |
|-----------|-------------|----------------|
| **Generate Audio** | Create music from prompts or lyrics | 30-60s |
| **Text to Speech** | Convert text to speech (10+ languages) | 15-25s |
| **Voice Changer** | Transform voices in audio | 20-40s |
| **Cover Song** | Create AI covers with different voices | 40-70s |
| **Extraction** | Separate 20+ stems (vocals, instruments, etc.) | 40-90s |
| **Denoise** | Remove background noise | 15-25s |

### Audio Processing (9 operations)

| Operation | Description | Processing Time |
|-----------|-------------|----------------|
| **Deecho** | Remove echo | 20-30s |
| **Dereverb** | Remove reverb | 20-30s |
| **Audio Mastering** | Master to professional quality | 30-50s |
| **Trim Audio** | Cut to time range | 5-15s |
| **Change Speed** | Adjust playback speed | 10-20s |
| **Audio to MIDI** | Convert to MIDI notation | 30-45s |
| **Extract Key/BPM** | Detect key and tempo | 10-20s |
| **File Convert** | Convert formats/sample rates | 15-30s |
| **Transcribe** | Speech to text (10+ languages) | 15-40s |

### Advanced Generation (6 operations)

| Operation | Description | Processing Time |
|-----------|-------------|----------------|
| **Remix** | AI-powered remixing | 60-120s |
| **Extend** | Extend audio duration | 60-100s |
| **Inpaint** | Replace audio sections | 40-70s |
| **Sing Over Instrumental** | Add vocals to instrumentals | 60-100s |
| **Sound Generator** | Generate sound effects | 20-40s |
| **Prompt to Lyrics** | Generate lyrics | 5-15s |

### Searches (4 operations)

| Operation | Description |
|-----------|-------------|
| **Get All Voices** | List available voices with pagination |
| **Search Voices** | Search voices by name |
| **Get Conversion by ID** | Check status and retrieve results |
| **Get Conversions by User** | Get user history with filters |

### Triggers (2 types)

| Trigger | Description |
|---------|-------------|
| **Get Conversion** | Poll specific conversion until complete |
| **New Conversions** | Trigger on new user conversions |

## Documentation

| Resource | Description |
|----------|-------------|
| **[Full Documentation](./DOCUMENTATION.md)** | Complete API reference with parameters, examples, and patterns |
| **[Quick Reference](./API-REFERENCE.md)** | Fast lookup for all operations and parameters |

## Usage Examples

### Example 1: Text-to-Speech Podcast Generator

```
Schedule Trigger (weekly) →
Fetch Script (HTTP Request) →
Text to Speech:
  - Text: {{ $json.script }}
  - Language: English
  - Voice: Professional narrator
→ Wait (20s) →
Get Conversion →
Upload to Podcast Host →
Notify Team (Slack)
```

### Example 2: AI Cover Song API

```
Webhook (receive song URL + artist) →
Search Voices (find artist voice) →
Cover Song (generate with voice) →
Respond (task_id)

(Separate Webhook)
Completion Callback →
Upload to Storage →
Notify User
```

### Example 3: Audio Processing Pipeline

```
File Upload Trigger →
Parallel Processing:
  ├─ Denoise
  ├─ Extract Key/BPM
  └─ Transcribe
→ Merge Results →
Audio Mastering →
Save to Database
```

### Example 4: Music Production Workflow

```
Manual Trigger →
Generate Audio (from lyrics) →
Wait (45s) →
Get Conversion →
Extraction (separate stems) →
Wait (60s) →
Remix (transform style) →
Download & Archive
```

### Example 5: Automated Content Creation

```
MusicGPT Trigger (New Conversions) →
Filter (music_generation, completed) →
Auto-Master Audio →
Convert to Multiple Formats →
Upload to CDN →
Update Database →
Email Notification
```

## Supported Formats & Features

### Audio Formats
- **Input**: MP3, WAV, FLAC, OGG, AAC, WEBM, M4A
- **Output**: MP3, WAV, FLAC, OGG, AAC, WEBM

### Languages (TTS & Transcription)
English, Spanish, French, German, Italian, Portuguese, Chinese, Japanese, Korean, Auto-detect

### Available Stems (Extraction)
- **Vocals**: vocals, male_vocal, female_vocal, lead_vocal, back_vocal
- **Rhythm**: drums, kick, snare, toms, hi-hat, ride, crash
- **Strings**: guitar, bass, rhythm_guitar, solo_guitar, acoustic_guitar, electric_guitar
- **Keys**: piano, keys, strings, winds
- **Full**: instrumental (all instruments)

### Sample Rates
8kHz, 16kHz, 22.05kHz, 24kHz, 32kHz, 44.1kHz (CD), 48kHz (Pro), 96kHz (Hi-Res), 192kHz (Ultra)

## Advanced Features

### Webhook Callbacks

Enable async processing for long operations:

```javascript
{
  "webhook_url": "https://your-webhook.com/callback"
}
```

Receive completion notifications:
```json
{
  "event": "conversion.completed",
  "task_id": "task_abc123",
  "status": "completed",
  "output_url": "https://cdn.musicgpt.com/result.mp3"
}
```

### Binary File Processing

Process files from previous nodes:

```
HTTP Request (download) →
  └─ Response: File
MusicGPT:
  └─ Audio Source: File
  └─ Binary Property: "data"
```

### Dynamic Voice Loading

Voice selection fields dynamically load 100+ available voices from the API, with search and filter capabilities.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Authentication failed" | Verify API key in credentials |
| "Conversion not found" | Increase wait time (operations vary: 15s-120s) |
| "Invalid voice_id" | Use "Get All Voices" to see valid IDs |
| "File too large" | Compress or split audio files |
| "Rate limit exceeded" | Add delays between requests or upgrade plan |
| "Binary data error" | Ensure previous node outputs file data |

## Contributing

Contributions are welcome! See the [GitHub repository](https://github.com/lalalsresearch/n8n-nodes-musicgpt) for development setup and guidelines.

## Support

- **📖 Documentation**: [DOCUMENTATION.md](./DOCUMENTATION.md)
- **⚡ Quick Reference**: [API-REFERENCE.md](./API-REFERENCE.md)
- **💬 Community**: [n8n Forum](https://community.n8n.io)
- **📧 Email**: support@musicgpt.com

## Resources

- **MusicGPT API Docs**: [docs.musicgpt.com](https://docs.musicgpt.com)
- **n8n Documentation**: [docs.n8n.io](https://docs.n8n.io)
- **Creating n8n Nodes**: [docs.n8n.io/integrations/creating-nodes](https://docs.n8n.io/integrations/creating-nodes/)
- **n8n Community**: [community.n8n.io](https://community.n8n.io)

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Credits

- **MusicGPT API**: [musicgpt.com](https://musicgpt.com)
- **n8n Platform**: [n8n.io](https://n8n.io)

---

**Made with ❤️ for the n8n community**
