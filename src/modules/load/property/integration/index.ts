import { ILoadPropertyIntegration } from '@/modules/load/property/integration/type'
import OZMapSDK, {
    Property,
    CreatePropertyDTO,
    UpdatePropertyDTO,
} from '@ozmap/ozmap-sdk'
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

export class LoadPropertyIntegration implements ILoadPropertyIntegration {
    private sdk: OZMapSDK
    private projectId: string

    constructor() {
        this.sdk = sdkInstace.getSdkInstance()
        this.projectId = sdkInstace.getProjectId()
    }
    findByFilter(value: string | number, key: string): Promise<Property> {
        throw new Error('Method not implemented.')
    }

    async create(data: CreatePropertyDTO): Promise<Property> {
        data.project = this.projectId
        return this.sdk.property.create(data)
    }

    async update(data: UpdatePropertyDTO, id: string): Promise<void> {
        const updatePropertyData: UpdatePropertyDTO = data

        return this.sdk.property.updateById(id, updatePropertyData)
    }
}

export const loadPropertyIntegration = new LoadPropertyIntegration()
