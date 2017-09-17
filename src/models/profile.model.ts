export class Profile {
  constructor(public username:string, public firstName: string, public lastName: string, public descriptors:string[], public locationTimes:LocationTime[], public _owner?:string,  public created?:number) {}
}

interface LocationTime {
  country:string,
  city:string,
  place:string,
  fromDate:number,
  toDate:number
}
