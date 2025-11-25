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
                name: 'File Upload',
                value: 'file',
            },
        ],
        default: 'url',
        description: 'Choose whether to provide an audio URL or upload a file',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
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
        description: 'URL of the audio file to process',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: [operationName],
                audioSource: ['url'],
            },
        },
    },
    {
        displayName: 'Audio File',
        name: 'audio_file',
        type: 'string',
        default: 'data',
        required: true,
        description: 'Binary property containing the audio file',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: [operationName],
                audioSource: ['file'],
            },
        },
    },
];

export const generateAudioFields: INodeProperties[] = [
    {
        displayName: 'Generation Mode',
        name: 'generationMode',
        type: 'options',
        options: [
            {
                name: 'Custom (Lyrics + Style)',
                value: 'custom',
            },
            {
                name: 'Prompt',
                value: 'prompt',
            },
        ],
        default: 'prompt',
        description: 'Choose between custom lyrics with style or prompt-based generation',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['generateAudio'],
            },
        },
    },
    {
        displayName: 'Prompt',
        name: 'prompt',
        type: 'string',
        default: '',
        required: true,
        typeOptions: {
            rows: 4,
        },
        placeholder: 'A upbeat pop song about summer',
        description: 'Describe the music you want to generate',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['generateAudio'],
                generationMode: ['prompt'],
            },
        },
    },
    {
        displayName: 'Music Style',
        name: 'music_style',
        type: 'string',
        default: '',
        required: true,
        placeholder: 'pop, rock, classical',
        description: 'Style of music to generate',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['generateAudio'],
                generationMode: ['custom'],
            },
        },
    },
    {
        displayName: 'Lyrics',
        name: 'lyrics',
        type: 'string',
        default: '',
        typeOptions: {
            rows: 6,
        },
        placeholder: 'Enter your song lyrics here...',
        description: 'Custom lyrics for the song',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['generateAudio'],
                generationMode: ['custom'],
            },
        },
    },
    {
        displayName: 'Make Instrumental',
        name: 'make_instrumental',
        type: 'boolean',
        default: false,
        description: 'Whether to generate an instrumental version (no vocals)',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['generateAudio'],
            },
        },
    },
    {
        displayName: 'Vocal Only',
        name: 'vocal_only',
        type: 'boolean',
        default: false,
        description: 'Whether to generate vocals only (no instrumental)',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['generateAudio'],
            },
        },
    },
    {
        displayName: 'Voice',
        name: 'voice_id',
        type: 'options',
        typeOptions: {
            loadOptionsMethod: 'getVoices',
        },
        default: 'none',
        description: 'Voice to use for the generated audio',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['generateAudio'],
            },
        },
    },
    {
        displayName: 'Negative Tags',
        name: 'negative_tags',
        type: 'string',
        default: '',
        placeholder: 'sad, slow',
        description: 'Tags or themes to avoid in the generated music',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['generateAudio'],
            },
        },
    },
    {
        displayName: 'Webhook URL',
        name: 'webhook_url',
        type: 'string',
        default: '',
        placeholder: 'https://your-webhook.com/callback',
        description: 'URL to receive completion notification',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['generateAudio'],
            },
        },
    },
];

export const textToSpeechFields: INodeProperties[] = [
    {
        displayName: 'Text',
        name: 'text',
        type: 'string',
        default: '',
        required: true,
        typeOptions: {
            rows: 4,
        },
        placeholder: 'Enter the text to convert to speech...',
        description: 'Text to convert to speech',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['textToSpeech'],
            },
        },
    },
    {
        displayName: 'Voice Selection',
        name: 'voiceSelection',
        type: 'options',
        options: [
            {
                name: 'Use Gender',
                value: 'gender',
            },
            {
                name: 'Use Specific Voice',
                value: 'voice',
            },
        ],
        default: 'gender',
        description: 'How to select voice for speech generation',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['textToSpeech'],
            },
        },
    },
    {
        displayName: 'Voice',
        name: 'voice_id',
        type: 'options',
        typeOptions: {
            loadOptionsMethod: 'getVoices',
        },
        default: 'none',
        description: 'Voice to use for speech generation',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['textToSpeech'],
                voiceSelection: ['voice'],
            },
        },
    },
    {
        displayName: 'Gender',
        name: 'gender',
        type: 'options',
        options: [
            {
                name: 'Male',
                value: 'm',
            },
            {
                name: 'Female',
                value: 'f',
            },
        ],
        default: 'm',
        description: 'Gender of the voice',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['textToSpeech'],
                voiceSelection: ['gender'],
            },
        },
    },
    {
        displayName: 'Language',
        name: 'language',
        type: 'options',
        options: [
            { name: 'Auto Detect', value: 'auto' },
            { name: 'English', value: 'en' },
            { name: 'Spanish', value: 'es' },
            { name: 'French', value: 'fr' },
            { name: 'German', value: 'de' },
            { name: 'Italian', value: 'it' },
            { name: 'Portuguese', value: 'pt' },
            { name: 'Chinese', value: 'zh' },
            { name: 'Japanese', value: 'ja' },
            { name: 'Korean', value: 'ko' },
        ],
        default: 'auto',
        description: 'Language of the text',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['textToSpeech'],
            },
        },
    },
    {
        displayName: 'Webhook URL',
        name: 'webhook_url',
        type: 'string',
        default: '',
        placeholder: 'https://your-webhook.com/callback',
        description: 'URL to receive completion notification',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['textToSpeech'],
            },
        },
    },
];

