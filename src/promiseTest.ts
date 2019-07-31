console.log('xxxxx');

test(4)
    .then(value => {
        console.log('======================');
        console.log(value);
        console.log('then! then! then!');
    })
    .catch(reason => {
        console.log('======================');
        console.log(typeof reason);
        console.log(reason instanceof Error);
        console.log(reason);
        console.log('catch! catch! catch!');
    })
    .finally(() => {
        console.log('======================');
        console.log('finally! finally! finally!');
    });

function test(type: any): Promise<string> {
    return new Promise((resolve, reject) => {
        // type.abcd()
        switch (type) {
            case 1 : resolve('success! success! success!'); break;
            case 2 : throw new Error('failed! failed! failed!'); break;
            case 3 : reject('reject! reject! reject!'); break;
            case 4 : test2(); break; // 没有 catch 的异常, 会导致程序退出, 上层 catch, finally 都不会再继续执行
            case 5 : test2().catch(reason => console.log('catch the reason')); break; // catch 的异常, 不会退出
            case 6 : test3(); break; // 没有 catch 的 reject, 会抛出 UnhandledPromiseRejectionWarning, 程序退出, 上层 catch, finally 都不会再继续执行
            case 7 : test3().catch(reason => console.log('catch the reason')); break; // catch 的 reject, 不会退出
        }
    });
}

function test2(): Promise<any> {
    return new Promise((resolve, reject) => {
        throw new Error('the second error');
    })
}

function test3(): Promise<any> {
    return new Promise((resolve, reject) => {
        reject('test3 reject');
    })
}