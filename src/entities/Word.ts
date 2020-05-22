
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

    addMeans(part: string, means: string[]) {
        this.means.push(new Means(part, means));
    }

    printPhonetics() {
        return "[" + this.phonetics.emphasize + "]; "
            + "英: [" + this.phonetics.en + "]; "
            + "美: [" + this.phonetics.am + "]";
    }

    private stringifyExchange(title: string, value: string) {
        if (value) {
            return title + ": " + value + "; ";
        }
        return "";
    }

    stringifyExchanges() {
        return this.stringifyExchange("原型", this.proto)
            + this.stringifyExchange("复数", this.plural)
            + this.stringifyExchange("三单", this.third)
            + this.stringifyExchange("进行时", this.ing)
            + this.stringifyExchange("过去时", this.past)
            + this.stringifyExchange("过去分词", this.done);
    }

    stringifyMeans() {
        let result: string[] = [];
        this.means.forEach(mean => {
            result.push(mean.part + " " + mean.means.join('; '));
        });
        return result.join('\n');
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
    means: string[];

    constructor(part: string, means: string[]) {
        this.part = part;
        this.means = means;
    }
}