export const voiceChangerFields: INodeProperties[] = [
    ...audioSourceFields('voiceChanger'),
    {
        displayName: 'Voice',
        name: 'voice_id',
        type: 'options',
        typeOptions: {
            loadOptionsMethod: 'getVoicesRequired',
        },
        default: '',
        required: true,
        description: 'Voice to transform the audio to',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['voiceChanger'],
            },
        },
    },
    {
        displayName: 'Remove Background',
        name: 'remove_background',
        type: 'options',
        options: [
            {
                name: 'No',
                value: 0,
            },
            {
                name: 'Yes',
                value: 1,
            },
        ],
        default: 0,
        description: 'Whether to remove background noise',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['voiceChanger'],
            },
        },
    },
    {
        displayName: 'Pitch',
        name: 'pitch',
        type: 'number',
        default: 0,
        typeOptions: {
            minValue: -12,
            maxValue: 12,
        },
        description: 'Pitch adjustment (-12 to 12, 0 = no change)',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['voiceChanger'],
            },
        },
    },
    {
        displayName: 'Webhook URL',
        name: 'webhook_url',
        type: 'string',
        default: '',
        placeholder: 'https://your-webhook.com/callback',
        description: 'URL to receive completion notification',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['voiceChanger'],
            },
        },
    },
];

export const coverSongFields: INodeProperties[] = [
    ...audioSourceFields('coverSong'),
    {
        displayName: 'Voice',
        name: 'voice_id',
        type: 'options',
        typeOptions: {
            loadOptionsMethod: 'getVoicesRequired',
        },
        default: '',
        required: true,
        description: 'Voice to use for the cover',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['coverSong'],
            },
        },
    },
    {
        displayName: 'Pitch',
        name: 'pitch',
        type: 'number',
        default: 0,
        typeOptions: {
            minValue: -12,
            maxValue: 12,
        },
        description: 'Pitch adjustment (-12 to 12, 0 = no change)',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['coverSong'],
            },
        },
    },
    {
        displayName: 'Webhook URL',
        name: 'webhook_url',
        type: 'string',
        default: '',
        placeholder: 'https://your-webhook.com/callback',
        description: 'URL to receive completion notification',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['coverSong'],
            },
        },
    },
];

export const extractionFields: INodeProperties[] = [
    ...audioSourceFields('extraction'),
    {
        displayName: 'Stems to Extract',
        name: 'stems',
        type: 'multiOptions',
        options: [
            { name: 'Vocals', value: 'vocals' },
            { name: 'Instrumental', value: 'instrumental' },
            { name: 'Male Vocal', value: 'male_vocal' },
            { name: 'Female Vocal', value: 'female_vocal' },
            { name: 'Lead Vocal', value: 'lead_vocal' },
            { name: 'Back Vocal', value: 'back_vocal' },
            { name: 'Bass', value: 'bass' },
            { name: 'Drums', value: 'drums' },
            { name: 'Guitar', value: 'guitar' },
            { name: 'Piano', value: 'piano' },
            { name: 'Keys', value: 'keys' },
            { name: 'Strings', value: 'strings' },
            { name: 'Winds', value: 'winds' },
            { name: 'Rhythm Guitar', value: 'rhythm_guitar' },
            { name: 'Solo Guitar', value: 'solo_guitar' },
            { name: 'Acoustic Guitar', value: 'acoustic_guitar' },
            { name: 'Electric Guitar', value: 'electric_guitar' },
            { name: 'Kick Drum', value: 'kick_drum' },
            { name: 'Snare Drum', value: 'snare_drum' },
            { name: 'Toms', value: 'toms' },
            { name: 'Hi-Hat', value: 'hi_hat' },
            { name: 'Ride', value: 'ride' },
            { name: 'Crash', value: 'crash' },
        ],
        default: ['vocals'],
        description: 'Audio stems to extract',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['extraction'],
            },
        },
    },
    {
        displayName: 'Preprocessing Options',
        name: 'preprocessing_options',
        type: 'multiOptions',
        options: [
            { name: 'Denoise', value: 'Denoise' },
            { name: 'Deecho', value: 'Deecho' },
            { name: 'Dereverb', value: 'Dereverb' },
        ],
        default: [],
        description: 'Preprocessing steps to apply before extraction',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['extraction'],
            },
        },
    },
    {
        displayName: 'Webhook URL',
        name: 'webhook_url',
        type: 'string',
        default: '',
        placeholder: 'https://your-webhook.com/callback',
        description: 'URL to receive completion notification',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['extraction'],
            },
        },
    },
];

export const denoiseFields: INodeProperties[] = [
    ...audioSourceFields('denoise'),
    {
        displayName: 'Webhook URL',
        name: 'webhook_url',
        type: 'string',
        default: '',
        placeholder: 'https://your-webhook.com/callback',
        description: 'URL to receive completion notification',
        displayOptions: {
            show: {
                resource: ['audioGeneration'],
                operation: ['denoise'],
            },
        },
    },
];