import { BoxType } from "@ozmap/ozmap-sdk"

export interface ICreateBoxTypeUseCase {
    prepare(boxTypeName: string)
    execute(): Promise<BoxType>
}