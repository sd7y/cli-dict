
import { Word } from "../entities/Word.ts";

const JSON_PATH = Deno.env.get("HOME") + '/.cli-dict';
const JSON_FILENAME = 'words.json';

export class StoreServiceJsonImpl {

    constructor() {
        createFileIfNotExisting();
    }

    save(word: Word): void {
        let allWords = this.findAll();
        console.log(allWords);
        let index = allWords.findIndex(w => w.text == word.text);
        if (index == -1) {
            allWords.push(word);
        } else {
            allWords[index] = word;
        }
        writeWords(allWords);
    }
    findAll(): Word[] {
        const decoder = new TextDecoder("utf-8");
        const data = Deno.readFileSync(JSON_PATH + '/' + JSON_FILENAME);
        return <Word[]> JSON.parse(decoder.decode(data));
    }

    find(text: string): Word | null {
        let allWords = this.findAll();
        let index = allWords.findIndex(w => w.text == text);
        if (index != -1) {
            return allWords[index];
        } else {
            return null;
        }
    }

    delete(word: Word): void {
        let allWords = this.findAll();
        let index = allWords.findIndex(w => w.text == word.text);
        
        if (index != -1) {
            allWords.splice(index, 1);
        }
        writeWords(allWords);
    }
}

function writeWords(words: Word[]) {
    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(words, null, 2));
    Deno.writeFileSync(JSON_PATH + '/' + JSON_FILENAME, data);
}

function createFileIfNotExisting() {
    if (!existsSync(JSON_PATH)) {
        Deno.mkdirSync(JSON_PATH, {
            recursive: true
        });
    }
    if (!existsSync(JSON_PATH + '/' + JSON_FILENAME)) {
        const encoder = new TextEncoder();
        const data = encoder.encode("[]\n");
        Deno.writeFileSync(JSON_PATH + '/' + JSON_FILENAME, data);
    }
}
function existsSync(filePath: string): boolean {
    try {
        Deno.lstatSync(filePath);
        return true;
    } catch (err) {
        if (err instanceof Deno.errors.NotFound) {
            return false;
        }
        throw err;
    }
}