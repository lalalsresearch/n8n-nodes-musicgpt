import { INodeProperties } from 'n8n-workflow';

export const getAllVoicesFields: INodeProperties[] = [
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        default: 50,
        typeOptions: {
            minValue: 1,
        },
        description: 'Max number of results to return',
        displayOptions: {
            show: {
                resource: ['search'],
                operation: ['getAllVoices'],
            },
        },
    },
    {
        displayName: 'Page',
        name: 'page',
        type: 'number',
        default: 0,
        typeOptions: {
            minValue: 0,
        },
        description: 'Page number for pagination (starts from 0)',
        displayOptions: {
            show: {
                resource: ['search'],
                operation: ['getAllVoices'],
            },
        },
    },
];

export const searchVoicesFields: INodeProperties[] = [
    {
        displayName: 'Search Query',
        name: 'query',
        type: 'string',
        default: '',
        required: true,
        placeholder: 'Justin Bieber',
        description: 'Search for voices by name',
        displayOptions: {
            show: {
                resource: ['search'],
                operation: ['searchVoices'],
            },
        },
    },
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        default: 50,
        typeOptions: {
            minValue: 1,
        },
        description: 'Max number of results to return',
        displayOptions: {
            show: {
                resource: ['search'],
                operation: ['searchVoices'],
            },
        },
    },
    {
        displayName: 'Page',
        name: 'page',
        type: 'number',
        default: 0,
        typeOptions: {
            minValue: 0,
        },
        description: 'Page number for pagination (starts from 0)',
        displayOptions: {
            show: {
                resource: ['search'],
                operation: ['searchVoices'],
            },
        },
    },
];

export const getConversionByIdFields: INodeProperties[] = [
    {
        displayName: 'Conversion Type',
        name: 'conversionType',
        type: 'options',
        options: [
            {
                name: 'Audio Cutter',
                value: 'AUDIO_CUTTER',
            },
            {
                name: 'Audio Generation',
                value: 'MUSIC_AI',
            },
            {
                name: 'Audio Mastering',
                value: 'AUDIO_MASTERING',
            },
            {
                name: 'Audio Speed Changer',
                value: 'AUDIO_SPEED_CHANGER',
            },
            {
                name: 'Audio to MIDI',
                value: 'AUDIO_TO_MIDI',
            },
            {
                name: 'Audio Transcription',
                value: 'AUDIO_TRANSCRIPTION',
            },
            {
                name: 'Cover Song',
                value: 'COVER',
            },
            {
                name: 'Deecho',
                value: 'DEECHO',
            },
            {
                name: 'Denoising',
                value: 'DENOISING',
            },
            {
                name: 'Dereverb',
                value: 'DEREVERB',
            },
            {
                name: 'Extend',
                value: 'EXTEND',
            },
            {
                name: 'Extraction',
                value: 'EXTRACTION',
            },
            {
                name: 'File Conversion',
                value: 'FILE_CONVERSION',
            },
            {
                name: 'Inpaint',
                value: 'INPAINT',
            },
            {
                name: 'Key/BPM Extraction',
                value: 'KEY_BPM_EXTRACTION',
            },
            {
                name: 'Lyrics Generator',
                value: 'LYRICS_GENERATOR',
            },
            {
                name: 'Remix',
                value: 'REMIX',
            },
            {
                name: 'Sing Over Instrumental',
                value: 'SING_OVER_INSTRUMENTAL',
            },
            {
                name: 'Sound Generator',
                value: 'SOUND_GENERATOR',
            },
            {
                name: 'Stem Separation',
                value: 'STEMS_SEPARATION',
            },
            {
                name: 'Text to Speech',
                value: 'TEXT_TO_SPEECH',
            },
            {
                name: 'Vocal Extraction',
                value: 'VOCAL_EXTRACTION',
            },
            {
                name: 'Voice Changer',
                value: 'VOICE_CONVERSION',
            },
        ],
        default: 'MUSIC_AI',
        required: true,
        description: 'Type of conversion to retrieve',
        displayOptions: {
            show: {
                resource: ['search'],
                operation: ['getConversionById'],
            },
        },
    },
    {
        displayName: 'Task ID',
        name: 'task_id',
        type: 'string',
        default: '',
        placeholder: 'task_12345',
        description: 'Unique task identifier for the conversion',
        displayOptions: {
            show: {
                resource: ['search'],
                operation: ['getConversionById'],
            },
        },
    },
    {
        displayName: 'Conversion ID',
        name: 'conversion_id',
        type: 'string',
        default: '',
        placeholder: 'conv_67890',
        description: 'Unique conversion identifier',
        displayOptions: {
            show: {
                resource: ['search'],
                operation: ['getConversionById'],
            },
        },
    },
];

