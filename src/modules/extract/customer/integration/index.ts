import axios, { AxiosInstance } from 'axios'
import { IExtractCustomerIntegration } from '@/modules/extract/customer/integration/type'
import { CustomerSchema } from '@/modules/extract/customer/schema'

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

export class ExtractCustomerIntegratrion
    implements IExtractCustomerIntegration
{
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
    async findOne(id: number): Promise<CustomerSchema> {
        const response = await this.api(`/customers/${id}`)
        return response.data
    }

    getAll = async (): Promise<CustomerSchema[]> => {
        const response = await this.api.get('/customers')
        return response.data
    }
}
