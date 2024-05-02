import express, { Request, Response } from 'express';
import Catalog from './Catalog';
import validatorHelper from '../Helpers/validateField';
import guardByReq from '../App/Http/Middlewares/guardByReq';
// import roleRouter from '../controllers/roleController';
// import actionRouter from '../controllers/actionController';
import { Model, Document } from 'mongoose';

interface AdminFacadeOptions {
  notAllowedMethods?: string[];
  hiddenFields?: string[];
  immutableFields?: string[];
  defaultSizePerPage?: number;
  allowPageSize?: number[];
  urlTitleForOne?: string;
  urlTitleForMany?: string;
}
class AdminFacade {
  static routes: Record<string, any> = {
    create: { method: 'post', path: '/' },
    createMany: { method: 'post', path: '/' },
    getById: { method: 'get', path: '/:id' },
    getAll: { method: 'get', path: '/' },
    deleteManyByIds: { method: 'delete', path: '/' },
    deleteById: { method: 'delete', path: '/:id' },
    updateById: { method: 'put', path: '/:id' },
    // updateManyByIds: { method: 'put', path: '/' }
  };
  static app: any = express();
  static configs = {
    prefix: 'admin',
    isAuth: null,
  };
    Model: Model<any>;
    options: AdminFacadeOptions;
    rules: any;
    middlewares: any;
    notAllowedMethods: any;
    hiddenFields: any;
    immutableFields: any;
    defaultSizePerPage: any;
    allowPageSize: any;
    validEntities: any;
    urlTitleForOne: any;
    urlTitleForMany: any;
    urlForOne: string;
    urlForMany: string;

  static initializeApp() {
    AdminFacade.app.use(express.json());
    // AdminFacade.app.use(guardByReq);
    // AdminFacade.app.use(guardAppRoutes);
  }

  constructor(Model: any, options: AdminFacadeOptions = {}, rules = {}, middlewares = {}) {
    if (!Model) throw new Error('You must give me valid model in the first argument');

    this.Model = Model;
    this.options = options;
    this.rules = rules;
    this.middlewares = middlewares;

    // initialize options
    this.notAllowedMethods = options.notAllowedMethods || [];
    this.hiddenFields = options.hiddenFields || [];
    this.immutableFields = options.immutableFields || [];
    this.defaultSizePerPage = options.defaultSizePerPage || 10;
    this.allowPageSize = options.allowPageSize || [5, 10, 25, 50, 100];

    this.validEntities = {};

    this.urlTitleForOne = options?.urlTitleForOne || (new this.Model as any).constructor.modelName.toLowerCase();
    this.urlTitleForMany = options?.urlTitleForMany || this.Model.collection.collectionName;
    this.urlForOne = `/${AdminFacade.configs.prefix}/${this.urlTitleForOne}`;
    this.urlForMany = `/${AdminFacade.configs.prefix}/${this.urlTitleForMany}`;

    this.drawRoutes();
  }

   private async drawRoutes() {
    for (const methodName of Object.keys(AdminFacade.routes)) {
      const route = AdminFacade.routes[methodName];
      if (['create', 'getById', 'deleteById', 'updateById'].includes(methodName) && (!this.notAllowedMethods.includes(methodName))) {
        const isSetMiddleware = this.middlewares?.[methodName];
        if (typeof isSetMiddleware === 'function') {
          AdminFacade.app[route.method](`${this.urlForOne}${route.path}`, isSetMiddleware, this[methodName].bind(this));
        } else {
          AdminFacade.app[route.method](`${this.urlForOne}${route.path}`, this[methodName].bind(this));
        }
      } else if (!this.notAllowedMethods.includes(methodName)) {
        const isSetMiddleware = this.middlewares?.[methodName];
        if (typeof isSetMiddleware === 'function') {
          AdminFacade.app[route.method](`${this.urlForMany}${route.path}`, isSetMiddleware, this[methodName].bind(this));
        } else {
          AdminFacade.app[route.method](`${this.urlForMany}${route.path}`, this[methodName].bind(this));
        }
      }
    }
  }

  private isImmutable(fieldName: string): boolean {
    return this.immutableFields.includes(fieldName);
  }

  private projection(): string {
    let project = '';
    this.hiddenFields.forEach((hiddenField: string) => {
      project += ' -' + hiddenField;
    });
    return project;
  }

  private validator(values = {}): boolean {
    const errors: Record<string, string> = {};
    Object.entries(values).forEach(([fieldName, value]) => {
      const result = validatorHelper(value, this.rules[fieldName] || '');
      if (!result.isValid) errors[fieldName] = result.error || '';
    });

    if (Object.keys(errors).length > 0) {
      throw errors;
    }
    return true;
  }

  private async getRequiredFieldsFromSchema(body: any) {
    if (this.validEntities) return this.validEntities;
    const reservedProps: any = ['_id', 'createdAt', 'updatedAt'];
    const schemaEntities: any = this.Model.schema.obj;
    const errors: Record<string, string> = {};
    for (const key in body) {
      const entity = schemaEntities[key];
      if (!reservedProps.includes(key) && schemaEntities.hasOwnProperty(key)) {
        if (!entity || !entity.required) {
          errors[key] = key + ' field is required';
        }
        this.validEntities[key] = body[key];
      }
    }
    if (errors) throw errors;
  }

