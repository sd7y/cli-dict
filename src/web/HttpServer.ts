import { serve, ServerRequest } from "https://deno.land/std/http/server.ts";
import { TextUtils } from "../utils/TextUtils.ts";
import { QueryManager } from "../services/QueryManager.ts";

const query = QueryManager.getInstance('baidu');

export class HttpServer {
    async start(hostname: string, port: number) {
        const server = serve({
            hostname: hostname,
            port: port
        });
        console.log(`Listening on ${hostname}:${port}`);
        for await (const req of server) {
            translate(req);
        }
    }
}

async function translate(req: ServerRequest) {
    let headers = new Headers();
    headers.set('content-type', 'text/html;charset=utf-8');
    let text = getQuery(req).word;
    if (!text) {
        req.respond({
            status: 400, 
            headers: headers,
            body: 'The word not found'
        });
        return;
    }
    let from = 'zh';
    let to = 'en';
    if (TextUtils.isEnglish(text)) {
        from = 'en';
        to = 'zh';
    }
    let word = await query.query(text, from, to);
    req.respond({
        status: 200, 
        headers: headers,
        body: JSON.stringify(word)
    });
}

function getQuery(req: ServerRequest) {
    let url = req.url;
    if (url.indexOf('?') == -1) {
        return {};
    }
    let query: any = {};
    url.split('?')[1].split("&").forEach(value => {
        let temp = value.split('=');
        query[temp[0]] = temp[1];
    });
    return query;
}

