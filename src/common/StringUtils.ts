import { createHash }  from 'crypto'; // https://github.com/cscott/node-pn/issues/2

export class StringUtils {
    static md5(str: string): string {
        return createHash('md5').update(str).digest().toString('hex');
    }
}