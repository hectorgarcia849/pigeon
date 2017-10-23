import {Http, Response, Headers} from "@angular/http";
import {User} from "../models/user.model";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Storage} from "@ionic/storage";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {errorObject} from "rxjs/util/errorObject";

@Injectable()

export class AuthenticationService {

  private IsLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.IsLoggedInSubject.asObservable();
  private user: User;
  private token: string;
  private url = 'http://localhost:3000';
 // private url = 'https://pacific-river-87352.herokuapp.com'

  constructor(private http: Http, private storage: Storage) {
  }

  signup(email: string, password: string) {
    const body = JSON.stringify({email: email, password: password});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(`${this.url}/users`, body, {headers})
      .map((response: Response) => {
        this.user = response.json().user;
        this.setAndStoreToken(response.json().token);
        this.updateLoggedInSubject(true);
        return response.json();
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  signin(email: string, password:string) {
    const body = JSON.stringify({email:email.toLowerCase(), password:password});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(`${this.url}/users/login`, body, {headers})
      .map((response: Response) => {
        this.user = response.json().user;
        this.setAndStoreToken(response.json().token)
        this.updateLoggedInSubject(true);
        return response.json();
      })
      .catch((error: Response) => Observable.throw(error));
  }
  private setToken(token) {
    this.token = token;
  }
  setAndStoreToken(token) {
    this.setToken(token);
    this.storage.set('token', token);
  }

  getLocalToken(): Promise<string> {
    return this.storage.get('token').then((token) => {
      return new Promise<string>((resolve, reject) => {
        if(token) {
          resolve(token);
        } else {
          reject(token);
        }
      });
    });
  }

  getUserFromDatabase(token: string) {
    return this.http.get(`${this.url}/users/me?token=${token}`)
      .map((response: Response) => this.user = response.json().user)
      .catch((error: Response) => {
        return Observable.throw(error)
    });
  }

  getUser(): User {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }

  logout(): Promise<any> {
    this.updateLoggedInSubject(false);
    return this.storage.remove('token');
  }

  updateLoggedInSubject(state:boolean){
    this.IsLoggedInSubject.next(state);
  }
}
