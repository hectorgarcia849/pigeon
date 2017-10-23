
export class Message {
  constructor(public from: string, public to: string, public message:string, public timestamp?:number, public _id?:string){}
}

export class Chat {
  constructor(public _id:string, public from:{username: string, userId:string}, public to:{username: string, userId:string}, public lastMessage: string, public timestamp: number){}
}


