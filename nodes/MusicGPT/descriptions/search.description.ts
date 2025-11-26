import { INodeProperties } from 'n8n-workflow';

export const getAllVoicesFields: INodeProperties[] = [
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        default: 20,
        typeOptions: {
            minValue: 1,
            maxValue: 100,
        },
        description: 'Maximum number of voices to retrieve per page',
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
        default: 20,
        typeOptions: {
            minValue: 1,
            maxValue: 100,
        },
        description: 'Maximum number of voices to retrieve per page',
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
                name: 'Voice Changer',
                value: 'voice_changer',
            },
            {
                name: 'Text to Speech',
                value: 'text_to_speech',
            },
            {
                name: 'Cover Song',
                value: 'cover_song',
            },
            {
                name: 'Audio Generation',
                value: 'audio_generation',
            },
            {
                name: 'Remix',
                value: 'remix',
            },
            {
                name: 'Extraction',
                value: 'extraction',
            },
            {
                name: 'Other',
                value: 'other',
            },
        ],
        default: 'voice_changer',
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
                name: 'Voice Changer',
                value: 'voice_changer',
            },
            {
                name: 'Text to Speech',
                value: 'text_to_speech',
            },
            {
                name: 'Cover Song',
                value: 'cover_song',
            },
            {
                name: 'Audio Generation',
                value: 'audio_generation',
            },
            {
                name: 'Remix',
                value: 'remix',
            },
            {
                name: 'Extraction',
                value: 'extraction',
            },
            {
                name: 'Other',
                value: 'other',
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
        default: 10,
        typeOptions: {
            minValue: 1,
            maxValue: 100,
        },
        description: 'Maximum number of conversions to retrieve',
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