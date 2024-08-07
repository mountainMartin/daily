export class UnprocessableError extends Error {
  constructor(message?: string) {
    super(message);

    if (Error.captureStackTrace) Error.captureStackTrace(this, UnprocessableError);

    this.name = "UnprocessableError";
  }
}
