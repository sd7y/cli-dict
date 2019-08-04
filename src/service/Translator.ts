import { Word } from '../bo/Word'
import { WordStorage } from './WordStorage';
import { HistoryStorage } from './HistoryStorage';
import { YoudaoTranslator } from './YoudaoTranslator';
export abstract class Translator {

    // static getInstance(): Translator {
    //     return new YoudaoTranslator();
    // }

    abstract translate(source: string, from: string, to: string): Promise<Word>;

    static storage(word: Word): void {
        WordStorage.store(word);
    }

    static saveHistory(word: Word): void {
        HistoryStorage.store(word);
    }
}