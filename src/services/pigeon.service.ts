import {Pigeon} from "../models/pigeon.model";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';

@Injectable()

export class PigeonService {

  constructor(private http: Http){
  }

  getPigeons(token: string) {
    return this.http.get(`https://pacific-river-87352.herokuapp.com/pigeons?token=${token}`)
      .map((response: Response) => {return response.json().pigeons});
  }

  sendPigeon(token:string, pigeon:{title:string, to:string, from: string, body:string, encounterDate:number}){
    const body = pigeon;
    return this.http.post(`https://pacific-river-87352.herokuapp.com/pigeons?token=${token}`, body)
      .map((response: Response) => {return response.json().pigeon;});

  }

  getPigeonsByOwner(_owner:string){
    return this.http.get(`https://pacific-river-87352.herokuapp.com/pigeons/${_owner}`)
      .map((response: Response) => {return response.json().pigeons});
  }

  deletePigeon(_id:string){
    return this.http.get(`https://pacific-river-87352.herokuapp.com/pigeons/${_id}`)
      .map((response: Response) => {return response.json()});
  }

  updatePigeon(pigeon:Pigeon){
    return this.http.patch(`https://pacific-river-87352.herokuapp.com/pigeons/${pigeon._id}`, pigeon)
      .map((response: Response) => {return response.json()});

  }

}
