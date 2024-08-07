export class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(message);

    if (Error.captureStackTrace) Error.captureStackTrace(this, UnauthorizedError);

    this.name = "UnauthorizedError";
  }
}
