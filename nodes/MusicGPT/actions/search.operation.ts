import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function getAllVoices(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const limit = this.getNodeParameter('limit', index, 20) as number;
	const page = this.getNodeParameter('page', index, 0) as number;

	const query: IDataObject = {
		limit,
		page,
	};

	const response = await apiRequest.call(this, 'GET', '/api/public/v1/getAllVoices', {}, query);

	if (response.success && Array.isArray(response.voices)) {
		const voices = response.voices.map((voice: any) => ({
			...voice,
			id: voice.voice_id,
			json: voice,
		}));

		return voices.map((voice: any) => ({ json: voice, pairedItem: { item: index } }));
	}

	return [];
}

export async function searchVoices(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const query = this.getNodeParameter('query', index) as string;
	const limit = this.getNodeParameter('limit', index, 20) as number;
	const page = this.getNodeParameter('page', index, 0) as number;

	const queryParams: IDataObject = {
		query,
		limit,
		page,
	};

	const response = await apiRequest.call(
		this,
		'GET',
		'/api/public/v1/searchVoices',
		{},
		queryParams,
	);

	if (response.success && Array.isArray(response.voices)) {
		return response.voices.map((voice: any) => ({
			json: {
				...voice,
				id: voice.voice_id,
			},
			pairedItem: { item: index },
		}));
	}

	return [];
}

export async function getConversionById(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const conversionType = this.getNodeParameter('conversionType', index) as string;
	const taskId = this.getNodeParameter('task_id', index, '') as string;
	const conversionId = this.getNodeParameter('conversion_id', index, '') as string;

	const query: IDataObject = {
		conversionType,
	};

	if (taskId) {
		query.task_id = taskId;
	}
	if (conversionId) {
		query.conversion_id = conversionId;
	}

	const response = await apiRequest.call(this, 'GET', '/api/public/v1/byId', {}, query);

	if (response.success && response.conversion) {
		return [
			{
				json: {
					...response.conversion,
					id: response.conversion.conversion_id || response.conversion.task_id,
				},
				pairedItem: { item: index },
			},
		];
	}

	return [];
}

export async function getConversionsByUser(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const conversionType = this.getNodeParameter('conversionType', index, '') as string;
	const startDate = this.getNodeParameter('startDate', index, '') as string;
	const endDate = this.getNodeParameter('endDate', index, '') as string;
	const sortOrder = this.getNodeParameter('sortOrder', index, 'DESC') as string;
	const limit = this.getNodeParameter('limit', index, 10) as number;
	const lastEvaluatedKey = this.getNodeParameter('LastEvaluatedKey', index, '') as string;

	const query: IDataObject = {
		sortOrder,
		limit,
	};

	if (conversionType) {
		query.conversionType = conversionType;
	}
	if (startDate) {
		query.startDate = startDate;
	}
	if (endDate) {
		query.endDate = endDate;
	}
	if (lastEvaluatedKey) {
		query.LastEvaluatedKey = lastEvaluatedKey;
	}

	const response = await apiRequest.call(this, 'GET', '/api/public/v1/byUser', {}, query);

	if (response.success && Array.isArray(response.conversions)) {
		return response.conversions.map((conversion: any) => ({
			json: {
				...conversion,
				id: conversion.conversion_id || conversion.task_id || conversion.id,
			},
			pairedItem: { item: index },
		}));
	}

	return [];
}