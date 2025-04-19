import { BoxSchema } from "@/modules/extract/box/schema";



export interface IBoxesDataJobOrchestratorUseCase {
    prepare(data: BoxSchema[])
    execute(): void
}