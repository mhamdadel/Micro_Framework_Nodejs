interface IRESTTemplateOptions {
  url: string,
  headers?: Record<string, string>,
}

export default class RESTTemplate {
  private options: IRESTTemplateOptions;

  constructor(options: IRESTTemplateOptions) {
    this.options = options;
  }

  

}