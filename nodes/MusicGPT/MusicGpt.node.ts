import {
    IExecuteFunctions,
    ILoadOptionsFunctions,
    INodeExecutionData,
    INodePropertyOptions,
    INodeType,
    INodeTypeDescription,
    NodeOperationError,
} from 'n8n-workflow';

import {
    getAllVoicesFields,
    searchVoicesFields,
    getConversionByIdFields,
    getConversionsByUserFields,
} from './descriptions/search.description';

import {
    generateAudioFields,
    textToSpeechFields,
    voiceChangerFields,
    coverSongFields,
    extractionFields,
    denoiseFields,
} from './descriptions/audioGeneration.description';

import {
    deechoFields,
    dereverbFields,
    audioMasteringFields,
    trimAudioFields,
    changeAudioSpeedFields,
    audioToMidiFields,
    extractKeyBpmFields,
    fileConvertFields,
    audioTranscribeFields,
} from './descriptions/audioProcessing.description';

import {
    remixFields,
    extendFields,
    inpaintFields,
    singOverInstrumentalFields,
    soundGeneratorFields,
    promptToLyricsFields,
} from './descriptions/advancedGeneration.description';

import {
    getAllVoices,
    searchVoices,
    getConversionById,
    getConversionsByUser,
} from './actions/search.operation';

import {
    generateAudio,
    textToSpeech,
    voiceChanger,
    coverSong,
    extraction,
    denoise,
} from './actions/audioGeneration.operation';

import {
    deecho,
    dereverb,
    audioMastering,
    trimAudio,
    changeAudioSpeed,
    audioToMidi,
    extractKeyBpm,
    fileConvert,
    audioTranscribe,
} from './actions/audioProcessing.operation';

import {
    remix,
    extend,
    inpaint,
    singOverInstrumental,
    soundGenerator,
    promptToLyrics,
} from './actions/advancedGeneration.operation';

import { apiRequest } from './transport';

