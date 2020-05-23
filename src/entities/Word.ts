
export class Word {
    proto: string;
    third!: string;
    ing!: string;
    done!: string;
    plural!: string;
    past!: string;

    tags: string[] = [];
    phonetics!: Phonetic;
    means: Means[] = [];

    video!: string;

    constructor(proto: string) {
        this.proto = proto;
    }

    addTags(tags: string[]) {
        this.tags = this.tags.concat(tags);
    }

    addPhonetic(en: string, am: string, emphasize: string) {
        this.phonetics = new Phonetic(en, am, emphasize);
    }

    addMeans(part: string, text: string, means: string[]) {
        this.means.push(new Means(part, text, means));
    }

}

class Phonetic {
    en: string;
    am: string;
    emphasize: string;

    constructor(en: string, am: string, emphasize: string) {
        this.en = en;
        this.am = am;
        this.emphasize = emphasize;
    }
}

class Means {
    part: string;
    text: string;
    means: string[];

    constructor(part: string, text: string, means: string[]) {
        this.part = part;
        this.text = text;
        this.means = means;
    }
}