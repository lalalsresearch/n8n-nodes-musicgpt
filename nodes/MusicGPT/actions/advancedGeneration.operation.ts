import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { apiRequest } from '../transport';

async function prepareAudioData(
    this: IExecuteFunctions,
    index: number,
): Promise<{ audio_url?: string; audio_file?: Buffer; audio_filename?: string }> {
    const audioSource = this.getNodeParameter('audioSource', index, 'url') as string;

    if (audioSource === 'url') {
        const audio_url = this.getNodeParameter('audio_url', index) as string;
        return { audio_url };
    } else {
        const binaryPropertyName = this.getNodeParameter('audio_file', index) as string;
        const binaryData = this.helpers.assertBinaryData(index, binaryPropertyName);

        let audio_file: Buffer;
        if (binaryData.data) {
            audio_file = Buffer.from(binaryData.data, 'base64');
        } else {
            audio_file = await this.helpers.getBinaryDataBuffer(index, binaryPropertyName);
        }

        return {
            audio_file,
            audio_filename: binaryData.fileName || 'audio.mp3',
        };
    }
}

export async function remix(
    this: IExecuteFunctions,
    index: number,
): Promise<INodeExecutionData[]> {
    const audioData = await prepareAudioData.call(this, index);
    const prompt = this.getNodeParameter('prompt', index, '') as string;
    const lyrics = this.getNodeParameter('lyrics', index, '') as string;
    const gender = this.getNodeParameter('gender', index, 'neutral') as string;
    const title = this.getNodeParameter('title', index, '') as string;
    const webhook_url = this.getNodeParameter('webhook_url', index, '') as string;

    if (audioData.audio_file) {
        const formData: IDataObject = {};

        if (prompt) {
            formData.prompt = prompt;
        }

        if (lyrics) {
            formData.lyrics = lyrics;
        }

        if (gender) {
            formData.gender = gender;
        }

        if (title) {
            formData.title = title;
        }

        if (webhook_url) {
            formData.webhook_url = webhook_url;
        }

        const credentials = await this.getCredentials('musicGPTApi');
        const baseUrl = (credentials.baseUrl as string) || process.env.API_BASE_URL || '';

        const options = {
            method: 'POST' as const,
            url: `${baseUrl}/api/public/v1/Remix`,
            formData: {
                ...formData,
                audio_file: {
                    value: audioData.audio_file,
                    options: {
                        filename: audioData.audio_filename,
                        contentType: 'audio/mpeg',
                    },
                },
            },
            json: true,
        };

        const response = await this.helpers.requestWithAuthentication.call(
            this,
            'musicGPTApi',
            options,
        );

        return [
            {
                json: {
                    success: response.success,
                    task_id: response.task_id,
                    conversion_id_1: response.conversion_id_1,
                    conversion_id_2: response.conversion_id_2,
                    eta: response.eta,
                },
            },
        ];
    } else {
        const body: IDataObject = {
            audio_url: audioData.audio_url,
        };

        if (prompt) {
            body.prompt = prompt;
        }

        if (lyrics) {
            body.lyrics = lyrics;
        }

        if (gender) {
            body.gender = gender;
        }

        if (title) {
            body.title = title;
        }

        if (webhook_url) {
            body.webhook_url = webhook_url;
        }

        const response = await apiRequest.call(this, 'POST', '/api/public/v1/Remix', body, {});

        return [
            {
                json: {
                    success: response.success,
                    task_id: response.task_id,
                    conversion_id_1: response.conversion_id_1,
                    conversion_id_2: response.conversion_id_2,
                    eta: response.eta,
                },
            },
        ];
    }
}

