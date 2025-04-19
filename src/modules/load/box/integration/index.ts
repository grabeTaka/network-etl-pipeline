import { ILoadBoxIntegration } from '@/modules/load/box/integration/type'
import OZMapSDK, { Box } from '@ozmap/ozmap-sdk'
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

export class LoadBoxIntegration implements ILoadBoxIntegration {
    private sdk: OZMapSDK
    private projectId: string

    constructor() {
        this.sdk = sdkInstace.getSdkInstance()
        this.projectId = sdkInstace.getProjectId()

    }
    findByFilter(value: string | number, key: string): Promise<Box> {
        throw new Error('Method not implemented.')
    }

    // TODO ADICIONAR PROJECT PARA VERIFICAR HIERARQUIA
    create(data: Box): Promise<Box> {
        return this.sdk.box.create({
            project: this.projectId,
            coords: data.coords,
            hierarchyLevel: 0,
            boxType: data.boxType as string,
            implanted: false,
            name: data.name
        })
    }
}

export const loadBoxIntegration = new LoadBoxIntegration();
