import { Word } from '../bo/Word';

export class WordHelper {
    static print(word: Word) {
        console.log((word.source + ': ').yellow + word.translation.join(', ') + (' [' + word.phonetic.join('] , [') + ']').yellow);
        word.sound.speak();
        for (var i = 0; i < word.explains.length; i++) {
            console.log('    ' + word.explains[i]);
        }
    }
    static printOneLine(word: Word) {
        console.log((word.source + ': ').yellow + word.translation.join('; '), word.translation.join(', ') ? word.explains.join('; ') : '');
    }
}