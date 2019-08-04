#!/home/alex/devp/software/node-v10.15.0-linux-x64/bin/node

import 'colors';
import {YoudaoTranslator} from './service/YoudaoTranslator'
import commander from 'commander';
import { WordHelper } from './common/WordHelper';
import { Translator } from './service/Translator';
import { HistoryStorage } from './service/HistoryStorage';


commander.parse(process.argv);

commander
  .version('0.1.0')
  .usage('[word] [Options]')
  .option('-l, --list', 'Show the list of word.')
//   .option('-s, --sync', 'Sync the word list to git.')
  .option('-d, --delete [word]', 'Delete a word from the list.')
//   .option('-q, --quiet', 'If there is -q/--quiet or env.FY_QUIET=true, then no sound.')
  .option('--oneline', 'If there is --oneline or env.FY_ONELINE=true, then will show the result in one line.')
  .parse(process.argv);

let oneLine = commander.oneline || process.env.FY_ONELINE === 'true'

if (commander.delete) {
    let query = commander.args.join(' ');
    HistoryStorage.delete(query);
} else if (commander.list) {
    HistoryStorage.load().forEach((history, index, array) => {
        oneLine = true;
        translate(history.word);
    });
} else {
    let query = commander.args.join(' ');
    translate(query);
}

async function translate(query: string) {

    let word = await new YoudaoTranslator().translate(query, '', '');
    if (oneLine) {
        WordHelper.printOneLine(word);
    } else {
        WordHelper.print(word);
    }
}

