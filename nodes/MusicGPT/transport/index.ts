import { IExecuteFunctions, ILoadOptionsFunctions, IPollFunctions, IHttpRequestMethods, IHttpRequestOptions, IDataObject, NodeApiError } from 'n8n-workflow';
import { API_BASE_URL } from '../constants';

export async function apiRequest(
    this: IExecuteFunctions | ILoadOptionsFunctions | IPollFunctions,
    method: string,
    endpoint: string,
    body: IDataObject = {},
    query: IDataObject = {},
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
    const options: IHttpRequestOptions = {
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
        const response = await this.helpers.httpRequestWithAuthentication.call(this, 'musicGptApi', options);
        return response;
    } catch (error: any) {
        throw new NodeApiError(this.getNode(), error);
    }
}

