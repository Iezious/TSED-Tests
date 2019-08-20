import {Db} from "mongodb";

export const TIDatabaseInjector = Symbol.for("IDatabaseInjector");

export interface IDatabaseInjector
{
    GetDatabase() : Promise<Db>;
}