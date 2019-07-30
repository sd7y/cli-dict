export class Sound {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    speak() {
        console.log(this.url.gray);
    }
}