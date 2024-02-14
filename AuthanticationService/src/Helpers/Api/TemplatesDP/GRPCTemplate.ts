import ApolloClient, { DocumentNode, NormalizedCacheObject } from 'apollo-boost';

interface GraphQLServiceOptions {
  client: ApolloClient<NormalizedCacheObject>;
}

class GRPCTemplate {
  private client: ApolloClient<NormalizedCacheObject>;

  constructor(options: GraphQLServiceOptions) {
    this.client = options.client;
  }

  async mutate(query: DocumentNode, variables: Record<string, any>): Promise<any> {
    const response = await this.client.query({
      query,
      variables,
    });
    return response.data;
  }

  async query(query: DocumentNode, variables: Record<string, any>): Promise<any> {
    const response = await this.client.query({
      query,
      variables,
    });
    return response.data;
  }
}

export default GRPCTemplate;
