import { Word } from '../bo/Word'
import { Translator } from './Translator';
import { StringUtils } from '../common/StringUtils';
import { HttpClient } from '../common/HttpClient';

export class YoudaoTranslator implements Translator {
    translate(source: string, from: string, to: string, callback: (word: Word) => void): void {
        this.queryWord(source, callback);
    }

    queryWord(query: string, callback: (word: Word) => void): void {
        var appKey = process.env.FY_API_YOUDAO_APP_KEY;
        var key = process.env.FY_API_YOUDAO_KEY;
        var salt = new Date().getTime();
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
        }, null).then(res => {
            let body = '';
            res.on('data', d => body += d);
            res.on('end', () => callback(this.parseWord(JSON.parse(body))));
        });
    }

    parseWord(body: any): Word {
        // if (!body) {
        //     return;
        // }
        var errorCode = body.errorCode; // 错误返回码: 一定存在
        var query = body.query; // 源语言: 查询正确时，一定存在
        var translation = body.translation; // 翻译结果: 查询正确时一定存在
        var basic = body.basic; // 词义: 基本词典,查词时才有
        var web = body.web; // 词义: 网络释义，该结果不一定存在
        var l = body.l; // 源语言和目标语言: 一定存在
        var dict = body.dict; // 词典deeplink: 查询语种为支持语言时，存在
        var webdict = body.webdict; // webdeeplink: 查询语种为支持语言时，存在
        var tSpeakUrl = body.tSpeakUrl; // 翻译结果发音地址: 翻译成功一定存在
        var speakUrl = body.speakUrl; // 源语言发音地址: 翻译成功一定存在

        var soundUrl = '';
        var phonetic: string[] = [];
        var explains: string[] = [];
    
        if (errorCode !== '0') {
            throw new Error(JSON.stringify(body));
        } else {
            if (basic) {
                phonetic.push(basic['phonetic']);
                phonetic.push(basic['uk-phonetic']);
                phonetic.push(basic['us-phonetic']);
                soundUrl = l.toLowerCase() === 'en2zh-chs' ? speakUrl : tSpeakUrl;
                explains = basic.explains;
            } else {
                // console.log(('\n' + query + ': ').yellow, translation.join(', '),  ((webdict && webdict.url) || '').gray);
            }
        
            if (web) {
                for (var i = 0; i < web.length; i++) {
                    explains.push(web[i].key + ': ' + web[i].value.join(', '));
                }
            }
        }
        return new Word(query, soundUrl, phonetic, translation, explains);
    }
}