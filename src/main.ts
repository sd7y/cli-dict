import 'colors';
import {DateUtils as du} from './common/DateUtils';
import {YoudaoTranslator} from './service/YoudaoTranslator'
import { Word } from './bo/Word';
import { WordStorage } from './service/WordStorage';
import commander from 'commander';
import { WordHelper } from './common/WordHelper';


commander.parse(process.argv);

let query = commander.args.join(' ');


main();

async function main() {
    console.log(du.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss.S').gray);

    let yd = new YoudaoTranslator();

    let word = await yd.translate(query, '', '');
    WordHelper.print(word);
    WordHelper.printOneLine(word);
}

