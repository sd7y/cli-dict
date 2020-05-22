import { Word } from "../entities/Word.ts";

export interface QueryService {
    type: string;
    query(text: string): Promise<Word>;
}