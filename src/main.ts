import 'colors';
import {DateUtils as du} from './common/DateUtils';
import {YoudaoTranslator} from './service/YoudaoTranslator'
import { Word } from './bo/Word';
import { WordStorage } from './service/WordStorage';

main();

async function main() {
    console.log(du.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss.S').gray);

    let yd = new YoudaoTranslator();

    let word = await yd.translate('hello', '', '');
    printWord(word);
    WordStorage.load();
    WordStorage.store(word);
}

function printWord(word: Word) {
    console.log((word.source + ': ').yellow + word.translation.join(', ') + (' [' + word.phonetic.join('] , [') + ']').yellow);
    word.sound.speak();
    for (var i = 0; i < word.explains.length; i++) {
        console.log('    ' + word.explains[i]);
    }
}