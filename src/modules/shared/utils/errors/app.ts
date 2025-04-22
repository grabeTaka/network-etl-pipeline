import { HttpStatusCode } from '@/modules/shared/utils/enums/http-status-code'

export interface Options {
    code?: string
    message: string
    translateParams?: Record<string, any>
    description?: string
    metadata?: Record<string, any>
    statusCode?: HttpStatusCode
    originalError?: Error
}

export class AppError extends Error {
    statusCode: HttpStatusCode
    code: any
    description: string
    metadata: {}
    translateParams: {}
    constructor(options: Options) {
        super(options.message)

        Object.setPrototypeOf(this, AppError.prototype)

        const {
            code = 'default',
            description = null,
            metadata,
            originalError,
            statusCode = HttpStatusCode.BAD_REQUEST,
            translateParams,
        } = options

        this.name = 'AppError'

        this.defineProperty('code', code)
        this.defineProperty('metadata', metadata)
        this.defineProperty('statusCode', statusCode)
        this.defineProperty('description', description)
        this.defineProperty('translateParams', translateParams)

        this.defineProperty('originalError', {
            name: originalError?.name,
            message: originalError?.message,
            stack: originalError?.stack?.split('\n'),
        })

        Error.captureStackTrace(this, this.constructor)
    }

    protected defineProperty(key: string, value: any) {
        Object.defineProperty(this, key, {
            writable: false,
            enumerable: true,
            value,
        })
    }
}
