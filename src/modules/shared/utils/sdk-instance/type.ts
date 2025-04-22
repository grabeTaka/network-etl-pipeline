import OZMapSDK from '@ozmap/ozmap-sdk'

export interface TSdkInstance {
    getSdkInstance: () => OZMapSDK
    getProjectId: () => string
}
