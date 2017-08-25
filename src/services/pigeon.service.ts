import {Pigeon} from "../models/pigeon.model";
import {ProfileService} from "./profile.service";
import {Injectable} from "@angular/core";
import {AuthenticationService} from "./authentication.service";
import {Http, Response} from "@angular/http";
import * as firebase from "firebase/app";





@Injectable()

export class PigeonService {

  //pigeons:Pigeon[] = [];
  //body:string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  constructor(private profileService: ProfileService, private authService: AuthenticationService, private http: Http){
    //this.pigeons = [{created: new Date().toISOString(), date: new Date(99,5,24,11,33,30,0).toISOString(), title: "cute man who was in rush/dropped by for quick work out", from: {username:"Dave", uid:this.userId}, to: "Female", body: this.body}, {created: new Date().toISOString(), date: new Date(99,5,24,11,33,30,0).toISOString(), title: "kirk I miss you everyday", from: {username:"Dave", uid:this.userId}, to: "Female", body: this.body}, {created: new Date().toISOString(), date: new Date(2000,5,24,11,33,30,0).toISOString(), title: "tall woman on lunch date", from: {username:"Dave", uid:this.userId}, to: "Female", body: this.body}, {created: new Date().toISOString(), date: new Date(2001,5,24,11,33,30,0).toISOString(), title: "the girl with the awesome tattoos", from: {username:"Dave", uid:this.userId}, to: "Female", body: this.body}, {created: new Date().toISOString(), date: new Date(2017,5,24,11,33,30,0).toISOString(), title: "the girl with the awesome tattoos", from: {username:"Dave", uid:this.userId}, to: "Female", body: this.body}, {created: new Date().toISOString(), date: new Date(99,5,24,11,33,30,0).toISOString(), title: "the girl with the awesome tattoos", from: {username:"Dave", uid:this.userId}, to: "Female", body: this.body}, {created: new Date().toISOString(), date: new Date(99,5,24,11,33,30,0).toISOString(), title: "the girl with the awesome tattoos", from: {username:"Dave", uid:this.userId}, to: "Female", body: this.body}];
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
