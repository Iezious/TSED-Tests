import {GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings} from "@tsed/common";
import "@tsed/swagger";

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compress = require("compression");
const methodOverride = require("method-override");
import {$log} from "ts-log-debug";
const rootDir = __dirname;


//import "./services/DatabaseInjector";

import {registerValue} from "@tsed/di";
import {Config} from "./model/Config";


@ServerSettings({
    rootDir,
    mount: {
        "/": "${rootDir}/controllers/*.js"
    },
    httpPort: 4010,
    acceptMimes: ["application/json"],
    logger: {
        debug: true,
        logRequest: true,
        requestFields: ["reqId", "method", "url", "headers", "query", "params", "duration"]
    },
    swagger: {
        path: "/api-docs"
    },
    calendar: {
        token: true
    },

    debug: true
})
export class Server extends ServerLoader {
    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    $onBeforeRoutesInit(): void | Promise<any> {
        this
            .use(GlobalAcceptMimesMiddleware)
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }));

        return null;
    }

    $onServerInitError(error): any {
        $log.error("Server encounter an error =>", error);
    }
}

registerValue(Config, require("./config.json"));

new Server().start();