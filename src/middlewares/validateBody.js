import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });

    next();
  } catch (err) {
    const error = createHttpError(400, 'BadRequestError', {
      data: {
        message: 'Bad request',
        errors: err.details.map((detail) => detail.message),
      },
    });

    res.status(400).json({
      status: error.status,
      message: error.message,
      data: error.data,
    });
  }
};
