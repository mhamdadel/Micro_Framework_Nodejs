export default interface RestApiRequestOptions {
  body?: any;
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
}