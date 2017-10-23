import {Pigeon} from "../models/pigeon.model";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()

export class PigeonService {

  private pigeonsSubject: BehaviorSubject<Pigeon[]> = new BehaviorSubject([]);
  public pigeons$ = this.pigeonsSubject.asObservable();

  private url = 'http://localhost:3000'; //https://pacific-river-87352.herokuapp.com

  constructor(private http: Http){
  }

  getPigeonsFromServer(token: string) {
    this.http.get(`${this.url}/pigeons?token=${token}`)
      .map((response: Response) => response.json().pigeons)
      .subscribe((pigeons:Pigeon[]) => this.pigeonsSubject.next(pigeons));
  }

  sendPigeon(token: string, pigeon:{title:string, to:string, from: string, body:string, encounterDate:number}){
    return this.http.post(`${this.url}/pigeons?token=${token}`, pigeon)
      .map((response: Response) => {return response.json().pigeon;});
  }

  getPigeonsByOwner(_owner: string){
    return this.http.get(`${this.url}/pigeons/${_owner}`)
      .map((response: Response) => {return response.json().pigeons});
  }

  deletePigeon(_id:string){
    return this.http.get(`${this.url}/pigeons/${_id}`)
      .map((response: Response) => {return response.json()});
  }

  updatePigeon(pigeon:Pigeon){
    return this.http.patch(`${this.url}/pigeons/${pigeon._id}`, pigeon)
      .map((response: Response) => {return response.json()});

  }

}
