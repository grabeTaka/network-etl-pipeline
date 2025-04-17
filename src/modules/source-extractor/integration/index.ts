import axios, { AxiosInstance } from 'axios'
import { ISourceExtractorIntegration } from '@/modules/source-extractor/integration/type'
import {
    BoxSchema,
    CableSchema,
    CustomerSchema,
    DropCableSchema,
} from '@/modules/source-extractor/schema'

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

export class SourceExtractorIntegration implements ISourceExtractorIntegration {
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

    getBoxes = async (): Promise<BoxSchema[]> => {
        const response = await this.api.get('/boxes')
        return response.data
    }

    getCables = async (): Promise<CableSchema[]> => {
        const response = await this.api.get('/cables')
        return response.data
    }

    getCustomers = async (): Promise<CustomerSchema[]> => {
        const response = await this.api.get('/customers')
        return response.data
    }

    getDropCables = async (): Promise<DropCableSchema[]> => {
        const response = await this.api.get('/drop_cables')
        return response.data
    }
}

//TODO add limiter in those request
