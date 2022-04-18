export declare class DatabaseHelper {
    private mConnection;
    private mLogger;
    constructor();
    connect(): Promise<boolean>;
    close(): Promise<void>;
    private prepareConnectionOptions;
    private drop;
}
