import { IFilterBoxUseCase } from "./types";
import { BoxSchema as RegistryBoxSchema} from "@/modules/registry/box/schema/index"
import { BoxSchema as ExtractBoxSchema } from "@/modules/extract/box/schema/index"

export class FilterBoxUseCase implements IFilterBoxUseCase {
    registeredBox: RegistryBoxSchema | null;
    extractedBox: ExtractBoxSchema

    prepare = (registeredBox: RegistryBoxSchema | null, extractedBox: ExtractBoxSchema): void => {
        this.registeredBox = registeredBox
        this.extractedBox = extractedBox
    }

    execute = (): boolean => {
        if(
            this.registeredBox.coordinates[0] !== this.extractedBox.lat ||
            this.registeredBox.coordinates[1] !== this.extractedBox.lng ||
            this.registeredBox.type_name !== this.extractedBox.type ||
            this.registeredBox.name !== this.extractedBox.name
        )
            return true

        return false
    }
}
