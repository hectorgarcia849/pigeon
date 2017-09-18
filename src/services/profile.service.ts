
import {Injectable } from "@angular/core";
import 'rxjs/Rx';
import {Http, Response, Headers} from "@angular/http";
import {Profile} from "../models/profile.model";
import {Observable} from "rxjs/Observable";

@Injectable()

export class ProfileService {

  private profile:Profile;
  private url = 'http://localhost:3000'; //https://pacific-river-87352.herokuapp.com

  constructor(public http: Http){

  }

  //user account details

  createProfile(token:string, profile: {username:string, firstName:string, lastName:string, descriptors:string[], locationTimes:{country:string, city:string, place:string, fromDate:number, toDate:number}[]}) {

    this.profile = {
      _owner: null,
      created: null,
      username: profile.username,
      firstName: profile.firstName,
      lastName: profile.lastName,
      descriptors: profile.descriptors,
      locationTimes: profile.locationTimes
    }

    const body = JSON.stringify(this.profile);
    const headers = new Headers({'Content-Type': 'application/json'});

    console.log(token);
    console.log(body);

    return this.http.post(`${this.url}/profile?token=${token}`, body, {headers})
      .map((response: Response) => {
        console.log(response.json());
        this.profile = response.json().profile;
        return this.profile;})
      .catch((error: Response) => Observable.throw(error.json()));
  }

  fetchProfile(token: string){
    return this.http.get(`${this.url}/profile/me?token=${token}`)
      .map((response: Response) => {
        this.profile = response.json().profile;
        return this.profile
    });
  }

  storeProfile(token: string){
    return this.http.patch(`${this.url}/profile/me?token=${token}`, this.profile)
      .map((response: Response) => {
        this.profile = response.json().profile;
        return this.profile;
      });
  }

  getProfile(){
    if(this.profile) {
      return this.profile;
    }
  }

  updateProfile(updatedProfile:Profile){
    this.profile = updatedProfile;
  }

  getDescriptors(): string[] {
    return this.profile.descriptors.slice();
  }

  updateDescriptors(descriptors:string[]){
    this.profile.descriptors = descriptors;
  }

  addLocationTime(country:string, city:string, place:string, fromDate:number, toDate:number) {
    this.profile.locationTimes.push({country, city, place, fromDate, toDate});
  }

  removeLocationTime(index:number){
    this.profile.locationTimes.splice(index, 1);
  }

  getLocationTimes(): {country:string, city:string, place:string, fromDate:number, toDate:number}[] {
    return this.profile.locationTimes.slice();
  }

}
