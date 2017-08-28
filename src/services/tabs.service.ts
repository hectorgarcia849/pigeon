import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {TabServiceObjectModel} from "../models/tab-service-object.model";

export class TabsService {

  private subjectIndexChange = new BehaviorSubject<TabServiceObjectModel>({index: -1, loadChild:[], loadOptions:[]});
  navItem$ = this.subjectIndexChange.asObservable();

  constructor(){}

  changeIndex(index:number, loadChild:any[], loadOptions?:any[]){
    this.subjectIndexChange.next({index:index, loadChild:loadChild, loadOptions:loadOptions});
  }



}