export class MusicGPT implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'MusicGPT',
        name: 'musicGpt',
        icon: 'file:musicgpt.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
        description: 'Interact with MusicGPT API for audio processing and voice management',
        defaults: {
            name: 'MusicGPT',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'musicGptApi',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Audio Generation',
                        value: 'audioGeneration',
                        description: 'Generate and process audio',
                    },
                    {
                        name: 'Audio Processing',
                        value: 'audioProcessing',
                        description: 'Process and enhance audio files',
                    },
                    {
                        name: 'Advanced Generation',
                        value: 'advancedGeneration',
                        description: 'Advanced audio generation and manipulation',
                    },
                    {
                        name: 'Search',
                        value: 'search',
                        description: 'Search and retrieve voices, conversions, and data',
                    },
                ],
                default: 'audioGeneration',
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['audioGeneration'],
                    },
                },
                options: [
                    {
                        name: 'Cover Song',
                        value: 'coverSong',
                        description: 'Create a cover version with different voice',
                        action: 'Create cover',
                    },
                    {
                        name: 'Denoise',
                        value: 'denoise',
                        description: 'Remove noise from audio',
                        action: 'Denoise audio',
                    },
                    {
                        name: 'Extraction',
                        value: 'extraction',
                        description: 'Extract vocals, instrumentals, or stems',
                        action: 'Extract audio',
                    },
                    {
                        name: 'Generate Audio',
                        value: 'generateAudio',
                        description: 'Generate music from prompts or lyrics',
                        action: 'Generate audio',
                    },
                    {
                        name: 'Text to Speech',
                        value: 'textToSpeech',
                        description: 'Convert text to speech',
                        action: 'Text to speech',
                    },
                    {
                        name: 'Voice Changer',
                        value: 'voiceChanger',
                        description: 'Transform voice in audio',
                        action: 'Change voice',
                    },
                ],
                default: 'generateAudio',
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['audioProcessing'],
                    },
                },
                options: [
                    {
                        name: 'Audio Mastering',
                        value: 'audioMastering',
                        description: 'Master audio for professional quality',
                        action: 'Master audio',
                    },
                    {
                        name: 'Audio to MIDI',
                        value: 'audioToMidi',
                        description: 'Convert audio to MIDI',
                        action: 'Convert to MIDI',
                    },
                    {
                        name: 'Audio Transcribe',
                        value: 'audioTranscribe',
                        description: 'Transcribe speech to text',
                        action: 'Transcribe audio',
                    },
                    {
                        name: 'Change Audio Speed',
                        value: 'changeAudioSpeed',
                        description: 'Adjust playback speed',
                        action: 'Change speed',
                    },
                    {
                        name: 'Deecho',
                        value: 'deecho',
                        description: 'Remove echo from audio',
                        action: 'Remove echo',
                    },
                    {
                        name: 'Dereverb',
                        value: 'dereverb',
                        description: 'Remove reverb from audio',
                        action: 'Remove reverb',
                    },
                    {
                        name: 'Extract Key/BPM',
                        value: 'extractKeyBpm',
                        description: 'Extract musical key and tempo',
                        action: 'Extract key and BPM',
                    },
                    {
                        name: 'File Convert',
                        value: 'fileConvert',
                        description: 'Convert audio format',
                        action: 'Convert format',
                    },
                    {
                        name: 'Trim Audio',
                        value: 'trimAudio',
                        description: 'Cut audio to specific time range',
                        action: 'Trim audio',
                    },
                ],
                default: 'deecho',
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['advancedGeneration'],
                    },
                },
                options: [
                    {
                        name: 'Extend',
                        value: 'extend',
                        description: 'Extend audio duration',
                        action: 'Extend audio',
                    },
                    {
                        name: 'Inpaint',
                        value: 'inpaint',
                        description: 'Replace a section of audio',
                        action: 'Inpaint audio',
                    },
                    {
                        name: 'Prompt to Lyrics',
                        value: 'promptToLyrics',
                        description: 'Generate lyrics from prompt',
                        action: 'Generate lyrics',
                    },
                    {
                        name: 'Remix',
                        value: 'remix',
                        description: 'Remix audio with AI',
                        action: 'Remix audio',
                    },
                    {
                        name: 'Sing Over Instrumental',
                        value: 'singOverInstrumental',
                        description: 'Add vocals to instrumental track',
                        action: 'Sing over instrumental',
                    },
                    {
                        name: 'Sound Generator',
                        value: 'soundGenerator',
                        description: 'Generate sound effects from text',
                        action: 'Generate sound',
                    },
                ],
                default: 'remix',
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['search'],
                    },
                },
                options: [
                    {
                        name: 'Get All Voices',
                        value: 'getAllVoices',
                        description: 'Fetch all available voices with their IDs and metadata',
                        action: 'Get all voices',
                    },
                    {
                        name: 'Search Voices',
                        value: 'searchVoices',
                        description: 'Search voices by name and return matching results',
                        action: 'Search voices',
                    },
                    {
                        name: 'Get Conversion by ID',
                        value: 'getConversionById',
                        description: 'Retrieve a specific conversion by type and ID',
                        action: 'Get conversion by ID',
                    },
                    {
                        name: 'Get Conversions by User',
                        value: 'getConversionsByUser',
                        description: 'Fetch your conversions with optional filters and pagination',
                        action: 'Get conversions by user',
                    },
                ],
                default: 'getAllVoices',
            },
            ...generateAudioFields,
            ...textToSpeechFields,
            ...voiceChangerFields,
            ...coverSongFields,
            ...extractionFields,
            ...denoiseFields,
            ...deechoFields,
            ...dereverbFields,
            ...audioMasteringFields,
            ...trimAudioFields,
            ...changeAudioSpeedFields,
            ...audioToMidiFields,
            ...extractKeyBpmFields,
            ...fileConvertFields,
            ...audioTranscribeFields,
            ...remixFields,
            ...extendFields,
            ...inpaintFields,
            ...singOverInstrumentalFields,
            ...soundGeneratorFields,
            ...promptToLyricsFields,
            ...getAllVoicesFields,
            ...searchVoicesFields,
            ...getConversionByIdFields,
            ...getConversionsByUserFields,
        ],
    };

    methods = {
        loadOptions: {
            async getVoices(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
                const query = {
                    limit: 100,
                    page: 0,
                };

                try {
                    const response = await apiRequest.call(
                        this,
                        'GET',
                        '/api/public/v1/getAllVoices',
                        {},
                        query,
                    );

                    const options: INodePropertyOptions[] = [
                        {
                            name: 'No Voice (Default)',
                            value: 'none',
                            description: 'Use default voice settings',
                        },
                    ];

                    if (response.success && Array.isArray(response.voices)) {
                        const voiceOptions = response.voices.map((voice: any) => ({
                            name: voice.voice_name || voice.voice_id,
                            value: voice.voice_id,
                            description: voice.tts_only ? 'TTS Only' : 'Full Voice',
                        }));
                        options.push(...voiceOptions);
                    }

                    return options;
                } catch (error) {
                    return [
                        {
                            name: 'No Voice (Default)',
                            value: 'none',
                            description: 'Use default voice settings',
                        },
                    ];
                }
            },
            async getVoicesRequired(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
                const query = {
                    limit: 100,
                    page: 0,
                };

                try {
                    const response = await apiRequest.call(
                        this,
                        'GET',
                        '/api/public/v1/getAllVoices',
                        {},
                        query,
                    );

                    if (response.success && Array.isArray(response.voices)) {
                        return response.voices.map((voice: any) => ({
                            name: voice.voice_name || voice.voice_id,
                            value: voice.voice_id,
                            description: voice.tts_only ? 'TTS Only' : 'Full Voice',
                        }));
                    }

                    return [];
                } catch (error) {
                    return [];
                }
            },
        },
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);

        for (let i = 0; i < items.length; i++) {
            try {
                if (resource === 'audioGeneration') {
                    if (operation === 'generateAudio') {
                        const results = await generateAudio.call(this, i);
                        returnData.push(...results);
                    } else if (operation === 'textToSpeech') {
                        const results = await textToSpeech.call(this, i);
                        returnData.push(...results);
                    } else if (operation === 'voiceChanger') {
                        const results = await voiceChanger.call(this, i);
                        returnData.push(...results);
                    } else if (operation === 'coverSong') {
                        const results = await coverSong.call(this, i);
                        returnData.push(...results);
                    } else if (operation === 'extraction') {
                        const results = await extraction.call(this, i);
                        returnData.push(...results);
                    } else if (operation === 'denoise') {
                        const results = await denoise.call(this, i);
                        returnData.push(...results);
                    }
                } else if (resource === 'audioProcessing') {
                    if (operation === 'deecho') {
                        const results = await deecho.call(this, i);
                        returnData.push(...results);
                    } else if (operation === 'dereverb') {
                        const results = await dereverb.call(this, i);
                        returnData.push(...results);
                    } else if (operation === 'audioMastering') {
                        const results = await audioMastering.call(this, i);
                        returnData.push(...results);
                    } else if (operation === 'trimAudio') {
                        const results = await trimAudio.call(this, i);
                        returnData.push(...results);
                    } else if (operation === 'changeAudioSpeed') {
                        const results = await changeAudioSpeed.call(this, i);
                        returnData.push(...results);
                    } else if (operation === 'audioToMidi') {
                        const results = await audioToMidi.call(this, i);
                        returnData.push(...results);
                    } else if (operation === 'extractKeyBpm') {
                        const results = await extractKeyBpm.call(this, i);
                        returnData.push(...results);
                    } else if (operation === 'fileConvert') {
                        const results = await fileConvert.call(this, i);
                        returnData.push(...results);
                    } else if (operation === 'audioTranscribe') {
                        const results = await audioTranscribe.call(this, i);
                        returnData.push(...results);
                    }
                } else if (resource === 'advancedGeneration') {
                    if (operation === 'remix') {
                        const results = await remix.call(this, i);
                        returnData.push(...results);
                    } else if (operation === 'extend') {
                        const results = await extend.call(this, i);
                        returnData.push(...results);
                    } else if (operation === 'inpaint') {
                        const results = await inpaint.call(this, i);
                        returnData.push(...results);
                    } else if (operation === 'singOverInstrumental') {
                        const results = await singOverInstrumental.call(this, i);
                        returnData.push(...results);
                    } else if (operation === 'soundGenerator') {
                        const results = await soundGenerator.call(this, i);
                        returnData.push(...results);
                    } else if (operation === 'promptToLyrics') {
                        const results = await promptToLyrics.call(this, i);
                        returnData.push(...results);
                    }
                } else if (resource === 'search') {
                    if (operation === 'getAllVoices') {
                        const results = await getAllVoices.call(this, i);
                        returnData.push(...results);
                    } else if (operation === 'searchVoices') {
                        const results = await searchVoices.call(this, i);
                        returnData.push(...results);
                    } else if (operation === 'getConversionById') {
                        const results = await getConversionById.call(this, i);
                        returnData.push(...results);
                    } else if (operation === 'getConversionsByUser') {
                        const results = await getConversionsByUser.call(this, i);
                        returnData.push(...results);
                    }
                }
            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: {
                            error: error instanceof Error ? error.message : String(error),
                        },
                        pairedItem: {
                            item: i,
                        },
                    });
                    continue;
                }
                throw new NodeOperationError(this.getNode(), error as Error);
            }
        }

        return [returnData];
    }
}