import { Word } from '../bo/Word';
import { History } from '../bo/History';
import { HistoryStorage } from '../service/HistoryStorage';

export class WordHelper {
    static print(word: Word) {
        console.log((word.source + ': ').yellow 
                + (WordHelper.hisLen(HistoryStorage.get(word.source)) + ' ').gray 
                + word.translation.join(', ') 
                + (' [' + word.phonetic.join('] , [') + ']').yellow);
        word.sound.speak();
        for (var i = 0; i < word.explains.length; i++) {
            console.log('    ' + word.explains[i]);
        }
    }
    static printOneLine(word: Word) {
        console.log((word.source + ': ').yellow 
                + (WordHelper.hisLen(HistoryStorage.get(word.source)) + ' ').gray 
                + word.translation.join('; ').green + ' '
                + word.explains.join('; '));
    }

    static hisLen(history: History | null): number {
        return history ? history.history.length : 0;
    }
}