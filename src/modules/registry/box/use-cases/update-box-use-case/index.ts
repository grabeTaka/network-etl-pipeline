import mongoose from "mongoose";
import { boxModel } from "@/modules/registry/box/model";
import { BoxSchema } from "@/modules/registry/box/schema";
import { IUpdateBoxUseCase } from "@/modules/registry/box/use-cases/update-box-use-case/types";

export class UpdateBoxUseCase implements IUpdateBoxUseCase {
    id: mongoose.Types.ObjectId;
    value: Partial<BoxSchema>;
    userModel = boxModel;

    prepare = (id: string, value: Partial<BoxSchema>): void => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            //TODO ADD WINSTON HERE
        }

        this.id = new mongoose.Types.ObjectId(id)
        this.value = value
    }

    execute = async (): Promise<void> => {
        await this.userModel.updateOne({ _id: this.id }, { $set: this.value })
    }
}
