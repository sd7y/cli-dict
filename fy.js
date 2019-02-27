var packageJson = require('./package.json')

var request = require('request');
var fs = require('fs');
var crypto = require('crypto');
var colors = require( "colors");
var program = require('commander');
var child_process = require('child_process');

const WORD_LIST_FILE = './word-list.json';

program
  .version(packageJson.version)
  .usage('[word] [Options]')
  .option('-j, --json', 'Show the response json.')
  .option('-l, --list', 'Show the list of word.')
  .option('-s, --sync', 'Sync the word list to git.')
  .option('-d, --delete [word]', 'Delete a word from the list.')
  .parse(process.argv);
  
if (program.list) {
    showWordList();
} else if (program.sync) {
    syncWordList();
} else if (program.delete) {
    if (program.delete === true) {
        deleteWord(program.args.join(' ').toLowerCase());
    } else {
        deleteWord(program.delete);
    }
} else {
    queryWord(program.args.join(' ').toLowerCase());
}

function queryWord(query) {
    var appKey = process.env.FY_API_YOUDAO_APP_KEY;
    var key = process.env.FY_API_YOUDAO_KEY;
    var salt = (new Date).getTime();
    var from = '';
    var to = '';
    var str1 = appKey + query + salt + key;
    var sign = md5(str1);
    var json = {
        q: query,
        appKey: appKey,
        salt: salt,
        from: from,
        to: to,
        sign: sign
    };
    var options = {
        method: 'POST',
        url: 'https://openapi.youdao.com/api',
        headers: {
            'Content-Type': 'application/json'
        },
        form: json,
        json: true
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        if (program.json) console.log(body);
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
            if (basic) {
                console.log(('\n' + query + ': ').yellow + translation.join(', ') + (' [ ' + basic['phonetic'] + ' ]' + ', [ ' + basic['uk-phonetic'] + ' ]' + ', [ ' + basic['us-phonetic'] + ' ]').yellow,  webdict.url.gray, ((basic.exam_type || []).join(',')).gray);
                let enSpeakUrl = l.toLowerCase() === 'en2zh-chs' ? speakUrl : tSpeakUrl;
                console.log(enSpeakUrl.gray);
                soundByUrl(query, enSpeakUrl);
                for (var i = 0; i < basic.explains.length; i++) {
                    console.log('    ' + basic.explains[i]);
                }
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
            updateWordList(query, body);
        }
    });
}

function updateWordList(word, result) {
    var item;
    var wordList = readWordList();

    for (var i = 0; i < wordList.length; i++) {
        if (word === wordList[i].word) {
            item = wordList[i];
            item.queryHistory.push(dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'));
            break;
        }
    }
    if (!item) {
        item = {
            word: word,
            queryHistory: [dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')],
            result: result
        };
        wordList.push(item);
    }
    console.log(('Query history: ' + item.queryHistory.length), item.queryHistory.join(', ').gray);

    writeWordList(wordList);
}

function writeWordList(wordList) {
    fs.writeFileSync(WORD_LIST_FILE, JSON.stringify(wordList, null, 2));
}

function readWordList() {
    var wordList = fs.readFileSync(WORD_LIST_FILE, 'utf8');
    wordList = wordList ? JSON.parse(wordList) : [];
    return wordList;
}

function showWordList() {
    var wordList = readWordList();

    wordList = wordList.sort(function(a, b) {
        if (a.queryHistory.length === b.queryHistory.length) {
            return new Date(a.queryHistory[a.queryHistory.length - 1]).getTime() < new Date(b.queryHistory[b.queryHistory.length - 1]).getTime();
        }
        return a.queryHistory.length < b.queryHistory.length;
    });

    for (var i = 0; i < wordList.length; i++) {
        console.log(wordList[i].word.yellow, (wordList[i].queryHistory.length + '').gray, 
            wordList[i].result.translation.join('; '), wordList[i].result.basic ? wordList[i].result.basic.explains.join('; ').blue : '');
    }
    console.log(('List size: ' + wordList.length).gray);
}

function syncWordList() {
    var exec = child_process.exec;
    var cmdStr = 'git add ' + WORD_LIST_FILE + ' && git commit -m "sync word list" && git push';
    console.log(cmdStr);
    exec(cmdStr, function(err,stdout,stderr){
        console.log(stdout);
        console.log(stderr);
    });
}

function soundByUrl(word, url, isCached) {
    var exec = child_process.exec;
    var cmdStr = 'curl \'' + url + '\' -o /tmp/' + word + '.mp3 && mpg123 /tmp/' + word + '.mp3';
    if (isCached) {
        cmdStr = 'mpg123 /tmp/' + word + '.mp3';
    }
    exec(cmdStr, function(err,stdout,stderr){
        // console.log(stdout);
        // console.log(stderr);
        soundByUrl(word, url, true);
    });
}

function deleteWord(word) {
    var wordList = readWordList();
    var hasDeleted = false;
    for (var i = 0; i < wordList.length; i++) {
        if (wordList[i].word === word) {
            wordList.splice(i, 1);
            hasDeleted = true;
        }
    }
    writeWordList(wordList);
    // showWordList();
    if (hasDeleted) {
        console.log('The "' + word + '" has been successfully deleted.');
    } else {
        console.log('Fail to delete the "' + word + '", because it could not be found.')
    }
}

function md5(str) {
    return crypto.createHash('md5').update(str).digest().toString('hex');
}

function dateFormat(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}