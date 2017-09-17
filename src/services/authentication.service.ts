import {Http, Response, Headers} from "@angular/http";
import {User} from "../models/user.model";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Storage} from "@ionic/storage";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()

export class AuthenticationService {

  private subjectIsLoggedIn = new BehaviorSubject<boolean>(false);
  authState$ = this.subjectIsLoggedIn.asObservable();

  user:User;

  constructor(private http: Http, private storage: Storage){
  }

  signup(email: string, password: string){
    const body = JSON.stringify({email:email, password:password});
    console.log(body);
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post('https://pacific-river-87352.herokuapp.com/users', body, {headers})
      .map((response: Response) => {
        console.log(response.json());
        this.user = response.json().user;
        this.storage.set('token', response.json().token);
        return response.json();})
      .catch((error: Response) => Observable.throw(error.json()));
  }

  signin(email: string, password:string){
    const body = JSON.stringify({email:email, password:password});
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post('https://pacific-river-87352.herokuapp.com/users/login', body, {headers})
      .map((response: Response) => {
        console.log(response.json());
        this.user = response.json().user;
        this.storage.set('token', response.json().token);
        return response.json();})
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getToken(): Promise<string> {
    return this.storage.get('token');
  }


  logout():Promise<any> {
    return this.storage.remove('token');
  }

  updateLoggedInState(state:boolean){
    this.subjectIsLoggedIn.next(state);
  }

}
