import { Translator } from "./Translator";
import { YoudaoTranslator } from "./YoudaoTranslator";

export class TranslatorProxy {
    static getInstance(): Translator {
        return new YoudaoTranslator();
    }
}