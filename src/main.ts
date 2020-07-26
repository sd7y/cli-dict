import { QueryManager } from "./services/QueryManager.ts";
import { printWord } from './utils/printWord.ts';
import { speak } from './utils/speak.ts';
import { TextUtils } from "./utils/TextUtils.ts";
import { StoreServiceJsonImpl } from "./services/StoreServiceJsonImpl.ts";

let query = QueryManager.getInstance('baidu');

let text = Deno.args[0];

let from = 'zh';
let to = 'en';
if (TextUtils.isEnglish(text)) {
    from = 'en';
    to = 'zh';
}
let word = await query.query(text, from, to);

new StoreServiceJsonImpl().save(word);
printWord(word);
if (word.from === 'en') {
    speak(word);
}