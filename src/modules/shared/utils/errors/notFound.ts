import { HttpStatusCode } from '@/modules/shared/utils/enums/http-status-code'
import { AppError, Options } from '@/modules/shared/utils/errors/app'

export class NotFoundError extends AppError {
    constructor(options: Options) {
        super({
            code: 'not_found',
            statusCode: HttpStatusCode.NOT_FOUND,
            ...options,
        })

        this.name = 'NotFoundError'
    }
}
