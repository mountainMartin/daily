export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message);

    if (Error.captureStackTrace) Error.captureStackTrace(this, NotFoundError);

    this.name = "NotFoundError";
  }
}
