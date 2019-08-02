import { Word } from '../bo/Word'
import { WordStorage } from './WordStorage';
export abstract class Translator {
    abstract translate(source: string, from: string, to: string): Promise<Word>;

    storage(word: Word): void {
        WordStorage.load();
        WordStorage.store(word);
    }

    saveHistory(word: Word): void {
        let list = WordStorage.load();
    }
}