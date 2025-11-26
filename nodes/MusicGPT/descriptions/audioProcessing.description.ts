import { INodeProperties } from 'n8n-workflow';

const audioSourceFields = (operationName: string): INodeProperties[] => [
    {
        displayName: 'Audio Source',
        name: 'audioSource',
        type: 'options',
        options: [
            {
                name: 'URL',
                value: 'url',
            },
            {
                name: 'Binary Property',
                value: 'file',
            },
        ],
        default: 'url',
        description: 'Choose whether to provide an audio URL or use binary data from a previous node',
        displayOptions: {
            show: {
                resource: ['audioProcessing'],
                operation: [operationName],
            },
        },
    },
    {
        displayName: 'Audio URL',
        name: 'audio_url',
        type: 'string',
        default: '',
        required: true,
        placeholder: 'https://example.com/audio.mp3',
        description: 'Direct URL to the audio file to process',
        displayOptions: {
            show: {
                resource: ['audioProcessing'],
                operation: [operationName],
                audioSource: ['url'],
            },
        },
    },
    {
        displayName: 'Binary Property Name',
        name: 'audio_file',
        type: 'string',
        default: 'data',
        required: true,
        placeholder: 'data',
        description: 'Name of the binary property from the previous node containing the audio file. The previous node must output binary data (e.g., HTTP Request, Read Binary Files, Webhook).',
        hint: 'Usually "data". Ensure the previous node outputs binary file data.',
        displayOptions: {
            show: {
                resource: ['audioProcessing'],
                operation: [operationName],
                audioSource: ['file'],
            },
        },
    },
];

export const deechoFields: INodeProperties[] = [
    ...audioSourceFields('deecho'),
    {
        displayName: 'Webhook URL',
        name: 'webhook_url',
        type: 'string',
        default: '',
        placeholder: 'https://your-webhook.com/callback',
        description: 'Optional URL to receive a callback when processing is complete',
        displayOptions: {
            show: {
                resource: ['audioProcessing'],
                operation: ['deecho'],
            },
        },
    },
];

export const dereverbFields: INodeProperties[] = [
    ...audioSourceFields('dereverb'),
    {
        displayName: 'Webhook URL',
        name: 'webhook_url',
        type: 'string',
        default: '',
        placeholder: 'https://your-webhook.com/callback',
        description: 'Optional URL to receive a callback when processing is complete',
        displayOptions: {
            show: {
                resource: ['audioProcessing'],
                operation: ['dereverb'],
            },
        },
    },
];

export const audioMasteringFields: INodeProperties[] = [
    ...audioSourceFields('audioMastering'),
    {
        displayName: 'Reference Audio Source',
        name: 'referenceAudioSource',
        type: 'options',
        options: [
            {
                name: 'URL',
                value: 'url',
            },
            {
                name: 'Binary Property',
                value: 'file',
            },
        ],
        default: 'url',
        description: 'Choose whether to provide a reference audio URL or use binary data. The reference audio is used to match sonic characteristics for mastering.',
        displayOptions: {
            show: {
                resource: ['audioProcessing'],
                operation: ['audioMastering'],
            },
        },
    },
    {
        displayName: 'Reference Audio URL',
        name: 'reference_audio_url',
        type: 'string',
        default: '',
        required: true,
        placeholder: 'https://example.com/reference.mp3',
        description: 'URL to the reference audio file. The mastering will match the sonic characteristics of this track.',
        displayOptions: {
            show: {
                resource: ['audioProcessing'],
                operation: ['audioMastering'],
                referenceAudioSource: ['url'],
            },
        },
    },
    {
        displayName: 'Reference Audio Binary Property',
        name: 'reference_audio_file',
        type: 'string',
        default: 'data',
        required: true,
        placeholder: 'data',
        description: 'Name of the binary property containing the reference audio file',
        hint: 'Usually "data". Ensure the previous node outputs binary file data.',
        displayOptions: {
            show: {
                resource: ['audioProcessing'],
                operation: ['audioMastering'],
                referenceAudioSource: ['file'],
            },
        },
    },
    {
        displayName: 'Output Extension',
        name: 'output_extension',
        type: 'options',
        options: [
            {
                name: 'Same as Input',
                value: '',
            },
            {
                name: 'MP3',
                value: 'mp3',
            },
            {
                name: 'WAV',
                value: 'wav',
            },
            {
                name: 'FLAC',
                value: 'flac',
            },
            {
                name: 'OGG',
                value: 'ogg',
            },
            {
                name: 'AAC',
                value: 'aac',
            },
            {
                name: 'WEBM',
                value: 'webm',
            },
        ],
        default: '',
        description: 'Output file format for the mastered audio. Leave as "Same as Input" to keep the original format.',
        displayOptions: {
            show: {
                resource: ['audioProcessing'],
                operation: ['audioMastering'],
            },
        },
    },
    {
        displayName: 'Webhook URL',
        name: 'webhook_url',
        type: 'string',
        default: '',
        placeholder: 'https://your-webhook.com/callback',
        description: 'Optional URL to receive a callback when processing is complete',
        displayOptions: {
            show: {
                resource: ['audioProcessing'],
                operation: ['audioMastering'],
            },
        },
    },
];

