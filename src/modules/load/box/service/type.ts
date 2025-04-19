import { BoxSchema } from "@/modules/extract/box/schema";

export interface IBoxLoaderService {
    create(data: BoxSchema): void
}