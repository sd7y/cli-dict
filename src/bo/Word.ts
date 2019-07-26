export class Word {
    source: string;
    sound: Sound;
    description: string;
    phoneticSymbol: string;

    constructor(source: string, soundUrl: string, phoneticSymbol: string, description: string) {
        this.source = source;
        this.sound = new Sound(soundUrl);
        this.description = description;
        this.phoneticSymbol = phoneticSymbol;
    }
}