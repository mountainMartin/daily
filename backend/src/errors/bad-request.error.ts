export class BadRequestError extends Error {
  constructor(message?: string) {
    super(message);

    if (Error.captureStackTrace) Error.captureStackTrace(this, BadRequestError);

    this.name = "BadRequestError";
  }
}
