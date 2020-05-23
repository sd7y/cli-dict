import { Word } from "../entities/Word.ts";
import { sprintf } from 'https://deno.land/std@v0.52.0/fmt/sprintf.ts';
import * as c from 'https://deno.land/std@v0.52.0/fmt/colors.ts';

const S = sprintf;

export function printWord(word: Word) {
    if (word.from === 'en') {
        console.log(printPhonetics(word));
    }
    console.log(stringifyMeans(word));
    if (word.from === 'en') {
        console.log(stringifyExchanges(word));
    }
}

function printPhonetics(word: Word) {
    return S("[%s]; 英: [%s]; 美: [%s]", 
        c.yellow(word?.phonetics?.emphasize || ""), 
        word?.phonetics?.en || "", 
        word?.phonetics?.am || "")
}

function stringifyExchange(title: string, value: string) {
    if (value) {
        return title + ": " + value + "; ";
    }
    return "";
}

function stringifyExchanges(word: Word) {
    return stringifyExchange("原型", word.exchanges.proto)
        + stringifyExchange("复数", word.exchanges.plural)
        + stringifyExchange("三单", word.exchanges.third)
        + stringifyExchange("进行时", word.exchanges.ing)
        + stringifyExchange("过去时", word.exchanges.past)
        + stringifyExchange("过去分词", word.exchanges.done);
}

function stringifyMeans(word: Word) {
    let result: string[] = [];
    word.means.forEach(mean => {
        result.push(c.bgBlue(mean.part || "") + " " + (mean.text ? mean.text + " " : "") +  mean.means.join('; '));
    });
    return result.join('\n');
}