import { ILoadCableTypeIntegration } from './type'
import OZMapSDK, { CableType, FilterOperator } from '@ozmap/ozmap-sdk'
import { sdkInstace } from '@/modules/shared/utils/sdk-instance'
import { rateLimiter } from '@/modules/shared/utils/rate-limiter'

export class Errors extends Error {
    public code: number
    constructor(error) {
        const errorData = error.response?.data || {}
        const errorStatus = error.response?.status || null
        const errorMessage = errorData.message || null
        const errorRequest = error.request || {}
        super(errorMessage || 'Error in integration')
        Error.captureStackTrace(this, this.constructor)
        this.name = 'Error in integration'
        this.code = errorStatus || 400
        console.error({
            request: {
                method: errorRequest.method,
                path: errorRequest.path,
            },
            response: errorData,
        })
    }
}

export class LoadCableTypeIntegration implements ILoadCableTypeIntegration {
    private sdk: OZMapSDK
    constructor() {
        this.sdk = sdkInstace.getSdkInstance()
    }
    create(fiberProfileId: string): Promise<CableType> {
        return rateLimiter.schedule(async () =>
            this.sdk.cableType.create({
                code: '1L6F',
                default_level: 1,
                config: {
                    regular: {
                        color: '#0000FF',
                        weight: 2,
                    },
                    not_implanted: {
                        color: '#FF0000',
                        weight: 1,
                    },
                },
                fiberProfile: fiberProfileId,
                fiberNumber: 6,
                looseNumber: 1,
                base_loss: 0.4,
            }),
        )
    }

    async findByFilter(
        value: string | number,
        key: string,
    ): Promise<CableType> {
        return rateLimiter.schedule(
            async () =>
                await this.sdk.cableType.findOne({
                    filter: [
                        {
                            property: key,
                            operator: FilterOperator.EQUAL,
                            value: value,
                        },
                    ],
                }),
        )
    }
}

export const loadCableTypeIntegration = new LoadCableTypeIntegration()
