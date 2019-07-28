import { Word } from '../bo/Word'
import { Translator } from './Translator';
import * as https from 'https';
import * as http from 'http';
import { StringUtils } from '../common/StringUtils';


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
        var from = 'en';
        var to = 'zh-CHS';
        var str1 = appKey + query + salt + key;
        var sign = StringUtils.md5(str1);
        var json = {
            q: query,
            // appKey: appKey,
            salt: salt,
            from: from,
            to: to,
            sign: sign
        };
        console.log(json);
        console.log(appKey);
        console.log(key);
        var apiOptions = {
            method: 'POST',
            url: 'https://openapi.youdao.com/api',
            headers: {
                'Content-Type': 'application/json'
            },
            form: json,
            json: true
        };
        
        const httpsOptions: https.RequestOptions = {
            hostname: 'openapi.youdao.com',
            path: '/api',
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded'
            },
            
          };
        var req = https.request(httpsOptions, (res: http.IncomingMessage) => {
            console.log('===================');
            console.log(res.statusCode);
            res.on('data', (d) => {
                process.stdout.write(d)
              });
        });
        req.on('error', (error) => {
            console.log(error);
        });
        req.write(JSON.stringify(json));
        req.end();
    }
}