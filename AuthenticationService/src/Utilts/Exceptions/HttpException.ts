class HttpException extends Error {
  public statusCode: number;
  public status: string;
  public message: string;
  public stack: string | undefined;

  /**
   * Constructor for creating a new instance of the class.
   *
   * @param {number} statusCode - the status code for the response
   * @param {string} status - the status message
   * @param {string} message - the error message
   * @param {string} stack - the error stack trace
   */
  constructor(statusCode: number = 500, status: string = "Failed", message: string = "INTERNAL_SERVER_ERROR", stack?: string) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
    if (process.env.APPLICATION_STRATEGY === "Development") {
      this.stack = stack;
    }
  }
}

export default HttpException;