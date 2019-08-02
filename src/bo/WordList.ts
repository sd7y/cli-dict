export class WordList {

    word: string;
    queryHistory: string[];

    constructor(word: string, queryHistory: string[]) {
        this.word = word;
        this.queryHistory = queryHistory;
    }
}