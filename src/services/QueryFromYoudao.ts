import { QueryService } from "./QueryService.ts";
import { Word } from "../entities/Word.ts";

export class QueryFromYoudao implements QueryService {
    type = "youdao";
    async query(text: string, from: string, to: string) {
        return new Word(text, from, to);
    }
}