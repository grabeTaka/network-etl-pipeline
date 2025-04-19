import { BoxType } from "@ozmap/ozmap-sdk";
import { ICreateBoxTypeUseCase } from "@/modules/load/box-type/use-cases/create-box-type-use-case/type";
import { ILoadBoxTypeIntegration } from "@/modules/load/box-type/integration/type";
import { loadBoxTypeIntegration } from "@/modules/load/box-type/integration";

export class CreateBoxTypeUseCase implements ICreateBoxTypeUseCase {
    private boxTypeName: string
    private loadBoxTypeIntegration: ILoadBoxTypeIntegration

    constructor() {
        this.loadBoxTypeIntegration = loadBoxTypeIntegration
    }

    prepare(boxTypeName: string) {
        this.boxTypeName = boxTypeName
    }
    execute(): Promise<BoxType> {
        return this.loadBoxTypeIntegration.create(this.boxTypeName)
    }

}