export const trimAudioFields: INodeProperties[] = [
    ...audioSourceFields('trimAudio'),
    {
        displayName: 'Start Time',
        name: 'start_time',
        type: 'number',
        default: 0,
        typeOptions: {
            minValue: 0,
        },
        description: 'Start time in seconds for the audio trim',
        displayOptions: {
            show: {
                resource: ['audioProcessing'],
                operation: ['trimAudio'],
            },
        },
    },
    {
        displayName: 'End Time',
        name: 'end_time',
        type: 'number',
        default: 0,
        typeOptions: {
            minValue: 0,
        },
        description: 'End time in seconds for the audio trim',
        displayOptions: {
            show: {
                resource: ['audioProcessing'],
                operation: ['trimAudio'],
            },
        },
    },
    {
        displayName: 'Webhook URL',
        name: 'webhook_url',
        type: 'string',
        default: '',
        placeholder: 'https://your-webhook.com/callback',
        description: 'Optional URL to receive a callback when processing is complete',
        displayOptions: {
            show: {
                resource: ['audioProcessing'],
                operation: ['trimAudio'],
            },
        },
    },
];

export const changeAudioSpeedFields: INodeProperties[] = [
    ...audioSourceFields('changeAudioSpeed'),
    {
        displayName: 'Speed Factor',
        name: 'speed_factor',
        type: 'number',
        default: 1.0,
        typeOptions: {
            minValue: 0.5,
            maxValue: 2.0,
            numberPrecision: 2,
        },
        description: 'Speed multiplier for the audio. 0.5 = half speed, 2.0 = double speed.',
        displayOptions: {
            show: {
                resource: ['audioProcessing'],
                operation: ['changeAudioSpeed'],
            },
        },
    },
    {
        displayName: 'Webhook URL',
        name: 'webhook_url',
        type: 'string',
        default: '',
        placeholder: 'https://your-webhook.com/callback',
        description: 'Optional URL to receive a callback when processing is complete',
        displayOptions: {
            show: {
                resource: ['audioProcessing'],
                operation: ['changeAudioSpeed'],
            },
        },
    },
];

export const audioToMidiFields: INodeProperties[] = [
    ...audioSourceFields('audioToMidi'),
    {
        displayName: 'Webhook URL',
        name: 'webhook_url',
        type: 'string',
        default: '',
        placeholder: 'https://your-webhook.com/callback',
        description: 'Optional URL to receive a callback when processing is complete',
        displayOptions: {
            show: {
                resource: ['audioProcessing'],
                operation: ['audioToMidi'],
            },
        },
    },
];

export const extractKeyBpmFields: INodeProperties[] = [
    ...audioSourceFields('extractKeyBpm'),
    {
        displayName: 'Webhook URL',
        name: 'webhook_url',
        type: 'string',
        default: '',
        placeholder: 'https://your-webhook.com/callback',
        description: 'Optional URL to receive a callback when processing is complete',
        displayOptions: {
            show: {
                resource: ['audioProcessing'],
                operation: ['extractKeyBpm'],
            },
        },
    },
];

