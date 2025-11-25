# MusicGPT n8n API Quick Reference

Quick reference guide for all operations, searches, and triggers.

## Table of Contents
- [Audio Generation](#audio-generation) (6 operations)
- [Audio Processing](#audio-processing) (9 operations)
- [Advanced Generation](#advanced-generation) (6 operations)
- [Searches](#searches) (4 operations)
- [Triggers](#triggers) (2 types)

---

## Audio Generation

| Operation | Description | Key Parameters | ETA |
|-----------|-------------|----------------|-----|
| **Generate Audio** | Create music from prompts/lyrics | prompt, music_style, lyrics, voice_id | 30-60s |
| **Text to Speech** | Convert text to speech | text, language, voice/gender | 15-25s |
| **Voice Changer** | Transform voice in audio | voice_id, pitch, remove_background | 20-40s |
| **Cover Song** | Create cover with different voice | voice_id, pitch | 40-70s |
| **Extraction** | Extract stems (vocals/instruments) | stems[], preprocessing_options[] | 40-90s |
| **Denoise** | Remove background noise | audio_url/file | 15-25s |

---

## Audio Processing

| Operation | Description | Key Parameters | ETA |
|-----------|-------------|----------------|-----|
| **Deecho** | Remove echo | audio_url/file | 20-30s |
| **Dereverb** | Remove reverb | audio_url/file | 20-30s |
| **Audio Mastering** | Master to professional quality | reference_audio, output_extension | 30-50s |
| **Trim Audio** | Cut to specific time range | start_time, end_time | 5-15s |
| **Change Audio Speed** | Adjust playback speed | speed_factor (0.5-2.0) | 10-20s |
| **Audio to MIDI** | Convert audio to MIDI | audio_url/file | 30-45s |
| **Extract Key/BPM** | Get musical key and tempo | audio_url/file | 10-20s |
| **File Convert** | Convert format/sample rate | target_format, target_sr, target_bit_depth | 15-30s |
| **Audio Transcribe** | Speech to text | language | 15-40s |

---

## Advanced Generation

| Operation | Description | Key Parameters | ETA |
|-----------|-------------|----------------|-----|
| **Remix** | AI-powered remixing | prompt, lyrics, gender | 60-120s |
| **Extend** | Extend audio duration | extend_after, prompt, lyrics | 60-100s |
| **Inpaint** | Replace audio section | start_time, end_time, prompt | 40-70s |
| **Sing Over Instrumental** | Add vocals to instrumental | lyrics, prompt, gender | 60-100s |
| **Sound Generator** | Generate sound effects | prompt, audio_length | 20-40s |
| **Prompt to Lyrics** | Generate lyrics from prompt | prompt, style | 5-15s |

---

## Searches

| Operation | Description | Key Parameters | Returns |
|-----------|-------------|----------------|---------|
| **Get All Voices** | List available voices | limit, page | voices[], total |
| **Search Voices** | Search by name | query, limit, page | voices[], match_score |
| **Get Conversion by ID** | Get specific conversion | conversionType, task_id/conversion_id | conversion{} |
| **Get Conversions by User** | Get user conversion history | conversionType, startDate, endDate, sortOrder | conversions[], LastEvaluatedKey |

---

## Triggers

| Trigger Type | Description | Use Case |
|--------------|-------------|----------|
| **Get Conversion** | Monitor specific conversion | Poll single task until complete |
| **New Conversions** | Monitor user conversions | Auto-process new completed conversions |

---

## Conversion Types

Use these values for `conversionType` parameter:

| Type | Value | Operations |
|------|-------|------------|
| Voice Changer | `voice_changer` | Voice Changer |
| Text to Speech | `text_to_speech` | Text to Speech |
| Cover Song | `cover_song` | Cover Song |
| Audio Generation | `audio_generation` | Generate Audio |
| Remix | `remix` | Remix |
| Extraction | `extraction` | Extraction |
| Other | `other` | All other operations |

---

## Available Stems

For **Extraction** operation:

| Category | Stems |
|----------|-------|
| **Vocals** | vocals, male_vocal, female_vocal, lead_vocal, back_vocal |
| **Rhythm** | drums, kick_drum, snare_drum, toms, hi_hat, ride, crash |
| **Strings** | guitar, bass, rhythm_guitar, solo_guitar, acoustic_guitar, electric_guitar, strings |
| **Keys** | piano, keys |
| **Winds** | winds |
| **Full** | instrumental (all instruments combined) |

---

## Audio Formats

Supported formats for **File Convert** and **Audio Mastering**:

| Format | Extension | Use Case |
|--------|-----------|----------|
| MP3 | `.mp3` | General purpose, web |
| WAV | `.wav` | Uncompressed, editing |
| FLAC | `.flac` | Lossless compression |
| OGG | `.ogg` | Open format, gaming |
| AAC | `.aac` | Apple/mobile devices |
| WEBM | `.webm` | Web streaming |

---

## Sample Rates

For **File Convert** operation:

| Rate | Description | Use Case |
|------|-------------|----------|
| 8000 Hz | Phone quality | Telephony |
| 16000 Hz | Voice | Voice chat |
| 22050 Hz | Low quality | Web audio |
| 24000 Hz | Low-mid quality | Streaming |
| 32000 Hz | FM radio | Broadcasting |
| 44100 Hz | CD quality | Music (standard) |
| 48000 Hz | Professional | Video, professional audio |
| 96000 Hz | High-res | Professional recording |
| 192000 Hz | Ultra high-res | Archival, mastering |

---

## Languages

For **Text to Speech** and **Audio Transcribe**:

| Language | Code |
|----------|------|
| Auto Detect | `auto` |
| English | `en` |
| Spanish | `es` |
| French | `fr` |
| German | `de` |
| Italian | `it` |
| Portuguese | `pt` |
| Chinese | `zh` |
| Japanese | `ja` |
| Korean | `ko` |

---

## Return Values

### Standard Success Response

```json
{
  "success": true,
  "task_id": "task_abc123",
  "conversion_id": "conv_xyz789",
  "eta": 30,
  "message": "Processing started"
}
```

### Conversion Status Response

```json
{
  "success": true,
  "conversion": {
    "conversion_id": "conv_xyz789",
    "task_id": "task_abc123",
    "status": "completed",
    "output_url": "https://cdn.musicgpt.com/result.mp3",
    "created_at": "2025-01-01T12:00:00Z",
    "completed_at": "2025-01-01T12:01:30Z",
    "metadata": {
      "duration": 180,
      "format": "mp3",
      "size": 4567890
    }
  }
}
```

### Error Response

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

---

## Status Values

For conversion monitoring:

| Status | Description |
|--------|-------------|
| `pending` | Queued, waiting to start |
| `processing` | Currently being processed |
| `completed` | Successfully finished |
| `failed` | Processing error occurred |
| `cancelled` | User cancelled the task |

---

## Rate Limits

Default API rate limits (check your plan):

| Plan | Requests/Minute | Concurrent Operations |
|------|----------------|----------------------|
| Free | 10 | 2 |
| Basic | 60 | 5 |
| Pro | 300 | 20 |
| Enterprise | Custom | Custom |

---

## Wait Times (Recommended)

Minimum wait times before polling for results:

| Operation Category | Wait Time |
|-------------------|-----------|
| Text to Speech | 15-20s |
| Voice Changer | 25-35s |
| Audio Processing | 15-30s |
| Music Generation | 40-60s |
| Stem Extraction | 50-90s |
| Remix/Extend | 70-120s |
| Transcription | 20-40s |

**Note**: Actual processing time depends on audio length and server load.

---

## Webhook Integration

### Setting Up Webhooks

Include `webhook_url` parameter in any operation:

```javascript
{
  "webhook_url": "https://your-domain.com/webhook/musicgpt-callback"
}
```

### Webhook Payload

```json
{
  "event": "conversion.completed",
  "task_id": "task_abc123",
  "conversion_id": "conv_xyz789",
  "status": "completed",
  "output_url": "https://cdn.musicgpt.com/result.mp3",
  "timestamp": "2025-01-01T12:01:30Z",
  "metadata": {
    "duration": 180,
    "format": "mp3"
  }
}
```

---

## Binary Data Handling

### Input Binary Data

When using `audioSource: 'file'`:

1. Previous node must output binary data
2. Set `audio_file` to binary property name (usually `"data"`)
3. Common sources:
   - HTTP Request (response as file)
   - Read Binary Files
   - Webhook (file upload)
   - Download File

### Example Workflow

```
HTTP Request (download audio) →
  └─ Response: File →
Voice Changer:
  └─ audioSource: file
  └─ audio_file: "data"
```

---

## Common Patterns

### 1. Synchronous (Wait & Poll)

```
Action → Wait (30s) → Get Conversion by ID → Process
```

### 2. Asynchronous (Webhook)

```
Action (with webhook_url) → End
(Separate) Webhook → Process Result
```

### 3. Parallel Processing

```
Input → [Branch 1, Branch 2, Branch 3] → Merge → Continue
```

### 4. Auto-Retry

```
Action → IF (status = failed) → Wait → Retry (max 3 times)
```

---

## Pagination

For **Get All Voices**, **Search Voices**, and **Get Conversions by User**:

### First Page

```javascript
{
  "limit": 20,
  "page": 0  // or omit LastEvaluatedKey
}
```

### Next Pages

```javascript
{
  "limit": 20,
  "LastEvaluatedKey": "key_from_previous_response"
}
```

---

## Best Practices

1. ✅ **Always check `success` field** in responses
2. ✅ **Use appropriate wait times** based on operation type
3. ✅ **Enable "Continue on Fail"** for production workflows
4. ✅ **Implement webhook callbacks** for long operations
5. ✅ **Cache voice lists** to reduce API calls
6. ✅ **Validate inputs** before making requests
7. ✅ **Log task_ids** for debugging
8. ✅ **Handle rate limits** with delays
9. ✅ **Monitor conversion status** regularly
10. ✅ **Clean up old conversions** periodically

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Conversion not found" | Increase wait time before polling |
| "Invalid voice_id" | Use Get All Voices to list valid IDs |
| "File too large" | Compress or split audio before processing |
| "Rate limit exceeded" | Add delays between requests |
| "Webhook timeout" | Use async pattern with callbacks |
| "Binary data error" | Ensure previous node outputs file data |
| "Authentication failed" | Verify API key in credentials |

---

## Support

- **Documentation**: [DOCUMENTATION.md](./DOCUMENTATION.md)
- **API Docs**: [https://docs.musicgpt.com](https://docs.musicgpt.com)
- **Email**: support@musicgpt.com

---

**Last Updated**: 2025-01-05
**Package Version**: 0.1.0
