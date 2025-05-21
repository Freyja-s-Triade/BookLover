
export default function notFound (_req, _res, next) {
    const error = new Error('Not found')
    error.statusCode = 404;
    next(error)
}

export default function handlerError (error, req, res, next) {
    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({message: error.message});
}