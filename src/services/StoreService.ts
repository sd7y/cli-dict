import { Word } from "../entities/Word.ts";

export interface StoreService {
    save(word: Word): void;
    findAll(): Word[];
    find(text: string): Word;
    delete(word: Word): void;
}