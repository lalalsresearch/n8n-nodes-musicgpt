import { IExecuteFunctions, ILoadOptionsFunctions, IPollFunctions, IHttpRequestMethods, NodeApiError } from 'n8n-workflow';
import { API_BASE_URL } from '../constants';

export async function apiRequest(
    this: IExecuteFunctions | ILoadOptionsFunctions | IPollFunctions,
    method: string,
    endpoint: string,
    body: any = {},
    query: any = {},
): Promise<any> {
    const options: any = {
        method: method as IHttpRequestMethods,
        body,
        qs: query,
        url: `${API_BASE_URL}${endpoint}`,
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
        throw new NodeApiError(this.getNode(), error);
    }
}

