import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  res.status(500).json({ message: 'Unexpected error' });
};

export default errorMiddleware;
