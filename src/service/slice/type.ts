 export interface ISite {
    id: number;
    url: string;
}

 export interface ITest {
    id: number;
    name: string;
    type: string;
    status: string;
    siteId: number;
    siteUrl?: string;
}
