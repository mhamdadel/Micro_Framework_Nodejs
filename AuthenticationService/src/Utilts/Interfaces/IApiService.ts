import { RequestOptions } from "https";

interface IApiService {
  post(resource: string, options: RequestOptions): Promise<any>;
  get(resource: string, options: RequestOptions): Promise<any>;
  put(resource: string, options: RequestOptions): Promise<any>;
  delete(resource: string, options: RequestOptions): Promise<any>;
}

export default IApiService;