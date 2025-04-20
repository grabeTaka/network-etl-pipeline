import { UnifiedBoxData } from '@/modules/orchestrator/job/use-cases/unify-data-from-extract-use-case/type'

export interface ICreateFlowDataUseCase {
    prepare: (boxesEnriched: UnifiedBoxData[]) => void
    execute: () => Promise<void>
}
