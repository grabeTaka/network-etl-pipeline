import { BoxSchema } from "@/modules/extract/box/schema";

export interface ICreateBoxLoaderUseCase {
    prepare(data: BoxSchema): void
    execute(): Promise<void>
}