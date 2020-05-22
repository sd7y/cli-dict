import { QueryService } from "./QueryService.ts";
import { QueryFromYoudao } from "./QueryFromYoudao.ts";
import { QueryFromBaidu } from "./QueryFromBaidu.ts";

export class QueryManager {
    private static queryServices: QueryService[] = [
        new QueryFromYoudao(),
        new QueryFromBaidu()
    ];
    
    static getInstance(type: string): QueryService {
        for (let i = 0; i < this.queryServices.length; i++) {
            if (this.queryServices[i].type === type) {
                return this.queryServices[i];
            }
        }
        throw new Error("Can not get a query service");
    }
}