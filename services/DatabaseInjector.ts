import {Inject,  registerProvider} from "@tsed/di";
import {Config} from "../model/Config";
import {Db, MongoClient} from "mongodb";
import {IDatabaseInjector, TIDatabaseInjector} from "../model/IDatabaseInjector";

class DatabaseInjector implements IDatabaseInjector
{
    private _config : Config;
    private _client : MongoClient = null;

    constructor(@Inject() config: Config)
    {
        this._config = config;
    }

    public  async GetDatabase() : Promise<Db>
    {
        if (!this._client)
        {
            this._client = new MongoClient(this._config.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
            await this._client.connect();
        }

        return this._client.db(this._config.mongoDatabase);
    }
}

registerProvider({provide: TIDatabaseInjector, useClass: DatabaseInjector});