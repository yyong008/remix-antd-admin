type HttpExceptionOption = {
  res: Response;
  message?: string;
  cause?: Error;
};

export class HttpException extends Error {
  readonly res?: Response;
  readonly status?: number;

  constructor(status: number = 500, options?: HttpExceptionOption) {
    super(options?.message, { cause: options?.cause });
    this.status = status;
    this.res = options?.res;
  }
  getResponse() {
    if (this.res) {
      return new Response(this.res.body, {
        status: this.status,
        headers: this.res.headers,
      });
    }

    return new Response(this.message, {
      status: this.status,
    });
  }
}
