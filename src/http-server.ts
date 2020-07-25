import { HttpServer } from "./web/HttpServer.ts";

new HttpServer().start('0.0.0.0', 8080);