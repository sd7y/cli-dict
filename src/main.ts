#!/home/alex/devp/software/node-v10.15.0-linux-x64/bin/node

import 'colors';
import {YoudaoTranslator} from './service/YoudaoTranslator'
import commander from 'commander';
import { WordHelper } from './common/WordHelper';
import { Translator } from './service/Translator';
import { HistoryStorage } from './service/HistoryStorage';
import { TranslatorProxy } from './service/TranslatorProxy';
import { DateUtils } from './common/DateUtils';

const PKG = require('../package.json');

main();

async function main() {
    commander
        .version(PKG.version)
        .usage('[word] [Options]')
        .option('-l, --list', 'Show the list of word.')
    //   .option('-s, --sync', 'Sync the word list to git.')
        .option('-d, --delete [word]', 'Delete a word from the list.')
    //   .option('-q, --quiet', 'If there is -q/--quiet or env.FY_QUIET=true, then no sound.')
        .option('    --oneline', 'If there is --oneline or env.FY_ONELINE=true, then will show the result in one line.')
        .parse(process.argv);
    
    let oneLine = commander.oneline || process.env.FY_ONELINE === 'true'
    
    let query = commander.args.join(' ').toLowerCase();
    if (commander.delete) {
        HistoryStorage.delete(query);
    } else if (commander.list) {
        let list = HistoryStorage.load();
        list.sort((a, b) => {
            return DateUtils.parse(a.history[a.history.length - 1]).getTime() - DateUtils.parse(b.history[a.history.length - 1]).getTime();
        });
        for (let i = 0; i < list.length; i++) {
            let history = list[i];
            let word = await TranslatorProxy.getInstance().translate(history.word, '', '');
            WordHelper.printOneLine(word);
        }
    } else {
        let word = await TranslatorProxy.getInstance().translate(query, '', '');
        Translator.saveHistory(word);
        if (oneLine) {
            WordHelper.printOneLine(word);
        } else {
            WordHelper.print(word);
        }
    }
}

