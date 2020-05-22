import { QueryManager } from "./services/QueryManager.ts";

let query = QueryManager.getInstance('baidu');

let word = await query.query(Deno.args[0]);
// console.log(word);
console.log(word.stringifyMeans())
console.log(word.stringifyExchanges());
console.log(word.printPhonetics())
