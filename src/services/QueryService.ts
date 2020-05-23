import { Word } from "../entities/Word.ts";

export interface QueryService {
    type: string;
    query(text: string, from: string, to: string): Promise<Word>;
}