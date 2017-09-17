
export class User {
  constructor(public email:string, public _id?:string, public tokens?:{access:string, token:string}[]){}
}
