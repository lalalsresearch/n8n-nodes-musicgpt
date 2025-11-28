import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { API_BASE_URL } from '../constants';

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

export async function deecho(
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
        url: `${API_BASE_URL}/api/public/v1/deecho`,
        formData: formData,
        json: true,
    };

    const response = await this.helpers.httpRequestWithAuthentication.call(
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
            },
        },
    ];
}

export async function dereverb(
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
        url: `${API_BASE_URL}/api/public/v1/dereverb`,
        formData: formData,
        json: true,
    };

    const response = await this.helpers.httpRequestWithAuthentication.call(
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
            },
        },
    ];
}

export async function audioMastering(
    this: IExecuteFunctions,
    index: number,
): Promise<INodeExecutionData[]> {
    const audioData = await prepareAudioData.call(this, index);
    const referenceAudioSource = this.getNodeParameter('referenceAudioSource', index) as string;
    const output_extension = this.getNodeParameter('output_extension', index, '') as string;
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

    if (referenceAudioSource === 'url') {
        const reference_audio_url = this.getNodeParameter('reference_audio_url', index) as string;
        formData.reference_audio_url = reference_audio_url;
    } else {
        const referenceBinaryPropertyName = this.getNodeParameter('reference_audio_file', index) as string;
        const referenceBinaryData = this.helpers.assertBinaryData(index, referenceBinaryPropertyName);

        let reference_audio_file: Buffer;
        if (referenceBinaryData.data) {
            reference_audio_file = Buffer.from(referenceBinaryData.data, 'base64');
        } else {
            reference_audio_file = await this.helpers.getBinaryDataBuffer(index, referenceBinaryPropertyName);
        }

        formData.reference_audio_file = {
            value: reference_audio_file,
            options: {
                filename: referenceBinaryData.fileName || 'reference.mp3',
                contentType: 'audio/mpeg',
            },
        };
    }

    if (output_extension) {
        formData.output_extension = output_extension;
    }

    if (webhook_url) {
        formData.webhook_url = webhook_url;
    }

    const options = {
        method: 'POST' as const,
        url: `${API_BASE_URL}/api/public/v1/audio_mastering`,
        formData: formData,
        json: true,
    };

    const response = await this.helpers.httpRequestWithAuthentication.call(
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
            },
        },
    ];
}

export async function trimAudio(
    this: IExecuteFunctions,
    index: number,
): Promise<INodeExecutionData[]> {
    const audioData = await prepareAudioData.call(this, index);
    const start_time = this.getNodeParameter('start_time', index) as number;
    const end_time = this.getNodeParameter('end_time', index) as number;
    const webhook_url = this.getNodeParameter('webhook_url', index, '') as string;

    

    const formData: any = {
        start_time: String(start_time),
        end_time: String(end_time),
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
        url: `${API_BASE_URL}/api/public/v1/audio_cutter`,
        formData: formData,
        json: true,
    };

    const response = await this.helpers.httpRequestWithAuthentication.call(
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
            },
        },
    ];
}

export async function changeAudioSpeed(
    this: IExecuteFunctions,
    index: number,
): Promise<INodeExecutionData[]> {
    const audioData = await prepareAudioData.call(this, index);
    const speed_factor = this.getNodeParameter('speed_factor', index) as number;
    const webhook_url = this.getNodeParameter('webhook_url', index, '') as string;

    

    const formData: any = {
        speed_factor: String(speed_factor),
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
        url: `${API_BASE_URL}/api/public/v1/audio_speed_changer`,
        formData: formData,
        json: true,
    };

    const response = await this.helpers.httpRequestWithAuthentication.call(
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
            },
        },
    ];
}

export async function audioToMidi(
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
        url: `${API_BASE_URL}/api/public/v1/audio_to_midi`,
        formData: formData,
        json: true,
    };

    const response = await this.helpers.httpRequestWithAuthentication.call(
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
            },
        },
    ];
}

export async function extractKeyBpm(
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
        url: `${API_BASE_URL}/api/public/v1/extract_key_bpm`,
        formData: formData,
        json: true,
    };

    const response = await this.helpers.httpRequestWithAuthentication.call(
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
            },
        },
    ];
}

export async function fileConvert(
    this: IExecuteFunctions,
    index: number,
): Promise<INodeExecutionData[]> {
    const audioData = await prepareAudioData.call(this, index);
    const target_format = this.getNodeParameter('target_format', index) as string;
    const target_sr = this.getNodeParameter('target_sr', index, '44100') as string;
    const target_bit_depth = this.getNodeParameter('target_bit_depth', index, '16') as string;
    const webhook_url = this.getNodeParameter('webhook_url', index, '') as string;

    

    const formData: any = {
        target_format: target_format,
        target_sr: target_sr,
        target_bit_depth: target_bit_depth,
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
        url: `${API_BASE_URL}/api/public/v1/file_convert`,
        formData: formData,
        json: true,
    };

    const response = await this.helpers.httpRequestWithAuthentication.call(
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
            },
        },
    ];
}

export async function audioTranscribe(
    this: IExecuteFunctions,
    index: number,
): Promise<INodeExecutionData[]> {
    const audioData = await prepareAudioData.call(this, index);
    const language = this.getNodeParameter('language', index, '') as string;
    const webhook_url = this.getNodeParameter('webhook_url', index, '') as string;

    

    const formData: any = {};

    if (language) {
        formData.language = language;
    }

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
        url: `${API_BASE_URL}/api/public/v1/audio_transcribe`,
        formData: formData,
        json: true,
    };

    const response = await this.helpers.httpRequestWithAuthentication.call(
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
            },
        },
    ];
}