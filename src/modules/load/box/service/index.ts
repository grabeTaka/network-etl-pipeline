import { CreateBoxLoaderUseCase } from "../use-case/create-box-loader-use-case"
import { IBoxLoaderService } from "@/modules/load/box/service/type"

export class BoxLoaderService implements IBoxLoaderService {
    create = async () => {
        const useCase = new CreateBoxLoaderUseCase()
        await useCase.execute()
    }
}

export const boxLoaderService = new BoxLoaderService()