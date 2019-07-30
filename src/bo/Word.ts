import { Sound } from "./Sound";

export class Word {
    source: string;
    sound: Sound;
    translation: string[];
    phonetic: string[];
    explains: string[];

    constructor(source: string, soundUrl: string, phonetic: string[], translation: string[], explains: string[]) {
        this.source = source;
        this.sound = new Sound(soundUrl);
        this.translation = translation;
        this.phonetic = phonetic;
        this.explains = explains;
    }
}