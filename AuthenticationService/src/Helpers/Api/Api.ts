import Service  from "@/Utilts/Interfaces/IApiService";
import Template from "@/Utilts/Interfaces/IApiTemplate";
import { RequestOptions } from "https";

class Api {
  private template: Template;
  private service: Service;

  constructor(template: Template, service: Service) {
    this.template = template;
    this.service = service;
  }

  post(resource: string, options: RequestOptions): Promise<any> {
    return this.service.post(resource, options);
  }

  get(resource: string, options: RequestOptions): Promise<any> {
    return this.service.get(resource, options);
  }

  put(resource: string, options: RequestOptions): Promise<any> {
    return this.service.put(resource, options);
  }

  delete(resource: string, options: RequestOptions): Promise<any> {
    return this.service.delete(resource, options);
  }
}