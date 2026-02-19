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
        displayName: 'Voice Name or ID',
        name: 'voice_id',
        type: 'options',
        typeOptions: {
            loadOptionsMethod: 'getVoices',
        },
        default: 'none',
        description: 'Voice to use for the generated audio. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
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
        displayName: 'Output Length',
        name: 'output_length',
        type: 'number',
        default: 0,
        placeholder: '120',
        description: 'Desired output audio length in seconds (0 for default length)',
        typeOptions: {
            minValue: 0,
            maxValue: 300,
        },
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
        displayName: 'Voice Name or ID',
        name: 'voice_id',
        type: 'options',
        typeOptions: {
            loadOptionsMethod: 'getVoices',
        },
        default: 'none',
        description: 'Voice to use for speech generation. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
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
            { name: 'Chinese', value: 'zh' },
            { name: 'English', value: 'en' },
            { name: 'French', value: 'fr' },
            { name: 'German', value: 'de' },
            { name: 'Italian', value: 'it' },
            { name: 'Japanese', value: 'ja' },
            { name: 'Korean', value: 'ko' },
            { name: 'Portuguese', value: 'pt' },
            { name: 'Spanish', value: 'es' },
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
        displayName: 'Voice Name or ID',
        name: 'voice_id',
        type: 'options',
        typeOptions: {
            loadOptionsMethod: 'getVoicesRequired',
        },
        default: '',
        required: true,
        description: 'Voice to transform the audio to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
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
        type: 'boolean',
        default: false,
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
        displayName: 'Voice Name or ID',
        name: 'voice_id',
        type: 'options',
        typeOptions: {
            loadOptionsMethod: 'getVoicesRequired',
        },
        default: '',
        required: true,
        description: 'Voice to use for the cover. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
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
            { name: 'Acoustic Guitar', value: 'acoustic_guitar' },
            { name: 'Back Vocal', value: 'back_vocal' },
            { name: 'Bass', value: 'bass' },
            { name: 'Crash', value: 'crash' },
            { name: 'Drums', value: 'drums' },
            { name: 'Electric Guitar', value: 'electric_guitar' },
            { name: 'Female Vocal', value: 'female_vocal' },
            { name: 'Guitar', value: 'guitar' },
            { name: 'Hi-Hat', value: 'hi_hat' },
            { name: 'Instrumental', value: 'instrumental' },
            { name: 'Keys', value: 'keys' },
            { name: 'Kick Drum', value: 'kick_drum' },
            { name: 'Lead Vocal', value: 'lead_vocal' },
            { name: 'Male Vocal', value: 'male_vocal' },
            { name: 'Piano', value: 'piano' },
            { name: 'Rhythm Guitar', value: 'rhythm_guitar' },
            { name: 'Ride', value: 'ride' },
            { name: 'Snare Drum', value: 'snare_drum' },
            { name: 'Solo Guitar', value: 'solo_guitar' },
            { name: 'Strings', value: 'strings' },
            { name: 'Toms', value: 'toms' },
            { name: 'Vocals', value: 'vocals' },
            { name: 'Winds', value: 'winds' },
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