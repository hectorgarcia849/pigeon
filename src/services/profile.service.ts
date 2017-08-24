
import {Profile} from "../models/profile.model";
import {Injectable } from "@angular/core";
import {AuthenticationService} from "./authentication.service";
import 'rxjs/Rx';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";


@Injectable()

export class ProfileService {

  private profile:Profile;

  constructor(public authService: AuthenticationService, public http: Http){
  }

  //user account details

  newProfile(username:string){
    this.profile = {
      username: username,
      descriptors: [],
      locationTimes: []
    };

    this.authService.getActiveUser().getIdToken().then((token) => this.storeProfileToServerDB(token));

  }

  getProfile(){
    return this.profile;
  }

  //descriptors

  getDescriptors(): string[] {
    return this.profile.descriptors.slice();
  }

  updateDescriptors(descriptors:string[]){
    this.profile.descriptors = descriptors;
  }

  retrieveProfileFromServerDB(token:string):Observable<Profile>{
    const userId = this.authService.getActiveUser().uid;
    console.log('retrieving from db','https://pigeon-e922b.firebaseio.com/users/' + userId + '/profile.json?auth=' + token);

    return this.http.get('https://pigeon-e922b.firebaseio.com/users/' + userId + '/profile.json?auth=' + token)
        .map((response: Response) => {
          this.profile = response.json() ? response.json() : [];
          console.log(this.profile);
          return this.profile;
        });
  }

  storeProfileToServerDB(token:string):Observable<Response> {
    console.log('storing to db', this.profile);
    const userId = this.authService.getActiveUser().uid;

    return this.http.put('https://pigeon-e922b.firebaseio.com/users/' + userId + '/profile.json?auth=' + token, this.profile)
        .map((response: Response) => {return response.json()});
  }

  getUsername(){
    return this.profile.username;
  }

  //profile add locationTimes

  addLocationTime(location:string, date:Date) {
    this.profile.locationTimes.push({location: location, date: date});
  }

  removeLocationTime(index:number){
    this.profile.locationTimes.splice(index, 1);
  }

  getLocationTimes(): {location:string, date:Date }[] {
    return this.profile.locationTimes.slice();
  }


}
