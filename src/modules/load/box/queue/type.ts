import { BoxSchema } from "@/modules/extract/box/schema";

//TODO  change type here after transformers been done
export interface IQueueBoxLoader {
    init: (data: BoxSchema) => void
}