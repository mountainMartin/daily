export class ForbiddenError extends Error {
  constructor(message?: string) {
    super(message);

    if (Error.captureStackTrace) Error.captureStackTrace(this, ForbiddenError);

    this.name = "ForbiddenError";
  }
}
