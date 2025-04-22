import { Request, Response, NextFunction } from 'express'
import { AppError } from '@/modules/shared/utils/errors/app'
import { HttpStatusCode } from '@/modules/shared/utils/enums/http-status-code'
import { logger } from '@/modules/shared/utils/logger'

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (err instanceof AppError) {
        return res.status(err.statusCode || HttpStatusCode.BAD_REQUEST).json({
            code: err.code,
            message: err.message,
            description: err.description || 'No description provided',
            metadata: err.metadata || {},
            translateParams: err.translateParams || {},
        })
    }

    logger.error({ message: err.message })

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        code: 'internal_server_error',
        message: 'An unexpected error occurred.',
    })
}
