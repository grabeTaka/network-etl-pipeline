import { boxModel } from "@/modules/registry/box/model";
import { BoxSchema } from "@/modules/registry/box/schema";
import { ICreateBoxUseCase } from "@/modules/registry/box/use-cases/create-box-use-case/types";

export class CreateBoxUseCase implements ICreateBoxUseCase {
    box: BoxSchema;
    boxModel = boxModel;

    prepare = (box: BoxSchema): void => {
        this.box = box
    }

    execute = async (): Promise<BoxSchema> => {
        return await this.boxModel.create(this.box)
    }
}
