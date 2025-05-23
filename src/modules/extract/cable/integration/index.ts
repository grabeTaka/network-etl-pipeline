import axios, { AxiosInstance } from 'axios'
import { IExtractCableIntegration } from '@/modules/extract/cable/integration/type'
import { CableSchema } from '@/modules/extract/cable/schema'

export class SourceExtractorErrors extends Error {
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

export class ExtractCableIntegration implements IExtractCableIntegration {
    private url: string = 'http://json-server:4000'
    private api: AxiosInstance

    constructor() {
        this.api = axios.create({
            baseURL: this.url,
        })
        this.api.interceptors.response.use(
            (response) => response,
            (error) => {
                return Promise.reject(new SourceExtractorErrors(error))
            },
        )
    }
    async findOne(id: number): Promise<CableSchema> {
        const response = await this.api.get(`/cables/${id}`)
        return response.data
    }

    getAll = async (): Promise<CableSchema[]> => {
        const response = await this.api.get('/cables')
        return response.data
    }
}
