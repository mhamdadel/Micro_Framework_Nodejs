import AppTerms from "./LanguageTerms/appTerms";
import ResponseTerms from "./LanguageTerms/responseTerms";

// 200 - OK
export const Ok = {
  statusCode: 200,
  status: AppTerms.SUCCESS,
  message: ResponseTerms.REQUEST_SUCCESSFUL
};

// 201 - Created
export const Created = {
  statusCode: 201,
  status: AppTerms.SUCCESS,
  message: ResponseTerms.RESOURCE_CREATED 
};

// 204 - No Content
export const NoContent = {
  statusCode: 204,
  status: AppTerms.SUCCESS,
  message: ResponseTerms.NO_CONTENT
};

// 400 - Bad Request
export const BadRequest = {
  statusCode: 400,
  status: AppTerms.ERROR,
  message: ResponseTerms.BAD_REQUEST
};

// 401 - Unauthorized
export const Unauthorized = {
  statusCode: 401,
  status: AppTerms.ERROR,
  message: ResponseTerms.UNAUTHORIZED 
};

// 403 - Forbidden
export const Forbidden = {
  statusCode: 403,
  status: AppTerms.ERROR,
  message: ResponseTerms.FORBIDDEN
};

// 404 - Not Found
export const NotFound = {
  statusCode: 404,
  status: AppTerms.ERROR,
  message: ResponseTerms.PAGE_NOT_FOUND
};

// 500 - Internal Server Error
export const InternalServerError = {
  statusCode: 500,
  status: AppTerms.ERROR,
  message: ResponseTerms.INTERNAL_SERVER_ERROR
};

// 501 - Not Implemented
export const NotImplemented = {
  statusCode: 501,
  status: AppTerms.ERROR,
  message: ResponseTerms.NOT_IMPLEMENTED
};

// 502 - Bad Gateway
export const BadGateway = {
  statusCode: 502,
  status: AppTerms.ERROR,
  message: ResponseTerms.BAD_GATEWAY
};

// 503 - Service Unavailable
export const ServiceUnavailable = {
  statusCode: 503,
  status: AppTerms.ERROR,
  message: ResponseTerms.SERVICE_UNAVAILABLE
};

// 520 - Unknown Error
export const UnknownError = {
  statusCode: 520,
  status: AppTerms.ERROR,
  message: ResponseTerms.UNKNOWN_ERROR
};
