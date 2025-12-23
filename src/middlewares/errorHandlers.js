import responseError from "../errors/responseError.js";

export function errorHandlers(err, req, res, next) {
    if (!err){
        return next();
    }

    if (err instanceof responseError) {
        return res.status(err.code).json({
            message: err.message,
            success: err.success,
            code: err.code,
            data: null
        });
    }

    return res.status(500).json({
        message: 'Internal Server Error',
        stacktrace: err,
        success: false,
        code: 500,
        data: null
    });
}