  [key: string]: any;

  private async getById(req: Request, res: Response) {
    try {
      const entity = await this.Model.findById(req.params.id, this.projection());
      if (!entity) {
        res.status(404).json();
      } else {
        res.json(entity);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  private async getAll(req: Request, res: Response) {
    try {
      const { page = 1, pageSize = this.defaultSizePerPage } = req.query;
      const sortBy = req.query.sort as string | undefined;
      const filters = { ...req.query };
      delete filters.page;
      delete filters.pageSize;
      delete filters.sort;
  
      const paginationOptions = {
        Model: this.Model,
        pagination: { page: Number(page), pageSize: Number(pageSize), allowPageSize: this.allowPageSize },
        fieldFilters: filters as Record<string, any>,
        fieldSort: sortBy,
        projection: {} as Record<string, any>,
      };
  
      const pagination = new Catalog(paginationOptions);
      const entities = await pagination.buildQuery();
      res.json(entities);
    } catch (error) {
      res.status(400).json(error);
    }
  }
  

  private async create(req: Request, res: Response) {
    try {
      this.getRequiredFieldsFromSchema(req.body);
      this.validator(req.body);
      const schemaEntities: Object = this.Model.schema.obj;
      const validEntities: any = {};

      for (const key in req.body) {
        if (req.body.hasOwnProperty(key) && schemaEntities.hasOwnProperty(key)) {
          validEntities[key] = req.body[key];
        }
      }

      const entity = new this.Model(validEntities);
      const result = await entity.save();
      res.status(201).json(result);
    } catch (error) {
      console.log(error)
      res.status(400).json(error);
    }
  }

  private async createMany(req: Request, res: Response) {
    try {
      const schemaEntities = this.Model.schema.obj;
      const validEntities = [];
  
      if (Array.isArray(req.body)) {
        for (const entityData of req.body) {
          this.validator(entityData);
          this.getRequiredFieldsFromSchema(entityData);
          const validEntityData: any = {};
  
          for (const key in entityData) {
            if (entityData.hasOwnProperty(key) && schemaEntities.hasOwnProperty(key)) {
              validEntityData[key] = entityData[key];
            }
          }
  
          validEntities.push(validEntityData);
        }
  
        const entities = await this.Model.create(validEntities);
        res.status(201).json(entities);
      } else {
        res.status(400).json({ error: 'Invalid Request Body' });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }

  private async deleteManyByIds(req: Request, res: Response) {
    try {
      if (!Array.isArray(req.body.ids)) {
        res.status(400).json({ error: 'Invalid Request Body' });
        return;
      }
  
      const result = await this.Model.deleteMany({ _id: { $in: req.body.ids } });
      res.json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  }
  
  private async deleteById(req: Request, res: Response) {
    try {
      const result = await this.Model.findByIdAndDelete(req.params.id);
      if (!result) {
        res.status(404).json();
      } else {
        res.json(result);
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }  

  private async updateById(req: Request, res: Response) {
    try {
      this.validator(req.body);
      this.getRequiredFieldsFromSchema(req.body);
      const schemaEntities = this.Model.schema.obj;
      const validEntities: any = {};
  
      for (const key in req.body) {
        if (req.body.hasOwnProperty(key) && schemaEntities.hasOwnProperty(key) && !this.isImmutable(key)) {
          validEntities[key] = req.body[key];
        }
      }
  
      const result = await this.Model.findByIdAndUpdate(req.params.id, validEntities, { new: true });
      if (!result) {
        res.status(404).json();
      } else {
        res.json(result);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
  
  private async updateManyByIds(req: Request, res: Response) {
    try {
      const schemaEntities = this.Model.schema.obj;
      const validEntities = [];
  
      if (Array.isArray(req.body)) {
        for (const entityData of req.body) {
          this.getRequiredFieldsFromSchema(entityData);
          this.validator(entityData);
          const validEntityData: any = {};
  
          for (const key in entityData) {
            if (entityData.hasOwnProperty(key) && schemaEntities.hasOwnProperty(key)) {
              validEntityData[key] = entityData[key];
            }
          }
  
          validEntities.push(validEntityData);
        }
  
        const promises = validEntities.map(entityData => {
          return this.Model.findByIdAndUpdate(entityData.id, entityData, { new: true });
        });
        const results = await Promise.all(promises);
        res.json(results);
      } else {
        res.status(400).json({ error: 'Invalid Request Body' });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }
  
  /**
 * @param {{ prefix: string; isAuth: null; }} config
 */
static configApp(config = {}) {
    const defaultConfig = {
      prefix: 'admin',
      isAuth: null,
    };
    const mergedConfig = { ...defaultConfig, ...config };
    AdminFacade.configs = mergedConfig;
    AdminFacade.app.use(guardByReq(mergedConfig.prefix));
    // AdminFacade.app.use(`/${mergedConfig.prefix}/roles`, roleRouter);
    // AdminFacade.app.use(`/${mergedConfig.prefix}/actions`, actionRouter);
    // if (!this.config.isAuth) throw ('isAuth property in config is required [your checking Authantecation middleware is required]');
    return AdminFacade.app;
  }
  
  
}

export default AdminFacade;
