var Word = /** @class */ (function () {
    function Word() {
        this.pos = []; // 词语位置，用 "/" 分割不同位置
        this.tag = []; // 字符串标签：zk/中考，gk/高考，cet4/四级 等等标签，空格分割
        this.exchange = []; // 时态复数等变换，使用 "/" 分割不同项目，见后面表格
    }
    return Word;
}());
// 词性
var PosTag = /** @class */ (function () {
    function PosTag(pos) {
        var array = pos.split(':');
        this.type = array[0];
        this.value = array[1];
    }
    return PosTag;
}());
var LevelTag;
(function (LevelTag) {
    LevelTag["zk"] = "\u4E2D";
    LevelTag["gk"] = "\u9AD8";
    LevelTag["ky"] = "\u7814";
    LevelTag["cet4"] = "\u56DB";
    LevelTag["cet6"] = "\u516D";
    LevelTag["toefl"] = "\u6258";
    LevelTag["ielts"] = "\u96C5";
    LevelTag["gre"] = "\u5B9D";
})(LevelTag || (LevelTag = {}));
var Exchange = /** @class */ (function () {
    function Exchange(exchange) {
        var array = exchange.split(':');
        this.type = array[0];
        this.value = array[1];
    }
    Exchange.prototype.getType = function () {
        return Exchange.exchangeMap[this.type];
    };
    Exchange.prototype.getValue = function () {
        if (this.type === '1') {
            return Exchange.exchangeMap[this.value];
        }
        return this.value;
    };
    Exchange.exchangeMap = {
        'p': '过去式',
        'd': '过去分词',
        'i': '进行时',
        '3': '第三人称单数',
        'r': '比较级',
        't': '最高级',
        's': '复数',
        '0': '词干',
        '1': '是词干的何种变换形式'
    };
    return Exchange;
}());
parseWord(process.argv[2]);
function parseWord(line) {
    console.log(line.replace(/\n/g, '<br>'));
    var items = line.replace(/\n/g, '<br>').split(/(?<!\"[^,]+),(?![^,]+\")/);
    var posParser = function (word, pos) {
        pos.split('/').forEach(function (str) { return word.pos.push(new PosTag(str)); });
    };
    var tagParser = function (word, tag) {
        tag.split(' ').forEach(function (str) { return word.tag.push(LevelTag[str]); });
    };
    var exchangeParser = function (word, exchange) {
        exchange.split('/').forEach(function (str) { return word.exchange.push(new Exchange(str)); });
    };
    var propArray = ['word', 'phonetic', 'definition', 'translation', posParser, 'collins', 'oxford', tagParser, 'bnc', 'frq', exchangeParser, 'detail', 'audio'];
    var word = new Word();
    for (var i = 0; i < items.length; i++) {
        var prop = propArray[i];
        console.log(items[i] + ' ---- ' + prop);
        if (typeof prop === 'string') {
            word[prop] = items[i];
        }
        else {
            prop(word, items[i]);
        }
    }
    console.log(word);
    word.exchange.forEach(function (exchange) { return console.log(exchange.getType() + ": " + exchange.getValue()); });
}
