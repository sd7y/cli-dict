import { Word } from "../bo/Word";
import * as fs from 'fs';
import { WordList } from "../bo/WordList";

export class WordListStorage {

    static path = './word-list.json';

    static store(word: Word) {
        // let list = HistoryStorage.load();
        // for (let i in list) {
        //     if (word.source === list[i].source) {
        //         return;
        //     }
        // }
        // list.push(word);
        // fs.writeFileSync(HistoryStorage.path, JSON.stringify(list, null, 2));
    }

    static load(): WordList[] {
        // if (!fs.existsSync(HistoryStorage.path)) {
        //     return [];
        // }
        // return JSON.parse(fs.readFileSync(HistoryStorage.path, 'utf-8'));
        return [];
    }

    static get(query: string): WordList | null {
        // let list = HistoryStorage.load();
        // for (let i in list) {
        //     if (list[i].source === query) {
        //         return list[i];
        //     }
        // }
        // return null;
        return null;
    }
}