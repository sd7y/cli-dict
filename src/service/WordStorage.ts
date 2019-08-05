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
        return this.parseWordList(JSON.parse(fs.readFileSync(WordStorage.path, 'utf-8')));
    }

    static get(query: string): Word | null {
        let list = WordStorage.load();
        for (let i in list) {
            if (list[i].source === query) {
                return this.parseWord(list[i]);
            }
        }
        return null;
    }

    static parseWord(json: any): Word {
        return new Word(json.source, json.sound.url, json.phonetic, json.translation, json.explains);
    }

    static parseWordList(json: any): Word[] {
        let list: Word[] = [];
        for (let i = 0; i < json.length; i++) {
            list.push(WordStorage.parseWord(json[i]));
        }
        return list;
    }

}