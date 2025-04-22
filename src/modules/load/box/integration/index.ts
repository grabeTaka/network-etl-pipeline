import { ILoadBoxIntegration } from '@/modules/load/box/integration/type'
import OZMapSDK, { Box, CreateBoxDTO, UpdateBoxDTO } from '@ozmap/ozmap-sdk'
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

export class LoadBoxIntegration implements ILoadBoxIntegration {
    private sdk: OZMapSDK
    private projectId: string

    constructor() {
        this.sdk = sdkInstace.getSdkInstance()
        this.projectId = sdkInstace.getProjectId()
    }

    create(data: CreateBoxDTO): Promise<Box> {
        return rateLimiter.schedule(
            async () =>
                await this.sdk.box.create({
                    project: this.projectId,
                    coords: data.coords,
                    hierarchyLevel: 0,
                    boxType: data.boxType as string,
                    implanted: false,
                    name: data.name,
                }),
        )
    }

    async update(data: UpdateBoxDTO, id: string): Promise<void> {
        const updateBoxData: UpdateBoxDTO = {
            coords: data.coords,
            hierarchyLevel: 0,
            boxType: data.boxType as string,
            implanted: false,
            name: data.name,
        }

        return rateLimiter.schedule(
            async () => await this.sdk.box.updateById(id, updateBoxData),
        )
    }
}

export const loadBoxIntegration = new LoadBoxIntegration()
