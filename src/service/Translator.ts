import { Word } from '../bo/Word'
import { WordStorage } from './WordStorage';
import { HistoryStorage } from './HistoryStorage';
export abstract class Translator {
    abstract translate(source: string, from: string, to: string): Promise<Word>;

    storage(word: Word): void {
        WordStorage.store(word);
    }

    saveHistory(word: Word): void {
        HistoryStorage.store(word);
    }
}