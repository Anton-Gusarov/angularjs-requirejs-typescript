 interface IMall {
    Mall_ID: number;
    Title: string;
}

 interface IItemsOptions {
    length?: number;
    type?: string;
    gender?: string;
    start?: number;
    malls?: Array<number>;
}