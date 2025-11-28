import {
    IAuthenticateGeneric,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class MusicGPTApi implements ICredentialType {
    name = 'musicGPTApi';
    displayName = 'MusicGPT API';
    documentationUrl = 'https://docs.musicgpt.com';
    properties: INodeProperties[] = [
        {
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string',
            typeOptions: {
                password: true,
            },
            default: '',
            required: true,
            description: 'Your MusicGPT API key. Find it in your account settings.',
        },
        {
            displayName: 'API Base URL',
            name: 'baseUrl',
            type: 'string',
            default: 'https://api.musicgpt.com',
            placeholder: 'https://api.musicgpt.com',
            description: 'The base URL for the MusicGPT API. Leave empty to use default (https://api.musicgpt.com).',
        },
    ];

    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                Authorization: '={{$credentials.apiKey}}',
            },
        },
    };

    test: ICredentialTestRequest = {
        request: {
            baseURL: 'https://api.musicgpt.com',
            url: '/api/public/v1/',
            method: 'GET',
        },
    };
}