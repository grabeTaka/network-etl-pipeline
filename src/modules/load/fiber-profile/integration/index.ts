import { ILoadFiberProfileIntegration } from './type'
import OZMapSDK, { FiberProfile, FilterOperator } from '@ozmap/ozmap-sdk'
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

export class LoadFiberProfileIntegration
    implements ILoadFiberProfileIntegration
{
    private sdk: OZMapSDK
    constructor() {
        this.sdk = sdkInstace.getSdkInstance()
    }
    create(): Promise<FiberProfile> {
        return rateLimiter.schedule(async () =>
            this.sdk.fiberProfile.create({
                name: 'G.652D',
                fibers: [],
                tubes: [],
            }),
        )
    }

    async findByFilter(
        value: string | number,
        key: string,
    ): Promise<FiberProfile> {
        return rateLimiter.schedule(
            async () =>
                await this.sdk.fiberProfile.findOne({
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

export const loadFiberProfileIntegration = new LoadFiberProfileIntegration()
