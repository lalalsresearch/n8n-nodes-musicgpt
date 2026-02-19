import {
    IAuthenticateGeneric,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class MusicGPTApi implements ICredentialType {
    name = 'musicGptApi';
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