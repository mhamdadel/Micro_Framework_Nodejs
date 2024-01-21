import ApolloClient, { DocumentNode, NormalizedCacheObject } from 'apollo-boost';

interface GraphQLServiceOptions {
  client: ApolloClient<NormalizedCacheObject>;
}

class GraphQLService {
  private client: ApolloClient<NormalizedCacheObject>;

  constructor(options: GraphQLServiceOptions) {
    this.client = options.client;
  }

  async mutateRequest(query: DocumentNode, variables: Record<string, any>): Promise<any> {
    const response = await this.client.query({
      query,
      variables,
    });
    return response.data;
  }

  async post(query: DocumentNode, variables: Record<string, any>): Promise<any> {
    return this.mutateRequest(query, variables);
  }

  async get(query: DocumentNode, variables: Record<string, any>): Promise<any> {
    const response = await this.client.query({
      query,
      variables,
    });
    return response.data;
  }

  async put(query: DocumentNode, variables: Record<string, any>): Promise<any> {
    return this.mutateRequest(query, variables);
  }

  async delete(query: DocumentNode, variables: Record<string, any>): Promise<any> {
    return this.mutateRequest(query, variables);
  }
}

export default GraphQLService;
