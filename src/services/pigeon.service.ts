import {Pigeon} from "../models/pigeon.model";
import firebase from 'firebase';
import {ProfileService} from "./profile.service";
import {Injectable} from "@angular/core";
import {AuthenticationService} from "./authentication.service";


@Injectable()

export class PigeonService {

  pigeons:Pigeon[] = [];
  body:string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  userId;


  constructor(private profileService: ProfileService, private authService: AuthenticationService){
    this.userId = this.authService.getUserId();
    this.pigeons = [{date: new Date(99,5,24,11,33,30,0), title: "cute man who was in rush/dropped by for quick work out", from: {username:"Dave", uid:this.userId}, to: "Female", body: this.body}, {date: new Date(99,5,24,11,33,30,0), title: "kirk I miss you everyday", from: {username:"Dave", uid:this.userId}, to: "Female", body: this.body}, {date: new Date(2000,5,24,11,33,30,0), title: "tall woman on lunch date", from: {username:"Dave", uid:this.userId}, to: "Female", body: this.body}, {date: new Date(2001,5,24,11,33,30,0), title: "the girl with the awesome tattoos", from: {username:"Dave", uid:this.userId}, to: "Female", body: this.body}, {date: new Date(2017,5,24,11,33,30,0), title: "the girl with the awesome tattoos", from: {username:"Dave", uid:this.userId}, to: "Female", body: this.body}, {date: new Date(99,5,24,11,33,30,0), title: "the girl with the awesome tattoos", from: {username:"Dave", uid:this.userId}, to: "Female", body: this.body}, {date: new Date(99,5,24,11,33,30,0), title: "the girl with the awesome tattoos", from: {username:"Dave", uid:this.userId}, to: "Female", body: this.body}];
  }


  getPigeons(){
    return this.pigeons;
  }

  updatePigeons(){
  }

  sendPigeon(title:string, body:string, date:Date, to:string){
    const username = this.profileService.getUsername();
    const pigeon:Pigeon = {title:title, body:body, date:date, from:{username:username, uid:this.userId}, to:to};
    return firebase.database().ref('pigeons/' + date).set(pigeon);
  }

}
