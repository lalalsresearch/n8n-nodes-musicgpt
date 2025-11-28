import { IExecuteFunctions, ILoadOptionsFunctions, IPollFunctions, IHttpRequestMethods } from 'n8n-workflow';

export async function apiRequest(
    this: IExecuteFunctions | ILoadOptionsFunctions | IPollFunctions,
    method: string,
    endpoint: string,
    body: any = {},
    query: any = {},
): Promise<any> {
    const credentials = await this.getCredentials('musicGPTApi');
    const baseUrl = (credentials.baseUrl as string) || 'https://api.musicgpt.com';

    const options: any = {
        method: method as IHttpRequestMethods,
        body,
        qs: query,
        url: `${baseUrl}${endpoint}`,
        json: true,
    };

    if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && Object.keys(body).length > 0) {
        options.headers = {
            'Content-Type': 'application/json',
        };
    }

    try {
        const response = await this.helpers.httpRequestWithAuthentication.call(this, 'musicGPTApi', options);
        return response;
    } catch (error: any) {
        throw error;
    }
}

export async function apiRequestAllItems(
    this: IExecuteFunctions | ILoadOptionsFunctions | IPollFunctions,
    method: string,
    endpoint: string,
    body: any = {},
    query: any = {},
): Promise<any[]> {
    const returnData: any[] = [];
    let responseData;
    let lastEvaluatedKey = '';

    do {
        const queryWithPagination = { ...query };
        if (lastEvaluatedKey) {
            queryWithPagination.LastEvaluatedKey = lastEvaluatedKey;
        }

        responseData = await apiRequest.call(this, method, endpoint, body, queryWithPagination);

        if (responseData.success) {
            if (responseData.conversions) {
                returnData.push(...responseData.conversions);
            } else if (responseData.voices) {
                returnData.push(...responseData.voices);
            } else if (responseData.conversion) {
                returnData.push(responseData.conversion);
            }

            lastEvaluatedKey = responseData.LastEvaluatedKey || '';
        } else {
            break;
        }
    } while (lastEvaluatedKey);

    return returnData;
}