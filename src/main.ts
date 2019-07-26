import 'colors';
import {DateUtils as du} from './common/DateUtils';
import {YoudaoTranslator} from './service/YoudaoTranslator'

console.log('hello world!'.yellow);

console.log(du.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss.S'));

let yd = new YoudaoTranslator();

yd.translate('', '', '');