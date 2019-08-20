import {Controller, Get, Inject} from "@tsed/common";
import {UserInfo} from "../model/UserInfo";
import {IDatabaseInjector, TIDatabaseInjector} from "../model/IDatabaseInjector";

@Controller("/api")
export class ApiTestController {

    private _db: IDatabaseInjector;

    constructor(@Inject(TIDatabaseInjector) db: IDatabaseInjector)
    {
        this._db = db;
    }

    @Get("/users")
    public async getUsers() : Promise<UserInfo[]>
    {
        const db = await this._db.GetDatabase();
        const col = await db.collection<UserInfo>("bousers");
        const data = await col.find({}).project({_id:1, Username:1, Enabled:1 }).toArray();
        return data;
    }
}