export const getConversionsByUserFields: INodeProperties[] = [
    {
        displayName: 'Conversion Type',
        name: 'conversionType',
        type: 'options',
        options: [
            {
                name: 'All Types',
                value: '',
            },
            {
                name: 'Audio Cutter',
                value: 'AUDIO_CUTTER',
            },
            {
                name: 'Audio Generation',
                value: 'MUSIC_AI',
            },
            {
                name: 'Audio Mastering',
                value: 'AUDIO_MASTERING',
            },
            {
                name: 'Audio Speed Changer',
                value: 'AUDIO_SPEED_CHANGER',
            },
            {
                name: 'Audio to MIDI',
                value: 'AUDIO_TO_MIDI',
            },
            {
                name: 'Audio Transcription',
                value: 'AUDIO_TRANSCRIPTION',
            },
            {
                name: 'Cover Song',
                value: 'COVER',
            },
            {
                name: 'Deecho',
                value: 'DEECHO',
            },
            {
                name: 'Denoising',
                value: 'DENOISING',
            },
            {
                name: 'Dereverb',
                value: 'DEREVERB',
            },
            {
                name: 'Extend',
                value: 'EXTEND',
            },
            {
                name: 'Extraction',
                value: 'EXTRACTION',
            },
            {
                name: 'File Conversion',
                value: 'FILE_CONVERSION',
            },
            {
                name: 'Inpaint',
                value: 'INPAINT',
            },
            {
                name: 'Key/BPM Extraction',
                value: 'KEY_BPM_EXTRACTION',
            },
            {
                name: 'Lyrics Generator',
                value: 'LYRICS_GENERATOR',
            },
            {
                name: 'Remix',
                value: 'REMIX',
            },
            {
                name: 'Sing Over Instrumental',
                value: 'SING_OVER_INSTRUMENTAL',
            },
            {
                name: 'Sound Generator',
                value: 'SOUND_GENERATOR',
            },
            {
                name: 'Stem Separation',
                value: 'STEMS_SEPARATION',
            },
            {
                name: 'Text to Speech',
                value: 'TEXT_TO_SPEECH',
            },
            {
                name: 'Vocal Extraction',
                value: 'VOCAL_EXTRACTION',
            },
            {
                name: 'Voice Changer',
                value: 'VOICE_CONVERSION',
            },
        ],
        default: '',
        description: 'Filter by conversion type. Leave empty to retrieve all types.',
        displayOptions: {
            show: {
                resource: ['search'],
                operation: ['getConversionsByUser'],
            },
        },
    },
    {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
        default: '',
        placeholder: '2024-01-01T00:00:00Z',
        description: 'Filter conversions created after this date (ISO 8601 format)',
        displayOptions: {
            show: {
                resource: ['search'],
                operation: ['getConversionsByUser'],
            },
        },
    },
    {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
        default: '',
        placeholder: '2024-12-31T23:59:59Z',
        description: 'Filter conversions created before this date (ISO 8601 format)',
        displayOptions: {
            show: {
                resource: ['search'],
                operation: ['getConversionsByUser'],
            },
        },
    },
    {
        displayName: 'Sort Order',
        name: 'sortOrder',
        type: 'options',
        options: [
            {
                name: 'Descending (Newest First)',
                value: 'DESC',
            },
            {
                name: 'Ascending (Oldest First)',
                value: 'ASC',
            },
        ],
        default: 'DESC',
        description: 'Order in which to sort the results',
        displayOptions: {
            show: {
                resource: ['search'],
                operation: ['getConversionsByUser'],
            },
        },
    },
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        default: 50,
        typeOptions: {
            minValue: 1,
        },
        description: 'Max number of results to return',
        displayOptions: {
            show: {
                resource: ['search'],
                operation: ['getConversionsByUser'],
            },
        },
    },
    {
        displayName: 'Last Evaluated Key',
        name: 'LastEvaluatedKey',
        type: 'string',
        default: '',
        placeholder: 'key_from_previous_request',
        description: 'Pagination key from the previous request to get the next page of results',
        displayOptions: {
            show: {
                resource: ['search'],
                operation: ['getConversionsByUser'],
            },
        },
    },
];