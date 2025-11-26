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
                resource: ['advancedGeneration'],
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
                resource: ['advancedGeneration'],
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
                resource: ['advancedGeneration'],
                operation: [operationName],
                audioSource: ['file'],
            },
        },
    },
];

export const remixFields: INodeProperties[] = [
    ...audioSourceFields('remix'),
    {
        displayName: 'Prompt',
        name: 'prompt',
        type: 'string',
        default: '',
        typeOptions: {
            rows: 3,
        },
        placeholder: 'Turn this into an upbeat electronic track',
        description: 'Describe how you want the audio to be transformed',
        displayOptions: {
            show: {
                resource: ['advancedGeneration'],
                operation: ['remix'],
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
        placeholder: 'Optional: Provide lyrics for the remix',
        description: 'Lyrics to use in the remixed version',
        displayOptions: {
            show: {
                resource: ['advancedGeneration'],
                operation: ['remix'],
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
                value: 'male',
            },
            {
                name: 'Female',
                value: 'female',
            },
            {
                name: 'Neutral',
                value: 'neutral',
            },
        ],
        default: 'neutral',
        description: 'Preferred gender for the vocals',
        displayOptions: {
            show: {
                resource: ['advancedGeneration'],
                operation: ['remix'],
            },
        },
    },
    {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        default: '',
        placeholder: 'My Remix',
        description: 'Title for the remixed track',
        displayOptions: {
            show: {
                resource: ['advancedGeneration'],
                operation: ['remix'],
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
                resource: ['advancedGeneration'],
                operation: ['remix'],
            },
        },
    },
];

export const extendFields: INodeProperties[] = [
    ...audioSourceFields('extend'),
    {
        displayName: 'Extend After (seconds)',
        name: 'extend_after',
        type: 'number',
        default: 30,
        required: true,
        typeOptions: {
            minValue: 0,
            maxValue: 300,
        },
        description: 'Timestamp in seconds after which to extend the audio',
        displayOptions: {
            show: {
                resource: ['advancedGeneration'],
                operation: ['extend'],
            },
        },
    },
    {
        displayName: 'Prompt',
        name: 'prompt',
        type: 'string',
        default: '',
        typeOptions: {
            rows: 3,
        },
        placeholder: 'Continue with the same energy and style',
        description: 'Describe how the extension should sound (optional, max 280 characters)',
        displayOptions: {
            show: {
                resource: ['advancedGeneration'],
                operation: ['extend'],
            },
        },
    },
    {
        displayName: 'Lyrics',
        name: 'lyrics',
        type: 'string',
        default: '',
        typeOptions: {
            rows: 4,
        },
        placeholder: 'Enter lyrics for the extended section...',
        description: 'Optional lyrics for the extended audio segment (max 2000 characters)',
        displayOptions: {
            show: {
                resource: ['advancedGeneration'],
                operation: ['extend'],
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
                value: 'male',
            },
            {
                name: 'Female',
                value: 'female',
            },
            {
                name: 'Neutral',
                value: 'neutral',
            },
        ],
        default: 'neutral',
        description: 'Voice gender for generated vocals in the extension',
        displayOptions: {
            show: {
                resource: ['advancedGeneration'],
                operation: ['extend'],
            },
        },
    },
    {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        default: '',
        placeholder: 'My Extended Track',
        description: 'Optional title for the extended audio',
        displayOptions: {
            show: {
                resource: ['advancedGeneration'],
                operation: ['extend'],
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
                resource: ['advancedGeneration'],
                operation: ['extend'],
            },
        },
    },
];

export const inpaintFields: INodeProperties[] = [
    ...audioSourceFields('inpaint'),
    {
        displayName: 'Start Time',
        name: 'start_time',
        type: 'number',
        default: 0,
        typeOptions: {
            minValue: 0,
        },
        description: 'Start time in seconds for the inpainting region',
        displayOptions: {
            show: {
                resource: ['advancedGeneration'],
                operation: ['inpaint'],
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
        description: 'End time in seconds for the inpainting region',
        displayOptions: {
            show: {
                resource: ['advancedGeneration'],
                operation: ['inpaint'],
            },
        },
    },
    {
        displayName: 'Prompt',
        name: 'prompt',
        type: 'string',
        default: '',
        typeOptions: {
            rows: 3,
        },
        placeholder: 'Replace with smooth transition',
        description: 'Describe what should fill the inpainted region',
        displayOptions: {
            show: {
                resource: ['advancedGeneration'],
                operation: ['inpaint'],
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
                resource: ['advancedGeneration'],
                operation: ['inpaint'],
            },
        },
    },
];

export const singOverInstrumentalFields: INodeProperties[] = [
    ...audioSourceFields('singOverInstrumental'),
    {
        displayName: 'Lyrics',
        name: 'lyrics',
        type: 'string',
        default: '',
        required: true,
        typeOptions: {
            rows: 5,
        },
        placeholder: 'Enter the lyrics you want to sing over the instrumental...',
        description: 'Lyrics that will be sung over the instrumental track. The AI will generate vocals singing these lyrics.',
        displayOptions: {
            show: {
                resource: ['advancedGeneration'],
                operation: ['singOverInstrumental'],
            },
        },
    },
    {
        displayName: 'Prompt',
        name: 'prompt',
        type: 'string',
        default: '',
        typeOptions: {
            rows: 3,
        },
        placeholder: 'Sing in a soulful R&B tone like Adele',
        description: 'Optional: Describe the singing style, genre, or vocal characteristics (max 280 characters)',
        displayOptions: {
            show: {
                resource: ['advancedGeneration'],
                operation: ['singOverInstrumental'],
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
                value: 'male',
            },
            {
                name: 'Female',
                value: 'female',
            },
            {
                name: 'Neutral',
                value: 'neutral',
            },
        ],
        default: 'neutral',
        description: 'Voice gender for the generated vocals',
        displayOptions: {
            show: {
                resource: ['advancedGeneration'],
                operation: ['singOverInstrumental'],
            },
        },
    },
    {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        default: '',
        placeholder: 'My Song Title',
        description: 'Optional title for the generated song',
        displayOptions: {
            show: {
                resource: ['advancedGeneration'],
                operation: ['singOverInstrumental'],
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
                resource: ['advancedGeneration'],
                operation: ['singOverInstrumental'],
            },
        },
    },
];

export const soundGeneratorFields: INodeProperties[] = [
    {
        displayName: 'Prompt',
        name: 'prompt',
        type: 'string',
        default: '',
        required: true,
        typeOptions: {
            rows: 4,
        },
        placeholder: 'A dog barking in a park, birds chirping in the background',
        description: 'Describe the sound or audio scene you want to generate',
        displayOptions: {
            show: {
                resource: ['advancedGeneration'],
                operation: ['soundGenerator'],
            },
        },
    },
    {
        displayName: 'Audio Length',
        name: 'audio_length',
        type: 'number',
        default: 5,
        description: 'Duration of the generated sound in seconds',
        displayOptions: {
            show: {
                resource: ['advancedGeneration'],
                operation: ['soundGenerator'],
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
                resource: ['advancedGeneration'],
                operation: ['soundGenerator'],
            },
        },
    },
];

export const promptToLyricsFields: INodeProperties[] = [
    {
        displayName: 'Prompt',
        name: 'prompt',
        type: 'string',
        default: '',
        required: true,
        typeOptions: {
            rows: 4,
        },
        placeholder: 'A hopeful song about starting over',
        description: 'Describe the theme or idea you want lyrics for',
        displayOptions: {
            show: {
                resource: ['advancedGeneration'],
                operation: ['promptToLyrics'],
            },
        },
    },
    {
        displayName: 'Style',
        name: 'style',
        type: 'string',
        default: '',
        placeholder: 'Pop, Country, Hip-Hop',
        description: 'Optional: Specify a musical style or genre for the lyrics',
        displayOptions: {
            show: {
                resource: ['advancedGeneration'],
                operation: ['promptToLyrics'],
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
                resource: ['advancedGeneration'],
                operation: ['promptToLyrics'],
            },
        },
    },
];