export async function extend(
    this: IExecuteFunctions,
    index: number,
): Promise<INodeExecutionData[]> {
    const audioData = await prepareAudioData.call(this, index);
    const extend_after = this.getNodeParameter('extend_after', index) as number;
    const prompt = this.getNodeParameter('prompt', index, '') as string;
    const lyrics = this.getNodeParameter('lyrics', index, '') as string;
    const gender = this.getNodeParameter('gender', index, '') as string;
    const title = this.getNodeParameter('title', index, '') as string;
    const webhook_url = this.getNodeParameter('webhook_url', index, '') as string;

    if (audioData.audio_file) {
        const formData: IDataObject = {
            extend_after,
        };

        if (prompt) {
            formData.prompt = prompt;
        }

        if (lyrics) {
            formData.lyrics = lyrics;
        }

        if (gender) {
            formData.gender = gender;
        }

        if (title) {
            formData.title = title;
        }

        if (webhook_url) {
            formData.webhook_url = webhook_url;
        }

        const credentials = await this.getCredentials('musicGPTApi');
        const baseUrl = (credentials.baseUrl as string) || process.env.API_BASE_URL || '';

        const options = {
            method: 'POST' as const,
            url: `${baseUrl}/api/public/v1/extend`,
            formData: {
                ...formData,
                audio_file: {
                    value: audioData.audio_file,
                    options: {
                        filename: audioData.audio_filename,
                        contentType: 'audio/mpeg',
                    },
                },
            },
            json: true,
        };

        const response = await this.helpers.requestWithAuthentication.call(
            this,
            'musicGPTApi',
            options,
        );

        return [
            {
                json: {
                    success: response.success,
                    task_id: response.task_id,
                    conversion_id_1: response.conversion_id_1,
                    conversion_id_2: response.conversion_id_2,
                    eta: response.eta,
                },
            },
        ];
    } else {
        const body: IDataObject = {
            audio_url: audioData.audio_url,
            extend_after,
        };

        if (prompt) {
            body.prompt = prompt;
        }

        if (lyrics) {
            body.lyrics = lyrics;
        }

        if (gender) {
            body.gender = gender;
        }

        if (title) {
            body.title = title;
        }

        if (webhook_url) {
            body.webhook_url = webhook_url;
        }

        const response = await apiRequest.call(this, 'POST', '/api/public/v1/extend', body, {});

        return [
            {
                json: {
                    success: response.success,
                    task_id: response.task_id,
                    conversion_id_1: response.conversion_id_1,
                    conversion_id_2: response.conversion_id_2,
                    eta: response.eta,
                },
            },
        ];
    }
}

export async function inpaint(
    this: IExecuteFunctions,
    index: number,
): Promise<INodeExecutionData[]> {
    const audioData = await prepareAudioData.call(this, index);
    const replace_start_at = this.getNodeParameter('replace_start_at', index) as number;
    const replace_end_at = this.getNodeParameter('replace_end_at', index) as number;
    const prompt = this.getNodeParameter('prompt', index, '') as string;
    const lyrics = this.getNodeParameter('lyrics', index, '') as string;
    const gender = this.getNodeParameter('gender', index, 'neutral') as string;
    const webhook_url = this.getNodeParameter('webhook_url', index, '') as string;

    if (audioData.audio_file) {
        const formData: IDataObject = {
            replace_start_at,
            replace_end_at,
        };

        if (prompt) {
            formData.prompt = prompt;
        }

        if (lyrics) {
            formData.lyrics = lyrics;
        }

        if (gender) {
            formData.gender = gender;
        }

        if (webhook_url) {
            formData.webhook_url = webhook_url;
        }

        const credentials = await this.getCredentials('musicGPTApi');
        const baseUrl = (credentials.baseUrl as string) || process.env.API_BASE_URL || '';

        const options = {
            method: 'POST' as const,
            url: `${baseUrl}/api/public/v1/inpaint`,
            formData: {
                ...formData,
                audio_file: {
                    value: audioData.audio_file,
                    options: {
                        filename: audioData.audio_filename,
                        contentType: 'audio/mpeg',
                    },
                },
            },
            json: true,
        };

        const response = await this.helpers.requestWithAuthentication.call(
            this,
            'musicGPTApi',
            options,
        );

        return [
            {
                json: {
                    success: response.success,
                    task_id: response.task_id,
                    conversion_id_1: response.conversion_id_1,
                    conversion_id_2: response.conversion_id_2,
                    eta: response.eta,
                },
            },
        ];
    } else {
        const body: IDataObject = {
            audio_url: audioData.audio_url,
            replace_start_at,
            replace_end_at,
        };

        if (prompt) {
            body.prompt = prompt;
        }

        if (lyrics) {
            body.lyrics = lyrics;
        }

        if (gender) {
            body.gender = gender;
        }

        if (webhook_url) {
            body.webhook_url = webhook_url;
        }

        const response = await apiRequest.call(this, 'POST', '/api/public/v1/inpaint', body, {});

        return [
            {
                json: {
                    success: response.success,
                    task_id: response.task_id,
                    conversion_id_1: response.conversion_id_1,
                    conversion_id_2: response.conversion_id_2,
                    eta: response.eta,
                },
            },
        ];
    }
}

