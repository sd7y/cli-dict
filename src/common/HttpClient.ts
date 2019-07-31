import * as http from 'http';
import * as https from 'https';
import * as querystring from 'querystring';

export class HttpClient {

    static https(options: https.RequestOptions, body: any): Promise<http.IncomingMessage> {
        // process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0"; // 忽略 https 证书
        
        return new Promise((resolve, reject) => {
            let req = https.request(options, resolve);

            req.on('error', (error) => {
                throw error;
            });
    
            if (body) {
                req.write(body);
            }
    
            req.end();
        });
    }

    static http(): Promise<http.IncomingMessage> {
        throw new Error('The function "http" is not implemented');
    }

    static post(url: string, query: querystring.ParsedUrlQueryInput, headers: http.OutgoingHttpHeaders, body: any): Promise<http.IncomingMessage> {
        return this.request(url, query, 'POST', headers, body);
    }

    static request(url: string, query: querystring.ParsedUrlQueryInput, method: string, headers: http.OutgoingHttpHeaders, body: any): Promise<http.IncomingMessage> {
        let match = /^(?:(http|https):\/\/)?(.*?)(?::(\d*))?(\/.*?)?(?:\?(.*?))?$/.exec(url);

        if (!match) {
            throw new Error('The url `' + url + '` is not matched!');
        }

        let type = match[1] || 'http';
        let hostname = match[2];
        let port = parseInt(match[3] || (type === 'http' ? '80' : '443'));
        let path = match[4];
        let qs = match[5];

        if (type === 'https') {
            return this.https({
                hostname: hostname,
                port: port,
                path: path + '?' + (query ? querystring.stringify(query) : '') + (qs ? ('&' + qs) : ''),
                method: method,
                headers: headers
            }, body);
        } else {
            return this.http();
        }
    }
}