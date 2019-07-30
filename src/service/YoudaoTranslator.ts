import { Word } from '../bo/Word'
import { Translator } from './Translator';
import { StringUtils } from '../common/StringUtils';
import { HttpClient } from '../common/HttpClient';

export class YoudaoTranslator implements Translator {
    translate(source: string, from: string, to: string): Word {
        console.log('This is Youdao translator');
        // throw new Error("Method not implemented.");
        console.log('xx')
        this.queryWord('hello', {});
        return new Word('', '', '', '');
    }

    queryWord(query: string, options: object): void {
        var appKey = process.env.FY_API_YOUDAO_APP_KEY;
        var key = process.env.FY_API_YOUDAO_KEY;
        var salt = (new Date).getTime();
        var from = '';
        var to = '';
        var str1 = appKey + query + salt + key;
        var sign = StringUtils.md5(str1);
        var qs = {
            q: query,
            appKey: appKey,
            salt: salt,
            from: from,
            to: to,
            sign: sign
        };
        
        HttpClient.post('https://openapi.youdao.com/api', qs, {
            'Content-Type': 'application/json'
        }, null, (res) => {
            console.log('===================');
            console.log(res.statusCode);
            console.log('---------------')
            res.on('data', (d) => {
                process.stdout.write(d)
            });
        });
    }
}