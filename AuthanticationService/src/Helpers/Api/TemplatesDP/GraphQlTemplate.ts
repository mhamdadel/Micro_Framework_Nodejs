interface IGraphQlTemplateOptions {
  url: string,
  headers?: Record<string, string>,
}

export default class GraphQlTemplate {
  private options: IGraphQlTemplateOptions;
  // private clinet: ApolloClient<NormalizedCacheObject>;

  constructor(options: IGraphQlTemplateOptions) {
    this.options = options;
  }

  

}