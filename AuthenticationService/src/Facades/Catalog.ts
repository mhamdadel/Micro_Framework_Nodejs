import { Model, Document, QueryOptions } from 'mongoose';

interface PaginationOptions {
  page?: number;
  pageSize?: number;
  totalRecords?: number;
  totalPages?: number;
}

interface FieldFilters {
  [fieldName: string]: string | number | boolean | { min: number; max: number };
}

interface CatalogOptions<T extends Document> {
  Model: Model<T>;
  pagination?: PaginationOptions;
  fieldFilters?: FieldFilters;
  fieldSort?: string;
  projection: Record<string, any>;
}

class Catalog<T extends Document> {
  allowPageSize: number[];
  defaultPageSize: number;
  filter: Record<string, any>;
  sort: Record<string, number>;
  Model: Model<T>;
  fieldSort: string;
  fieldFilters: FieldFilters;
  projection: Record<string, any>;
  pagination: PaginationOptions;
    schema: any;

  constructor({ Model, pagination = {}, fieldFilters = {}, fieldSort = '', projection }: CatalogOptions<T>) {
    this.allowPageSize = [5, 10, 25, 50, 100];
    this.defaultPageSize = 10;
    this.filter = {};
    this.sort = {};
    this.Model = Model;
    this.fieldSort = fieldSort;
    this.fieldFilters = fieldFilters;
    this.projection = projection;
    this.pagination = pagination;
    this.pagination.page = pagination.page || 1;
    this.pagination.pageSize = pagination.pageSize || this.defaultPageSize;
  }

  async buildQuery(): Promise<{ data: T[]; pagination: PaginationOptions }> {
    try {
      let limit = this.defaultPageSize;
      if (this.pagination && this.allowPageSize.includes(this.pagination.pageSize || 0)) {
        limit = this.pagination.pageSize || this.defaultPageSize;
      }
      const skip = (this.pagination?.page || 1 - 1) * limit;
      this.buildFilter();
      this.buildSort();
      const data = await this.Model.find(this.filter, this.projection, {
        sort: this.sort as QueryOptions['sort'],
        skip,
        limit,
      });
      const totalRecords = await this.Model.countDocuments(this.filter);
      const totalPages = Math.ceil(totalRecords / limit);
      return {
        data,
        pagination: {
          page: this.pagination?.page || 1,
          pageSize: limit,
          totalRecords,
          totalPages,
        },
      };
    } catch (e) {
      throw e;
    }
  }

  buildSort() {
    try {
      if (this.fieldSort) {
        if (this.fieldSort.startsWith('-')) {
          this.sort[this.fieldSort] = -1;
        } else {
          this.sort[this.fieldSort] = 1;
        }
      }
    } catch (e) {
      throw e;
    }
  }

  buildFilter() {
    for (const [fieldName, fieldValue] of Object.entries(this.fieldFilters)) {
      const fieldSchema: any = this.schema[fieldName];
      if (fieldSchema) {
        if (typeof fieldValue === 'string' && fieldSchema.type === String) {
          this.addTextSearch(fieldName, fieldValue);
        } else if (typeof fieldValue === 'object' && fieldSchema.type === Number) {
          if (typeof fieldValue.min === 'number' && typeof fieldValue.max === 'number') {
            this.addRange(fieldName, fieldValue);
          } else {
            throw new Error(`Invalid range for field ${fieldName}: ${JSON.stringify(fieldValue)}`);
          }
        } else if (typeof fieldValue === 'boolean' && fieldSchema.type === Boolean) {
          this.filter[fieldName] = fieldValue;
        } else {
          throw new Error(`Invalid value for field ${fieldName}: ${JSON.stringify(fieldValue)}`);
        }
      }
    }
    return true;
  }

  addTextSearch(fieldName: string, fieldValue: string) {
    if (fieldValue) this.filter[fieldName] = { $regex: new RegExp(fieldValue, 'i') };
  }

  addRange(fieldName: string, range: { min: number; max: number }) {
    this.filter[fieldName] = {};
    if (range.min && !isNaN(Number(range.min))) {
      this.filter[fieldName].$gte = Number(range.min);
    } else {
      throw new Error(`Invalid range for field ${fieldName}: ${JSON.stringify(range)}`);
    }
    if (range.max && !isNaN(Number(range.max))) {
      this.filter[fieldName].$lte = Number(range.max);
    } else {
      throw new Error(`Invalid range for field ${fieldName}: ${JSON.stringify(range)}`);
    }
  }
  
}

export default Catalog;
