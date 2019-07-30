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
            let body = '';
            res.on('data', d => body += d);
            res.on('end', () => this.parseWord(JSON.parse(body)));
        });
    }

    parseWord(body: any) {
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
        if (errorCode !== '0') {
            console.log(JSON.stringify(body).red);
        } else {
            let showHistory = true;
            if (basic) {
                console.log(('\n' + query + ': ').yellow + translation.join(', ') + (' [ ' + basic['phonetic'] + ' ]' + ', [ ' + basic['uk-phonetic'] + ' ]' + ', [ ' + basic['us-phonetic'] + ' ]').yellow,  webdict.url.gray, ((basic.exam_type || []).join(',')).gray);
                let enSpeakUrl = l.toLowerCase() === 'en2zh-chs' ? speakUrl : tSpeakUrl;
                console.log(enSpeakUrl.gray);
                for (var i = 0; i < basic.explains.length; i++) {
                    console.log('    ' + basic.explains[i]);
                }
                // setTimeout(() => {
                //     options.noSound || soundByUrl(query, enSpeakUrl);
                // });
            } else {
                console.log(('\n' + query + ': ').yellow, translation.join(', '),  ((webdict && webdict.url) || '').gray);
            }
        
            console.log();
        
            if (web) {
                console.log();
                for (var i = 0; i < web.length; i++) {
                    console.log('    ' + web[i].key + ': ' + web[i].value.join(', '));
                }
            }
            console.log();
        }
    }
}