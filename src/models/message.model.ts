export class Message {
  constructor(public from:{username: string, userId: string}, public to:{username: string, userId: string}, public message:string, public timestamp:number){}
}

export class ChatMetaData {
  constructor(public from:{username: string, userId:string}, public lastMessage: string, public timestamp: number){}
}


