import { ILoadBoxTypeIntegration } from './type'
import OZMapSDK, { BoxType, FilterOperator } from '@ozmap/ozmap-sdk'
import { sdkInstace } from '@/modules/shared/utils/sdk-instance'

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

//TODO Add to shared file the errors

export class LoadBoxTypeIntegration implements ILoadBoxTypeIntegration {
    private sdk: OZMapSDK
    constructor() {
        this.sdk = sdkInstace.getSdkInstance()
    }
    create(boxTypeCode: string): Promise<BoxType> {
        return this.sdk.boxType.create({
            code: boxTypeCode,
            default_reserve: 0,
            config: {
                base: {
                    color: '#1F2937',
                },
                regular: {
                    fillColor: '#3B82F6',
                },
                not_implanted: {
                    fillColor: '#F87171',
                },
                draft: {
                    fillColor: '#FBBF24',
                },
            },
        })
    }

    async findByFilter(value: string | number, key: string): Promise<BoxType> {
        return await this.sdk.boxType.findOne({
            filter: [
                {
                    property: key,
                    operator: FilterOperator.EQUAL,
                    value: value,
                },
            ],
        })
    }
}

export const loadBoxTypeIntegration = new LoadBoxTypeIntegration()
