
import {Injectable } from "@angular/core";
import 'rxjs/Rx';
import {Http, Response, Headers} from "@angular/http";
import {Profile} from "../models/profile.model";
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";

@Injectable()

export class ProfileService {

  private profile: Profile;
  private profileSubject = new ReplaySubject<Profile>(1);
  profile$ = this.profileSubject.asObservable();
  private url = 'http://localhost:3000'; //https://pacific-river-87352.herokuapp.com

  constructor(private http: Http){

  }

  //user account details

  createProfileOnServer(token: string, profile: Profile) {

    const collectedProfileData = {
      /* successful saving on Server will create owner and created timestamp */
      username: profile.username,
      firstName: profile.firstName,
      lastName: profile.lastName,
      descriptors: profile.descriptors,
      locationTimes: profile.locationTimes
    };

    const body = JSON.stringify(collectedProfileData);
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(`${this.url}/profile?token=${token}`, body, {headers})
      .map((response: Response) => {
        console.log('new profile created: ', response.json().profile);
        this.setProfile(response.json().profile);
        return this.profile;})
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getProfileFromServer(token: string){
    return this.http.get(`${this.url}/profile/me?token=${token}`)
      .map((response: Response) => {
        console.log('retreived profile: ', response.json().profile);
        this.setProfile(response.json().profile);
        return this.profile
    });
  }

  saveProfileOnServer(token: string){
    return this.http.patch(`${this.url}/profile/me?token=${token}`, this.profile)
      .map((response: Response) => {
        console.log('saved profile: ', response.json().profile);
        return response.json().profile;
      });
  }

  getProfile(){
    if(this.profile) {
      return this.profile;
    }
  }

  setProfile(profile: Profile) {
    this.profile = profile;
  }

  broadcastProfile(){
    console.log('broadcasting profile: ', this.profile);
    this.profileSubject.next(this.profile);
  }

  // getDescriptors(): string[] {
  //   return this.profile.descriptors.slice();
  // }
  //
  // updateDescriptors(descriptors:string[]){
  //   this.profile.descriptors = descriptors;
  // }
  //
  // addLocationTime(country:string, city:string, place:string, fromDate:number, toDate:number) {
  //   this.profile.locationTimes.push({country, city, place, fromDate, toDate});
  // }
  //
  // removeLocationTime(index:number){
  //   this.profile.locationTimes.splice(index, 1);
  // }
  //
  // getLocationTimes(): {country:string, city:string, place:string, fromDate:number, toDate:number}[] {
  //   return this.profile.locationTimes.slice();
  // }

}
