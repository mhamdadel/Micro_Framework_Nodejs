import injectable from '@/Helpers/Decorators/injectable';
import IRestApiRequestOptions from '@/Utilts/Interfaces/IRestApiRequestOptions';

@injectable("RESTService")
class RESTService {

  private url;

  constructor({url}: {url: string}) {
    this.url = url;
  }

  private async bodyRequest(endpoint: string, options: IRestApiRequestOptions, method: string): Promise<any> {
    const url = this.buildUrl(endpoint, options.queryParams);
    const response = await fetch(url, {
      method,
      headers: options.headers,
      body: JSON.stringify(options.body),
    });
    return response.json();
  }

  async post(endpoint: string, options: IRestApiRequestOptions): Promise<any> {
    return this.bodyRequest(endpoint, options, 'POST');
  }

  async get(endpoint: string, options: IRestApiRequestOptions): Promise<any> {
    const url = this.buildUrl(endpoint, options.queryParams);
    const response = await fetch(url, {
      method: 'GET',
      headers: options.headers,
    });
    return response.json();
  }

  async put(endpoint: string, options: IRestApiRequestOptions): Promise<any> {
    return this.bodyRequest(endpoint, options, 'PUT');
  }

  async delete(endpoint: string, options: IRestApiRequestOptions): Promise<any> {
    return this.bodyRequest(endpoint, options, 'DELETE');
  }

  private buildUrl(endpoint: string, queryParams?: Record<string, string>): string {
    let url = `${this.url}/${endpoint}`;

    if (queryParams) {
      const queryString = Object.entries(queryParams)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
      url += `?${queryString}`;
    }

    return url;
  }
}

export default RESTService;