export const fileConvertFields: INodeProperties[] = [
    ...audioSourceFields('fileConvert'),
    {
        displayName: 'Target Format',
        name: 'target_format',
        type: 'options',
        options: [
            {
                name: 'MP3',
                value: 'mp3',
            },
            {
                name: 'WAV',
                value: 'wav',
            },
            {
                name: 'FLAC',
                value: 'flac',
            },
            {
                name: 'OGG',
                value: 'ogg',
            },
            {
                name: 'AAC',
                value: 'aac',
            },
            {
                name: 'WEBM',
                value: 'webm',
            },
        ],
        default: 'mp3',
        required: true,
        description: 'The audio format to convert to',
        displayOptions: {
            show: {
                resource: ['audioProcessing'],
                operation: ['fileConvert'],
            },
        },
    },
    {
        displayName: 'Target Sampling Rate',
        name: 'target_sr',
        type: 'options',
        options: [
            {
                name: '8000 Hz',
                value: '8000',
            },
            {
                name: '16000 Hz',
                value: '16000',
            },
            {
                name: '22050 Hz',
                value: '22050',
            },
            {
                name: '24000 Hz',
                value: '24000',
            },
            {
                name: '32000 Hz',
                value: '32000',
            },
            {
                name: '44100 Hz (CD Quality)',
                value: '44100',
            },
            {
                name: '48000 Hz (Professional)',
                value: '48000',
            },
            {
                name: '96000 Hz (High-Res)',
                value: '96000',
            },
            {
                name: '192000 Hz (Ultra High-Res)',
                value: '192000',
            },
        ],
        default: '44100',
        description: 'Target sampling rate for the converted audio',
        displayOptions: {
            show: {
                resource: ['audioProcessing'],
                operation: ['fileConvert'],
            },
        },
    },
    {
        displayName: 'Target Bit Depth',
        name: 'target_bit_depth',
        type: 'options',
        options: [
            {
                name: '16-bit (Standard)',
                value: '16',
            },
            {
                name: '24-bit (Professional)',
                value: '24',
            },
        ],
        default: '16',
        description: 'Target bit depth for the converted audio',
        displayOptions: {
            show: {
                resource: ['audioProcessing'],
                operation: ['fileConvert'],
            },
        },
    },
    {
        displayName: 'Webhook URL',
        name: 'webhook_url',
        type: 'string',
        default: '',
        placeholder: 'https://your-webhook.com/callback',
        description: 'Optional URL to receive a callback when processing is complete',
        displayOptions: {
            show: {
                resource: ['audioProcessing'],
                operation: ['fileConvert'],
            },
        },
    },
];

export const audioTranscribeFields: INodeProperties[] = [
    ...audioSourceFields('audioTranscribe'),
    {
        displayName: 'Language',
        name: 'language',
        type: 'options',
        options: [
            {
                name: 'Auto Detect',
                value: 'auto',
            },
            {
                name: 'English',
                value: 'en',
            },
            {
                name: 'Spanish',
                value: 'es',
            },
            {
                name: 'French',
                value: 'fr',
            },
            {
                name: 'German',
                value: 'de',
            },
            {
                name: 'Italian',
                value: 'it',
            },
            {
                name: 'Portuguese',
                value: 'pt',
            },
            {
                name: 'Chinese',
                value: 'zh',
            },
            {
                name: 'Japanese',
                value: 'ja',
            },
            {
                name: 'Korean',
                value: 'ko',
            },
        ],
        default: 'auto',
        description: 'The language of the audio for transcription',
        displayOptions: {
            show: {
                resource: ['audioProcessing'],
                operation: ['audioTranscribe'],
            },
        },
    },
    {
        displayName: 'Webhook URL',
        name: 'webhook_url',
        type: 'string',
        default: '',
        placeholder: 'https://your-webhook.com/callback',
        description: 'Optional URL to receive a callback when processing is complete',
        displayOptions: {
            show: {
                resource: ['audioProcessing'],
                operation: ['audioTranscribe'],
            },
        },
    },
];