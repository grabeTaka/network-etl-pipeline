import { BoxSchema } from "@/modules/extract/box/schema";
import { IQueueBoxLoader } from "@/modules/load/box/queue/type";
import { CreateBoxLoaderUseCase } from "@/modules/load/box/use-case/create-box-loader-use-case";

export class QueueBoxLoader implements IQueueBoxLoader {
    init = (data: BoxSchema): void => {
        const createBoxLoaderUseCase = new CreateBoxLoaderUseCase()
        createBoxLoaderUseCase.prepare(data);
        createBoxLoaderUseCase.execute()
    };
}