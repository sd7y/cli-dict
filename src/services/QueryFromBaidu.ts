import { QueryService } from "./QueryService.ts";
import { Word } from "../entities/Word.ts";
import { TextUtils } from "../utils/TextUtils.ts";

export class QueryFromBaidu implements QueryService {
    type = 'baidu';
    async query(text: string) {
        let from = 'zh';
        let to = 'en';
        if (TextUtils.isEnglish(text)) {
            from = 'en';
            to = 'zh';
        }
        let json = await fromBaidu(text, from, to);
        return jsonToWord(json);
    }
}

function assembleExchange(word: Word, exchange: any) {
    word.done = exchange?.word_done?.join('|');
    word.ing = exchange?.word_ing?.join('|');
    word.past = exchange?.word_past?.join('|');
    word.plural = exchange?.word_pl?.join('|');
    word.third = exchange?.word_third?.join('|');
}

function assembleMeans(word: Word, means: any) {
    means?.forEach((part: any) => word.addMeans(part.part, part.text, part.means));
}

async function jsonToWord(json: any) {
    let isProto = !!json?.dict_result?.simple_means?.exchange?.word_proto;
    let proto = json?.dict_result?.simple_means?.word_name;
    if (isProto) {
        proto = json?.dict_result?.simple_means?.exchange?.word_proto[0];
        // json = await fromBaidu(proto, 'en', 'zh');
    }
    let word = new Word(proto);

    word.addTags(json?.dict_result?.simple_means?.tags?.core);
    word.addTags(json?.dict_result?.simple_means?.tags?.other);

    word.addPhonetic(json?.dict_result?.simple_means?.symbols[0]?.ph_en,
        json?.dict_result?.simple_means?.symbols[0]?.ph_am,
        json?.dict_result?.collins?.word_emphasize?.replace(/\|/g, '·'));

    let means = json?.dict_result?.simple_means?.symbols[0]?.parts;

    if (!TextUtils.isEnglish(proto)) {
        means = json?.dict_result?.simple_means?.symbols[0]?.parts[0]?.means;
    }

    assembleMeans(word, means);

    assembleExchange(word, json?.dict_result?.simple_means.exchange);

    word.video = json?.dict_result?.queryExplainVideo?.videoUrl;

    return word;
}

async function fromBaidu(text: string, from: string, to: string) {
    let sign = getSign(text);
    let formData = new URLSearchParams();
    formData.append('from', from);
    formData.append('to', to);
    formData.append('query', text);
    formData.append('transtype', 'translang');
    formData.append('simple_means_flag', '3');
    formData.append('sign', sign);
    formData.append('token', '413e1a10ac75d841b50a98ee5ffa7690');
    formData.append('domain', 'common');

    let resp = await fetch('https://fanyi.baidu.com/v2transapi?from=' + from + '&to=' + to, {
        method: 'POST',
        headers: {
            "origin": "https://fanyi.baidu.com",
            "referer": "https://fanyi.baidu.com/",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36",
            "x-requested-with": "XMLHttpRequest",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Cookie": "BIDUPSID=38DB0E25CD3EC3094B57B48D4ED0EFDC; PSTM=1587705100; BAIDUID=38DB0E25CD3EC3096583076C01AB881E:FG=1; REALTIME_TRANS_SWITCH=1; FANYI_WORD_SWITCH=1; HISTORY_SWITCH=1; SOUND_SPD_SWITCH=1; SOUND_PREFER_SWITCH=1; MCITY=-%3A; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; H_PS_PSSID=31355_1433_31326_21092_31110_31592_31464_30824; Hm_lvt_64ecd82404c51e03dc91cb9e8c025574=1587708309,1588037984,1589112724,1590055096; delPer=0; PSINO=5; Hm_lpvt_64ecd82404c51e03dc91cb9e8c025574=1590132905; __yjsv5_shitong=1.0_7_97c47ce5ab566d86e2e6e02e85e0c8678d1b_300_1590133155624_49.4.176.131_167133de; yjs_js_security_passport=7739c56df78c483709393d33f63639f9064c9aed_1590133156_js; DOUBLE_LANG_SWITCH=1"
        }, 
        body: formData
    });
    return await resp.json();
}

function getSign(word: string): string {
    // the window[gtk] can be found from https://fanyi.baidu.com/
    var window: any = { gtk : '320305.131321201' }
    var i: any = null;
    return e(word);

    function a(r:any) {
        if (Array.isArray(r)) {
            for (var o = 0, t = Array(r.length); o < r.length; o++)
                t[o] = r[o];
            return t
        }
        return Array.from(r)
    }
    function n(r:any, o:any) {
        for (var t = 0; t < o.length - 2; t += 3) {
            var a = o.charAt(t + 2);
            a = a >= "a" ? a.charCodeAt(0) - 87 : Number(a),
            a = "+" === o.charAt(t + 1) ? r >>> a : r << a,
            r = "+" === o.charAt(t) ? r + a & 4294967295 : r ^ a
        }
        return r
    }
    function e(r:any) {
        var o = r.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g);
        if (null === o) {
            var t = r.length;
            t > 30 && (r = "" + r.substr(0, 10) + r.substr(Math.floor(t / 2) - 5, 10) + r.substr(-10, 10))
        } else {
            for (var e = r.split(/[\uD800-\uDBFF][\uDC00-\uDFFF]/), C = 0, h = e.length, f:any[] = []; h > C; C++)
                "" !== e[C] && f.push.apply(f, a(e[C].split(""))),
                C !== h - 1 && f.push(o[C]);
            var g = f.length;
            g > 30 && (r = f.slice(0, 10).join("") + f.slice(Math.floor(g / 2) - 5, Math.floor(g / 2) + 5).join("") + f.slice(-10).join(""))
        }
        var u:any = void 0
            , l = "" + String.fromCharCode(103) + String.fromCharCode(116) + String.fromCharCode(107);
        u = null !== i ? i : (i = window[l] || "") || "";
        for (var d = u.split("."), m = Number(d[0]) || 0, s = Number(d[1]) || 0, S = [], c = 0, v = 0; v < r.length; v++) {
            var A = r.charCodeAt(v);
            128 > A ? S[c++] = A : (2048 > A ? S[c++] = A >> 6 | 192 : (55296 === (64512 & A) && v + 1 < r.length && 56320 === (64512 & r.charCodeAt(v + 1)) ? (A = 65536 + ((1023 & A) << 10) + (1023 & r.charCodeAt(++v)),
            S[c++] = A >> 18 | 240,
            S[c++] = A >> 12 & 63 | 128) : S[c++] = A >> 12 | 224,
            S[c++] = A >> 6 & 63 | 128),
            S[c++] = 63 & A | 128)
        }
        for (var p = m, F = "" + String.fromCharCode(43) + String.fromCharCode(45) + String.fromCharCode(97) + ("" + String.fromCharCode(94) + String.fromCharCode(43) + String.fromCharCode(54)), D = "" + String.fromCharCode(43) + String.fromCharCode(45) + String.fromCharCode(51) + ("" + String.fromCharCode(94) + String.fromCharCode(43) + String.fromCharCode(98)) + ("" + String.fromCharCode(43) + String.fromCharCode(45) + String.fromCharCode(102)), b = 0; b < S.length; b++)
            p += S[b],
            p = n(p, F);
        return p = n(p, D),
        p ^= s,
        0 > p && (p = (2147483647 & p) + 2147483648),
        p %= 1e6,
        p.toString() + "." + (p ^ m)
    }
}