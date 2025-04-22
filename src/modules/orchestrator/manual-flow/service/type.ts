export interface IOrchestratorManualFlowService {
    fullSync(): void
    syncBox(id: number): Promise<void>
    syncProperty(id: number): Promise<void>
    syncCable(id: number): Promise<void>
}
