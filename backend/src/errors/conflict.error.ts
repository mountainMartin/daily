export class ConflictError extends Error {
  constructor(message?: string) {
    super(message);

    if (Error.captureStackTrace) Error.captureStackTrace(this, ConflictError);

    this.name = "ConflictError";
  }
}
