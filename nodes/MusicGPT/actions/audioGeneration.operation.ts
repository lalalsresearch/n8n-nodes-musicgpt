import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { apiRequest } from '../transport';
import { API_BASE_URL } from '../constants';

// Helper function to handle file upload or URL
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

// Generate Audio operation
export async function generateAudio(
    this: IExecuteFunctions,
    index: number,
): Promise<INodeExecutionData[]> {
    const generationMode = this.getNodeParameter('generationMode', index) as string;
    const voice_id = this.getNodeParameter('voice_id', index, '') as string;
    const make_instrumental = this.getNodeParameter('make_instrumental', index, false) as boolean;
    const vocal_only = this.getNodeParameter('vocal_only', index, false) as boolean;
    const negative_tags = this.getNodeParameter('negative_tags', index, '') as string;
    const output_length = this.getNodeParameter('output_length', index, 0) as number;
    const webhook_url = this.getNodeParameter('webhook_url', index, '') as string;

    const body: IDataObject = {
        make_instrumental,
        vocal_only,
    };

    if (generationMode === 'prompt') {
        body.prompt = this.getNodeParameter('prompt', index) as string;
    } else {
        body.music_style = this.getNodeParameter('music_style', index) as string;
        body.lyrics = this.getNodeParameter('lyrics', index, '') as string;
    }

    if (voice_id && voice_id !== 'none') {
        body.voice_id = voice_id;
    }
    if (negative_tags) {
        body.negative_tags = negative_tags;
    }
    if (output_length > 0) {
        body.output_length = output_length;
    }
    if (webhook_url) {
        body.webhook_url = webhook_url;
    }

    const response = await apiRequest.call(this, 'POST', '/api/public/v1/MusicAI', body, {});

    return [
        {
            json: {
                success: response.success,
                task_id: response.task_id,
                conversion_id_1: response.conversion_id_1,
                conversion_id_2: response.conversion_id_2,
                eta: response.eta,
                message: response.message,
            },
            pairedItem: { item: index },
        },
    ];
}

// Text to Speech operation
export async function textToSpeech(
    this: IExecuteFunctions,
    index: number,
): Promise<INodeExecutionData[]> {
    const text = this.getNodeParameter('text', index) as string;
    const voiceSelection = this.getNodeParameter('voiceSelection', index, 'gender') as string;
    const webhook_url = this.getNodeParameter('webhook_url', index, '') as string;

    const body: IDataObject = {
        text,
    };

    if (voiceSelection === 'voice') {
        const voice_id = this.getNodeParameter('voice_id', index, 'none') as string;
        if (voice_id && voice_id !== 'none') {
            body.voice_id = voice_id;
        }
    } else {
        const gender = this.getNodeParameter('gender', index, 'm') as string;
        body.gender = gender;
    }

    if (webhook_url) {
        body.webhook_url = webhook_url;
    }

    const response = await apiRequest.call(this, 'POST', '/api/public/v1/TextToSpeech', body, {});

    return [
        {
            json: {
                success: response.success,
                task_id: response.task_id,
                conversion_id: response.conversion_id,
                eta: response.eta,
            },
            pairedItem: { item: index },
        },
    ];
}

// Voice Changer operation
export async function voiceChanger(
    this: IExecuteFunctions,
    index: number,
): Promise<INodeExecutionData[]> {
    const audioData = await prepareAudioData.call(this, index);
    const voice_id = this.getNodeParameter('voice_id', index) as string;
    const remove_background = this.getNodeParameter('remove_background', index, false) as boolean;
    const pitch = this.getNodeParameter('pitch', index, 0) as number;
    const webhook_url = this.getNodeParameter('webhook_url', index, '') as string;

    const formData: any = {
        voice_id: voice_id,
        remove_background: remove_background ? '1' : '0',
        pitch: String(pitch),
    };

    if (audioData.audio_file) {
        formData.audio_file = {
            value: audioData.audio_file,
            options: {
                filename: audioData.audio_filename,
                contentType: 'audio/mpeg',
            },
        };
    } else {
        formData.audio_url = audioData.audio_url;
    }

    if (webhook_url) {
        formData.webhook_url = webhook_url;
    }

    const options = {
        method: 'POST' as const,
        url: `${API_BASE_URL}/api/public/v1/VoiceChanger`,
        formData: formData,
        json: true,
    };

    const response = await this.helpers.httpRequestWithAuthentication.call(
        this,
        'musicGptApi',
        options,
    );

    return [
        {
            json: {
                success: response.success,
                task_id: response.task_id,
                conversion_id: response.conversion_id,
                eta: response.eta,
            },
            pairedItem: { item: index },
        },
    ];
}

