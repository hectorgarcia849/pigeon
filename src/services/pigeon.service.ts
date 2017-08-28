import {Pigeon} from "../models/pigeon.model";
import {ProfileService} from "./profile.service";
import {Injectable} from "@angular/core";
import {AuthenticationService} from "./authentication.service";
import {Http, Response} from "@angular/http";
import * as firebase from "firebase/app";





@Injectable()

export class PigeonService {

  //pigeons:Pigeon[] = [];


  constructor(private profileService: ProfileService, private authService: AuthenticationService, private http: Http){
  }

  getPigeons() {
    // return new Observable(observer => {
    //   firebase.database().ref('/pigeons').on('value', (pigeons) => {
    //     console.log(this.snapshotToArray(pigeons));
    //     observer.next(this.snapshotToArray(pigeons));
    //   });
    //   observer.complete();
    // });

    return firebase.database().ref('/pigeons');

  }

  snapshotToArray(snapshot) {
    let returnArr = [];

    snapshot.forEach((childSnapshot) => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });

    return returnArr;
  };


  updatePigeons(){
  }

  sendPigeon(message:{title:string, to:string, body:string, date:string}, token:string){
    const username = this.profileService.getUsername();
    const created = new Date().toISOString();
    const userId = this.authService.getActiveUser().uid;
    const pigeon:Pigeon = {created: created, title:message.title, body:message.body, date:message.date, from:{username:username, uid:userId}, to:message.to};
    //const fileId = new Date().getTime().toString();
    return this.http.post('https://pigeon-e922b.firebaseio.com/pigeons.json?auth=' + token, pigeon)
      .map((response: Response)=>{return response.json();});
  }

  // private dateToStringForURL(d:Date):string {
  //   const year = d.getFullYear().toString();
  //   const month = (d.getMonth() + 1).toString();
  //   const date = d.getDate().toString();
  //   return year + month + date;
  // }

}
