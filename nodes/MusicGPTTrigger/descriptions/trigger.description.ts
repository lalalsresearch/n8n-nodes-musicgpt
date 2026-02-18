import { INodeProperties } from 'n8n-workflow';

export const getConversionByIdFields: INodeProperties[] = [
    {
        displayName: 'Conversion Type',
        name: 'conversionType',
        type: 'options',
        options: [
            {
                name: 'Audio Generation',
                value: 'audio_generation',
            },
            {
                name: 'Cover Song',
                value: 'cover_song',
            },
            {
                name: 'Extraction',
                value: 'extraction',
            },
            {
                name: 'Other',
                value: 'other',
            },
            {
                name: 'Remix',
                value: 'remix',
            },
            {
                name: 'Text to Speech',
                value: 'text_to_speech',
            },
            {
                name: 'Voice Changer',
                value: 'voice_changer',
            },
        ],
        default: 'voice_changer',
        required: true,
        description: 'Type of conversion to monitor',
        displayOptions: {
            show: {
                triggerOn: ['getConversionById'],
            },
        },
    },
    {
        displayName: 'Task ID',
        name: 'task_id',
        type: 'string',
        default: '',
        placeholder: 'task_12345',
        description: 'Unique task identifier to monitor for completion',
        displayOptions: {
            show: {
                triggerOn: ['getConversionById'],
            },
        },
    },
    {
        displayName: 'Conversion ID',
        name: 'conversion_id',
        type: 'string',
        default: '',
        placeholder: 'conv_67890',
        description: 'Unique conversion identifier to monitor',
        displayOptions: {
            show: {
                triggerOn: ['getConversionById'],
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
                name: 'Audio Generation',
                value: 'audio_generation',
            },
            {
                name: 'Cover Song',
                value: 'cover_song',
            },
            {
                name: 'Extraction',
                value: 'extraction',
            },
            {
                name: 'Other',
                value: 'other',
            },
            {
                name: 'Remix',
                value: 'remix',
            },
            {
                name: 'Text to Speech',
                value: 'text_to_speech',
            },
            {
                name: 'Voice Changer',
                value: 'voice_changer',
            },
        ],
        default: '',
        description: 'Filter by conversion type. Leave empty to monitor all types.',
        displayOptions: {
            show: {
                triggerOn: ['getConversionsByUser'],
            },
        },
    },
    {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
        default: '',
        placeholder: '2024-01-01T00:00:00Z',
        description: 'Only trigger for conversions created after this date (ISO 8601 format)',
        displayOptions: {
            show: {
                triggerOn: ['getConversionsByUser'],
            },
        },
    },
    {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
        default: '',
        placeholder: '2024-12-31T23:59:59Z',
        description: 'Only trigger for conversions created before this date (ISO 8601 format)',
        displayOptions: {
            show: {
                triggerOn: ['getConversionsByUser'],
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
        description: 'Order in which to check for new conversions',
        displayOptions: {
            show: {
                triggerOn: ['getConversionsByUser'],
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
        description: 'Number of results to return',
        displayOptions: {
            show: {
                triggerOn: ['getConversionsByUser'],
            },
        },
    },
    {
        displayName: 'Last Evaluated Key',
        name: 'LastEvaluatedKey',
        type: 'string',
								typeOptions: { password: true },
        default: '',
        placeholder: 'key_from_previous_poll',
        description: 'Pagination key to continue from previous poll',
        displayOptions: {
            show: {
                triggerOn: ['getConversionsByUser'],
            },
        },
    },
];