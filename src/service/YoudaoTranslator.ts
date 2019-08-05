import { Word } from '../bo/Word'
import { Translator } from './Translator';
import { StringUtils } from '../common/StringUtils';
import { HttpClient } from '../common/HttpClient';
import { WordStorage } from './WordStorage';

export class YoudaoTranslator extends Translator {
    translate(source: string, from: string, to: string): Promise<Word> {
        return new Promise((resolve, reject) => {
            let word = YoudaoTranslator.queryWordFromLocal(source);
            if (word) {
                resolve(word);
            } else {
                YoudaoTranslator.queryWord(source).then(word => {
                    Translator.storage(word);
                    resolve(word);
                }).catch(reject);
            }
        });
    }

    static queryWordFromLocal(query: string) {
        return WordStorage.get(query);
    }

    static queryWord(query: string): Promise<Word> {
        return new Promise((resolve, reject) => {
            let appKey = process.env.FY_API_YOUDAO_APP_KEY;
            let key = process.env.FY_API_YOUDAO_KEY;
            let salt = new Date().getTime();
            let from = '';
            let to = '';
            let str1 = appKey + query + salt + key;
            let sign = StringUtils.md5(str1);
            let qs = {
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
                res.on('end', () => resolve(YoudaoTranslator.parseWord(JSON.parse(body))));
            });
        });
    }

    static parseWord(body: any): Word {
        // if (!body) {
        //     return;
        // }
        let errorCode = body.errorCode; // 错误返回码: 一定存在
        let query = body.query; // 源语言: 查询正确时，一定存在
        let translation = body.translation; // 翻译结果: 查询正确时一定存在
        let basic = body.basic; // 词义: 基本词典,查词时才有
        let web = body.web; // 词义: 网络释义，该结果不一定存在
        let l = body.l; // 源语言和目标语言: 一定存在
        let dict = body.dict; // 词典deeplink: 查询语种为支持语言时，存在
        let webdict = body.webdict; // webdeeplink: 查询语种为支持语言时，存在
        let tSpeakUrl = body.tSpeakUrl; // 翻译结果发音地址: 翻译成功一定存在
        let speakUrl = body.speakUrl; // 源语言发音地址: 翻译成功一定存在

        let soundUrl = '';
        let phonetic: string[] = [];
        let explains: string[] = [];
    
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
                for (let i = 0; i < web.length; i++) {
                    explains.push(web[i].key + ': ' + web[i].value.join(', '));
                }
            }
        }
        return new Word(query, soundUrl, phonetic, translation, explains);
    }
}