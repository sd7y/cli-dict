import { Sound } from "./Sound";

export class Word {
    source: string;
    sound: Sound;
    translation: string[];
    phonetic: string[];
    explains: string[];

    static Builder(): Builder {
        return new Builder();
    }

    constructor(source: string, soundUrl: string, phonetic: string[], translation: string[], explains: string[]) {
        this.source = source;
        this.sound = new Sound(soundUrl);
        this.translation = translation;
        this.phonetic = phonetic;
        this.explains = explains;
    }
}

class Builder {
    private word: Word = new Word('', '', [], [], []);
    setSource(source: string): Builder {
        this.word.source = source;
        return this;
    }
    setSound(soundUrl: string): Builder {
        this.word.sound = new Sound(soundUrl);
        return this;
    }
    addTranslation(translation: string): Builder {
        this.word.translation.push(translation);
        return this;
    }
    addPhonetic(phonetic: string): Builder {
        this.word.phonetic.push(phonetic);
        return this;
    }
    addExplain(explain: string): Builder {
        this.word.explains.push(explain);
        return this;
    }
    build() {
        return this.word;
    }
}