// Cover Song operation
export async function coverSong(
    this: IExecuteFunctions,
    index: number,
): Promise<INodeExecutionData[]> {
    const audioData = await prepareAudioData.call(this, index);
    const voice_id = this.getNodeParameter('voice_id', index) as string;
    const pitch = this.getNodeParameter('pitch', index, 0) as number;
    const webhook_url = this.getNodeParameter('webhook_url', index, '') as string;

    const formData: any = {
        voice_id: voice_id,
        pitch: String(pitch),
    };

    if (audioData.audio_file) {
        formData.audio_file = {
            value: audioData.audio_file,
            options: {
                filename: audioData.audio_filename,
                contentType: 'audio/mpeg',
            },
        };
    } else {
        formData.audio_url = audioData.audio_url;
    }

    if (webhook_url) {
        formData.webhook_url = webhook_url;
    }

    const options = {
        method: 'POST' as const,
        url: `${API_BASE_URL}/api/public/v1/Cover`,
        formData: formData,
        json: true,
    };

    const response = await this.helpers.httpRequestWithAuthentication.call(
        this,
        'musicGptApi',
        options,
    );

    return [
        {
            json: {
                success: response.success,
                task_id: response.task_id,
                conversion_id: response.conversion_id,
                eta: response.eta,
            },
            pairedItem: { item: index },
        },
    ];
}

// Extraction operation
export async function extraction(
    this: IExecuteFunctions,
    index: number,
): Promise<INodeExecutionData[]> {
    const audioData = await prepareAudioData.call(this, index);
    const stems = this.getNodeParameter('stems', index) as string[];
    const preprocessing_options = this.getNodeParameter('preprocessing_options', index, []) as string[];
    const webhook_url = this.getNodeParameter('webhook_url', index, '') as string;

    const stemsJson = JSON.stringify(stems);
    const preprocessingJson = JSON.stringify(preprocessing_options);

    const formData: any = {
        stems: stemsJson,
        preprocessing_options: preprocessingJson,
    };

    if (audioData.audio_file) {
        formData.audio_file = {
            value: audioData.audio_file,
            options: {
                filename: audioData.audio_filename,
                contentType: 'audio/mpeg',
            },
        };
    } else {
        formData.audio_url = audioData.audio_url;
    }

    if (webhook_url) {
        formData.webhook_url = webhook_url;
    }

    const options = {
        method: 'POST' as const,
        url: `${API_BASE_URL}/api/public/v1/Extraction`,
        formData: formData,
        json: true,
    };

    const response = await this.helpers.httpRequestWithAuthentication.call(
        this,
        'musicGptApi',
        options,
    );

    return [
        {
            json: {
                success: response.success,
                task_id: response.task_id,
                conversion_id: response.conversion_id,
                eta: response.eta,
            },
            pairedItem: { item: index },
        },
    ];
}

// Denoise operation
export async function denoise(
    this: IExecuteFunctions,
    index: number,
): Promise<INodeExecutionData[]> {
    const audioData = await prepareAudioData.call(this, index);
    const webhook_url = this.getNodeParameter('webhook_url', index, '') as string;

    const formData: any = {};

    if (audioData.audio_file) {
        formData.audio_file = {
            value: audioData.audio_file,
            options: {
                filename: audioData.audio_filename,
                contentType: 'audio/mpeg',
            },
        };
    } else {
        formData.audio_url = audioData.audio_url;
    }

    if (webhook_url) {
        formData.webhook_url = webhook_url;
    }

    const options = {
        method: 'POST' as const,
        url: `${API_BASE_URL}/api/public/v1/denoise`,
        formData: formData,
        json: true,
    };

    const response = await this.helpers.httpRequestWithAuthentication.call(
        this,
        'musicGptApi',
        options,
    );

    return [
        {
            json: {
                success: response.success,
                task_id: response.task_id,
                conversion_id: response.conversion_id,
                eta: response.eta,
            },
            pairedItem: { item: index },
        },
    ];
}