export async function singOverInstrumental(
    this: IExecuteFunctions,
    index: number,
): Promise<INodeExecutionData[]> {
    const audioData = await prepareAudioData.call(this, index);
    const lyrics = this.getNodeParameter('lyrics', index) as string;
    const prompt = this.getNodeParameter('prompt', index, '') as string;
    const gender = this.getNodeParameter('gender', index, '') as string;
    const title = this.getNodeParameter('title', index, '') as string;
    const webhook_url = this.getNodeParameter('webhook_url', index, '') as string;

    if (!lyrics || lyrics.trim() === '') {
        throw new Error('Lyrics are required for Sing Over Instrumental. Please provide the lyrics you want to sing over the instrumental.');
    }

    if (audioData.audio_file) {
        const formData: IDataObject = {
            lyrics,
        };

        if (prompt) {
            formData.prompt = prompt;
        }

        if (gender) {
            formData.gender = gender;
        }

        if (title) {
            formData.title = title;
        }

        if (webhook_url) {
            formData.webhook_url = webhook_url;
        }

        const credentials = await this.getCredentials('musicGPTApi');
        const baseUrl = (credentials.baseUrl as string) || process.env.API_BASE_URL || '';

        const options = {
            method: 'POST' as const,
            url: `${baseUrl}/api/public/v1/sing_over_instrumental`,
            formData: {
                ...formData,
                audio_file: {
                    value: audioData.audio_file,
                    options: {
                        filename: audioData.audio_filename,
                        contentType: 'audio/mpeg',
                    },
                },
            },
            json: true,
        };

        const response = await this.helpers.requestWithAuthentication.call(
            this,
            'musicGPTApi',
            options,
        );

        return [
            {
                json: {
                    success: response.success,
                    task_id: response.task_id,
                    conversion_id_1: response.conversion_id_1,
                    conversion_id_2: response.conversion_id_2,
                    eta: response.eta,
                },
            },
        ];
    } else {
        const body: IDataObject = {
            audio_url: audioData.audio_url,
            lyrics,
        };

        if (prompt) {
            body.prompt = prompt;
        }

        if (gender) {
            body.gender = gender;
        }

        if (title) {
            body.title = title;
        }

        if (webhook_url) {
            body.webhook_url = webhook_url;
        }

        const response = await apiRequest.call(this, 'POST', '/api/public/v1/sing_over_instrumental', body, {});

        return [
            {
                json: {
                    success: response.success,
                    task_id: response.task_id,
                    conversion_id_1: response.conversion_id_1,
                    conversion_id_2: response.conversion_id_2,
                    eta: response.eta,
                },
            },
        ];
    }
}

export async function soundGenerator(
    this: IExecuteFunctions,
    index: number,
): Promise<INodeExecutionData[]> {
    const prompt = this.getNodeParameter('prompt', index) as string;
    const audio_length = this.getNodeParameter('audio_length', index, 5) as number;
    const webhook_url = this.getNodeParameter('webhook_url', index, '') as string;

    if (!prompt || prompt.trim() === '') {
        throw new Error('Prompt is required and cannot be empty for sound generation. Please provide a description of the sound you want to generate.');
    }

    const cleanPrompt = prompt.trim();

    if (cleanPrompt.length > 300) {
        throw new Error(`Prompt is too long (${cleanPrompt.length} characters). Maximum allowed is 300 characters.`);
    }

    const credentials = await this.getCredentials('musicGPTApi');
    const baseUrl = (credentials.baseUrl as string) || process.env.API_BASE_URL || '';

    const form: any = {
        prompt: cleanPrompt,
        audio_length: audio_length,
    };

    if (webhook_url) {
        form.webhook_url = webhook_url;
    }

    const options = {
        method: 'POST' as const,
        url: `${baseUrl}/api/public/v1/sound_generator`,
        form: form,
        json: true,
    };

    const response = await this.helpers.requestWithAuthentication.call(
        this,
        'musicGPTApi',
        options,
    );

    return [
        {
            json: {
                success: response.success,
                task_id: response.task_id,
                conversion_id: response.conversion_id,
                eta: response.eta,
                credit_estimate: response.credit_estimate,
                message: response.message,
            },
        },
    ];
}

export async function promptToLyrics(
    this: IExecuteFunctions,
    index: number,
): Promise<INodeExecutionData[]> {
    const prompt = this.getNodeParameter('prompt', index) as string;

    const response = await apiRequest.call(this, 'GET', '/api/public/v1/prompt_to_lyrics', {}, { prompt });

    return [
        {
            json: {
                success: response.success,
                lyrics: response.lyrics,
            },
        },
    ];
}