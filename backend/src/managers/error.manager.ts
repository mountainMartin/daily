import { Request, Response, NextFunction } from 'express';

type ErrorNames =
  | 'BadRequestError'
  | 'UnauthorizedError'
  | 'ForbiddenError'
  | 'NotFoundError'
  | 'UnacceptableError'
  | 'ConflictError'
  | 'UnprocessableError'
  | 'ServiceUnavailableError';

const errorMap: Record<ErrorNames, { status: number; message: string }> = {
  BadRequestError: { status: 400, message: 'Bad request' },
  UnauthorizedError: { status: 401, message: 'Unauthorized' },
  ForbiddenError: { status: 403, message: 'Forbidden' },
  NotFoundError: { status: 404, message: 'Not found' },
  UnacceptableError: { status: 406, message: 'Unacceptable' },
  ConflictError: { status: 409, message: 'Conflict' },
  UnprocessableError: { status: 422, message: 'UnprocessableError' },
  ServiceUnavailableError: { status: 503, message: 'ServiceUnavailableError' },
};

export const errorManager = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorType = errorMap[error.name as ErrorNames];

  if (errorType) {
    return res.status(errorType.status).send(error.message || errorType.message);
  } else {
    console.log('----------------------------------------------------------------------');
    console.error({
      message: error.message,
      stack: error.stack,
      path: req.path,
      method: req.method,
      body: req.body,
      query: req.query,
      params: req.params,
    });
    console.log('----------------------------------------------------------------------');

    return res.status(500).send('server error');
  }
};
