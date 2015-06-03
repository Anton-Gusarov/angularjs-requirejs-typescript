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

 module Messages {

     export interface Messages {
         ack: ()=>void;
         content: any;
     }
 }

 module auth {

     export interface tokenMessage extends Messages.Messages {
         content: {
             token: string;
             login: string;
             err?:{
                 code: number;
                 message: string;
             }
         }
     }

     export interface loginMessage extends Messages.Messages {
         content: {
             login: string;
             password: string;
         }
     }

 }