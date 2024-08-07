export class UnacceptableError extends Error {
  constructor(message?: string) {
    super(message);

    if (Error.captureStackTrace) Error.captureStackTrace(this, UnacceptableError);

    this.name = "UnacceptableError";
  }
}
