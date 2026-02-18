import {
    IDataObject,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    IPollFunctions,
    NodeApiError,
    NodeOperationError,
} from 'n8n-workflow';

import { apiRequest } from '../MusicGPT/transport';
import { getConversionByIdFields, getConversionsByUserFields } from './descriptions/trigger.description';

export class MusicGPTTrigger implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'MusicGPT Trigger',
        name: 'musicGPTTrigger',
        icon: 'file:musicgpt.svg',
        group: ['trigger'],
        version: 1,
        subtitle: '={{$parameter["triggerOn"]}}',
        description: 'Triggers on MusicGPT conversion events',
        defaults: {
            name: 'MusicGPT Trigger',
        },
        inputs: [],
        outputs: ['main'],
        credentials: [
            {
                name: 'musicGPTApi',
                required: true,
            },
        ],
        polling: true,
        properties: [
            {
                displayName: 'Trigger On',
                name: 'triggerOn',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Get Conversion',
                        value: 'getConversionById',
                        description: 'Retrieve a specific conversion by type and ID',
                    },
                    {
                        name: 'New Conversions',
                        value: 'getConversionsByUser',
                        description: 'Fetch conversions with filters and pagination',
                    },
                ],
                default: 'getConversionsByUser',
                required: true,
            },
            ...getConversionByIdFields,
            ...getConversionsByUserFields,
        ],
    };

    async poll(this: IPollFunctions): Promise<INodeExecutionData[][] | null> {
        const triggerOn = this.getNodeParameter('triggerOn') as string;

        if (triggerOn === 'getConversionById') {
            const conversionType = this.getNodeParameter('conversionType') as string;
            const task_id = this.getNodeParameter('task_id', '') as string;
            const conversion_id = this.getNodeParameter('conversion_id', '') as string;

            if (!task_id && !conversion_id) {
                throw new NodeOperationError(this.getNode(), 'Either Task ID or Conversion ID must be provided');
            }

            const query: IDataObject = {
                conversionType,
            };

            if (task_id) {
                query.task_id = task_id;
            }

            if (conversion_id) {
                query.conversion_id = conversion_id;
            }

            try {
                const response = await apiRequest.call(
                    this,
                    'GET',
                    '/api/public/v1/byId',
                    {},
                    query,
                );

                if (response.success && response.conversion) {
                    return [
                        [
                            {
                                json: response.conversion,
                            },
                        ],
                    ];
                }
            } catch (error: any) {
                throw new NodeApiError(this.getNode(), error);
            }

            return null;
        }

        if (triggerOn === 'getConversionsByUser') {
            const conversionType = this.getNodeParameter('conversionType', '') as string;
            const startDate = this.getNodeParameter('startDate', '') as string;
            const endDate = this.getNodeParameter('endDate', '') as string;
            const sortOrder = this.getNodeParameter('sortOrder', 'DESC') as string;
            const limit = this.getNodeParameter('limit', 10) as number;

            const webhookData = this.getWorkflowStaticData('node');

            const query: IDataObject = {
                limit,
                sortOrder,
            };

            if (conversionType) {
                query.conversionType = conversionType;
            }

            if (startDate) {
                query.startDate = startDate;
            } else {
                const now = new Date();
                const lastPoll = webhookData.lastPoll as string || new Date(now.getTime() - 3600000).toISOString();
                query.startDate = lastPoll;
            }

            if (endDate) {
                query.endDate = endDate;
            }

            let conversions: any[] = [];

            try {
                const response = await apiRequest.call(
                    this,
                    'GET',
                    '/api/public/v1/byUser',
                    {},
                    query,
                );

                if (response.success && Array.isArray(response.conversions)) {
                    conversions = response.conversions;
                }
            } catch (error: any) {
                throw new NodeApiError(this.getNode(), error);
            }

            if (!startDate) {
                const now = new Date();
                webhookData.lastPoll = now.toISOString();
            }

            if (conversions.length === 0) {
                return null;
            }

            return [
                conversions.map(conversion => ({
                    json: conversion,
                })),
            ];
        }

        return null;
    }
}