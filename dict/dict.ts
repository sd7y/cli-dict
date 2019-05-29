
class Word {
    word: string;              // 单词名称
    phonetic: string;          // 音标，以英语英标为主
    definition: string;        // 单词释义（英文），每行一个释义 
    translation: string;       // 单词释义（中文），每行一个释义
    pos: PosTag[] = [];        // 词语位置，用 "/" 分割不同位置
    collins: string;           // 柯林斯星级 
    oxford: string;            // 是否是牛津三千核心词汇
    tag: LevelTag[] = [];      // 字符串标签：zk/中考，gk/高考，cet4/四级 等等标签，空格分割
    bnc: number;               // 英国国家语料库词频顺序
    frq: number;               // 当代语料库词频顺序
    exchange: Exchange[] = []; // 时态复数等变换，使用 "/" 分割不同项目，见后面表格
    detail: string;            // json 扩展信息，字典形式保存例句（待添加）
    audio: string;             // 读音音频 url （待添加）
    constructor() {}
}

// 词性
class PosTag {
    type: string;
    value: string;
    constructor(pos: string) {
        let array = pos.split(':');
        this.type = array[0];
        this.value = array[1];
    }
}

enum LevelTag {
    zk    = '中',
    gk    = '高',
    ky    = '研',
    cet4  = '四',
    cet6  = '六',
    toefl = '托',
    ielts = '雅',
    gre   = '宝'
}

class Exchange {
    static exchangeMap = {
        'p' : '过去式',
        'd' : '过去分词',
        'i' : '进行时',
        '3' : '第三人称单数',
        'r' : '比较级',
        't' : '最高级',
        's' : '复数',
        '0' : '词干',
        '1' : '是词干的何种变换形式',
    };
    type: string;
    value: string;
    constructor(exchange: string) {
        var array = exchange.split(':');
        this.type = array[0];
        this.value = array[1];
    }
    getType(): string {
        return Exchange.exchangeMap[this.type];
    }
    getValue(): string {
        if (this.type === '1') {
            return Exchange.exchangeMap[this.value];
        }
        return this.value;
    }
}

parseWord(process.argv[2]);

function parseWord(line: string) {
    console.log(line.replace(/\n/g, '<br>'))
    let items = line.replace(/\n/g, '<br>').split(/(?<!\"[^,]+),(?![^,]+\")/);
    let posParser = function(word: Word, pos: string) {
        pos.split('/').forEach(str => word.pos.push(new PosTag(str)));
    }
    let tagParser = function(word: Word, tag: string) {
        tag.split(' ').forEach(str => word.tag.push(LevelTag[str]));
    }
    let exchangeParser = function(word: Word, exchange: string) {
        exchange.split('/').forEach(str => word.exchange.push(new Exchange(str)));
    }

    let propArray = ['word', 'phonetic', 'definition', 'translation', posParser, 'collins', 'oxford', tagParser, 'bnc', 'frq', exchangeParser, 'detail', 'audio'];
    let word = new Word();
    for (let i = 0; i < items.length; i++) {
        let prop = propArray[i];
        console.log(items[i] + ' ---- ' + prop);
        if (typeof prop === 'string') {
            word[prop] = items[i];
        } else {
            prop(word, items[i]);
        }
    }
    console.log(word);
    word.exchange.forEach(exchange => console.log(exchange.getType() + ": " + exchange.getValue()));
}
