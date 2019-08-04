import { Word } from "../bo/Word";
import * as fs from 'fs';

export class WordStorage {

    static path = './.data/storage.json';

    static store(word: Word) {
        let list = WordStorage.load();
        for (let i in list) {
            if (word.source === list[i].source) {
                return;
            }
        }
        list.push(word);
        fs.writeFileSync(WordStorage.path, JSON.stringify(list, null, 2));
    }

    static load(): Word[] {
        if (!fs.existsSync(WordStorage.path)) {
            return [];
        }
        return JSON.parse(fs.readFileSync(WordStorage.path, 'utf-8'));
    }

    static get(query: string): Word | null {
        let list = WordStorage.load();
        for (let i in list) {
            if (list[i].source === query) {
                return list[i];
            }
        }
        return null;
    }
}