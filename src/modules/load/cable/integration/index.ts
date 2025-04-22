import { ILoadCableIntegration } from '@/modules/load/cable/integration/type'
import OZMapSDK, {
    Cable,
    CreateCableDTO,
    UpdateCableDTO,
} from '@ozmap/ozmap-sdk'
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

export class LoadCableIntegration implements ILoadCableIntegration {
    private sdk: OZMapSDK
    private projectId: string

    constructor() {
        this.sdk = sdkInstace.getSdkInstance()
        this.projectId = sdkInstace.getProjectId()
    }

    create(data: CreateCableDTO): Promise<Cable> {
        data.project = this.projectId
        return rateLimiter.schedule(
            async () => await this.sdk.cable.create(data),
        )
    }

    async update(data: UpdateCableDTO, id: string): Promise<void> {
        return rateLimiter.schedule(
            async () => await this.sdk.cable.updateById(id, data),
        )
    }
}

export const loadCableIntegration = new LoadCableIntegration()
