export class ServiceUnavailableError extends Error {
  constructor(message?: string) {
    super(message);

    if (Error.captureStackTrace) Error.captureStackTrace(this, ServiceUnavailableError);

    this.name = "ServiceUnavailableError";
  }
}
