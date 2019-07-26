import {Word} from '../bo/Word'

export class YoudaoTranslator implements Translator {
    translate(source: string, from: string, to: string): Word {
        console.log('This is Youdao translator');
        // throw new Error("Method not implemented.");
        return new Word('', '', '', '');
    }
}