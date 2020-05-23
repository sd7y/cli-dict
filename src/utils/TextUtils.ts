export class TextUtils {
    static isEnglish(text: string) {
        let firstChar = text.charCodeAt(0);
        return (firstChar >= 65 && firstChar <= 90) || (firstChar >= 97 && firstChar <= 122);
    }
}