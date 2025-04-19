import { BoxSchema as ExtractBoxSchema } from "@/modules/extract/box/schema";
import { ILoadingBoxesOrchestratorUseCase } from "@/modules/orchestrator/worker/box/use-cases/loading-boxes-orchestrator-use-case/type";
import boxService from "@/modules/registry/box/service";
import { IBoxService as IRegistryBoxService } from "@/modules/registry/box/service/type";
import { FilterBoxUseCase } from "../filter-box-use-case";

export class LoadingBoxesOrchestratorUseCase implements ILoadingBoxesOrchestratorUseCase {
    private extractedBoxData: ExtractBoxSchema;
    private registryBoxService: IRegistryBoxService;
    
    constructor() {
        this.registryBoxService = boxService;
    }

    prepare(data: ExtractBoxSchema): void {
        this.extractedBoxData = data;
    }

    async execute(): Promise<void> {
        const [registeredBox] = await this.registryBoxService.findByFilter(
            this.extractedBoxData.id,
            'external_source_id'
        );

        if (!registeredBox) {
            // TODO: Check existence of box type
            // TODO: Create box in SDK
            return;
        }

        const filterBoxUseCase = new FilterBoxUseCase();
        filterBoxUseCase.prepare(registeredBox, this.extractedBoxData);
        const boxNeedsUpdate = filterBoxUseCase.execute();
    }
}
