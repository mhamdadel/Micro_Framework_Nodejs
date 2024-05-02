import HttpException from "./HttpException";

class NotFoundException extends HttpException{
  constructor({ url }: { url: string }) {
    super(404, "Failed", "NOT_FOUND", `The requested URL ${url} was not found on this server.`);
  }
}

export default NotFoundException;