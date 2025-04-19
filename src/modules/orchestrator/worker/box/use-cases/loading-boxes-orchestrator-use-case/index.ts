import { BoxSchema as ExtractBoxSchema } from "@/modules/extract/box/schema";
import { ILoadingBoxesOrchestratorUseCase } from "@/modules/orchestrator/worker/box/use-cases/loading-boxes-orchestrator-use-case/type";

export class LoadingBoxesOrchestratorUseCase implements ILoadingBoxesOrchestratorUseCase {
    private box: ExtractBoxSchema;
    prepare(data: ExtractBoxSchema): void {}

    execute(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}