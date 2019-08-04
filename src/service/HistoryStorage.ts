import { Word } from "../bo/Word";
import * as fs from 'fs';
import { History } from "../bo/History";
import { DateUtils } from "../common/DateUtils";

export class HistoryStorage {

    static path = './.data/word-list.json';

    static store(word: Word) {
        let list = HistoryStorage.load();
        let history = HistoryStorage.getHistoryByWord(word.source, list);
        if (!history) {
            history = new History(word.source, []);
            list.push(history);
        }
        history.history.push(DateUtils.format(new Date(), 'yyyy-MM-dd HH:mm:ss.S'));
        fs.writeFileSync(HistoryStorage.path, JSON.stringify(list, null, 2));
    }

    static load(): History[] {
        if (!fs.existsSync(HistoryStorage.path)) {
            return [];
        }
        return JSON.parse(fs.readFileSync(HistoryStorage.path, 'utf-8'));
    }

    static get(word: string): History | null {
        return HistoryStorage.getHistoryByWord(word, HistoryStorage.load());
    }

    private static getHistoryByWord(word: string, list: History[]): History | null {
        for (let i in list) {
            if (list[i].word === word) {
                return list[i];
            }
        }
        return null;
    }
}