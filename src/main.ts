import { QueryManager } from "./services/QueryManager.ts";
import { printWord } from './utils/printWord.ts';

let query = QueryManager.getInstance('baidu');

let word = await query.query(Deno.args[0]);

printWord(word);