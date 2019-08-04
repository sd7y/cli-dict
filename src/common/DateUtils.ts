export class DateUtils {
    static format(date: Date, formatter: string): string {
        let mapper: {[key: string]: number} = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'S': date.getMilliseconds()
        };
        if (/(y+)/.test(formatter)) {
            formatter = formatter.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (let key in mapper) {
            if (new RegExp('(' + key + ')').test(formatter)) {
                let val = mapper[key] + '';
                if (RegExp.$1.length > 1) {
                    val = ('00' + val).substr(('' + val).length);
                }
                formatter = formatter.replace(RegExp.$1, val)
            }
        }
        return formatter;
    }
}