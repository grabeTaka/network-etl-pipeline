import OZMapSDK from '@ozmap/ozmap-sdk'

export class SdkInstance {
    private sdk: OZMapSDK
    private sdkProjectId: string

    constructor() {
        const { SDK_BASE_URL, SDK_KEY, SDK_PROJECT_ID } = process.env

        if (!SDK_BASE_URL || !SDK_KEY || !SDK_PROJECT_ID) {
            throw Error(
                'Please, check your .env file maybe values of sdk isnt present.',
            )
        }

        this.sdk = new OZMapSDK(SDK_BASE_URL, { apiKey: SDK_KEY })
        this.sdkProjectId = SDK_PROJECT_ID
    }

    public getSdkInstance = (): OZMapSDK => {
        return this.sdk
    }

    public getProjectId = (): string => {
        return this.sdkProjectId
    }
}

export const sdkInstace = new SdkInstance()
