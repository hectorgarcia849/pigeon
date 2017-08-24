import {User} from "firebase/app";

export class Profile {

  constructor(public username:string, public descriptors:string[], public locationTimes:{ location:string, date:Date }[]) {}
}
