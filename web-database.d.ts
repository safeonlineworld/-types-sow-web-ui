/////////////////////////////////////////////////////////////////
// Type definitions for Symbol Fundamental information
// Project: https://safeonline.world/
// Definitions by: Rajib Chy <https://github.com/rajibchy>
// 12:18 PM 9/2/2021
// by rajib chy
/// <reference types="node"/>
////////////////////////////////////////////////////////////////
declare interface IWebDatabaseResponse {
    ret_val: number;
    ret_msg: string;
    ret_data_table?: any;
    status?: 'SUCCESS' | 'ERROR' | 'ABORTED'
}
declare interface IDatabaseConfig {
    module: string; sp: string; validate?: boolean;
}
declare interface IWebDatabaseRequestConfig {
    conf?: string; data?: string | FormData; content_type?: string
}
declare interface IApi {
    readonly userAgent: string;
    /** Close all active connection */
    closeAllConn(): IApi;
    getDataAsync(formObject?: NodeJS.Dict<any>): Promise<IWebDatabaseResponse>;
    postDataAsync(payload: NodeJS.Dict<any>): Promise<IWebDatabaseResponse>;
    getAsync(config: IDatabaseConfig, formObject?: NodeJS.Dict<any>): Promise<IWebDatabaseResponse>;
    postAsync(config: IDatabaseConfig, payload: NodeJS.Dict<any>): Promise<IWebDatabaseResponse>;
    uploadDataAsync(conf: IWebDatabaseRequestConfig): Promise<IWebDatabaseResponse>;
    getAsync(url: string, data: NodeJS.Dict<any>): Promise<IWebDatabaseResponse>;
    postAsync(url: string, data: NodeJS.Dict<any>): Promise<IWebDatabaseResponse>;
    postAsync(url: string, data: NodeJS.Dict<any>, def: NodeJS.Dict<any>): Promise<IWebDatabaseResponse>;
    /** 
     * Execute `stored procedure` to `database`.
     * It will communicate with http get `request`.
     * @param obj This is `quary` object of this `request`
     * @param endPoint If `undefined` then we'll use `endPoint`:`/app/database/crud`
     * @param validate Force validation request to database
     */
    executeAsync(sp: string, obj: any[] | NodeJS.Dict<any>, endPoint?: string, validate?: boolean): Promise<IWebDatabaseResponse>;
    /** 
     * ```ts 
     * Execute stored procedure to database.
     * If `endPoint` is `undefined` then we will use endPoint:`/app/database/crud`
     * ```
    */
    executeIOAsync(sp: string, obj: any[] | NodeJS.Dict<any>, endPoint?: string, validate?: boolean): Promise<IWebDatabaseResponse>;
    /** Dispose current `dbContext` */
    dispose(): void;
}
declare interface IWebDatabase extends IApi {
    closeAllConn(): IWebDatabase;
    /** Close Connection */
    close(key: string): void;
    /** 
     * ```ts 
     * Execute stored procedure to database.
     * It will communicate with http get request
     * ```
     */
    execute(sp: string, obj: any[] | NodeJS.Dict<any>, validate?: boolean): Promise<IWebDatabaseResponse>;
    /** Execute stored procedure to database */
    executeIO(query: string, obj: any[] | NodeJS.Dict<any>, validate?: boolean): Promise<IWebDatabaseResponse>;
    /** Execute plain text query */
    executeQuery(query: string, arr: any[], next: (res: IWebDatabaseResponse) => void): string;
    /** 
     * ```ts 
     * Execute stored procedure to database.
     * It will communicate with http get request
     * ```
     */
    execute(query: string, obj: any[] | Dct<any>, next: (res: IWebDatabaseResponse) => void, validate?: boolean): string;
    /** Execute stored procedure to database */
    executeIO(query: string, obj: any[] | Dct<any>, next: (res: IWebDatabaseResponse) => void, validate?: boolean): string;
}
declare interface IWebDatabaseConstructor {
    /**
     * ```ts 
     * Create `WebDatabase` instance
     * default api: /app/database/crud
     * ```
     */
    new(api?: string): IWebDatabase;
    readonly prototype: IWebDatabase;
}