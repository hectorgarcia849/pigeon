import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {TabServiceObjectModel} from "../models/tab-service-object.model";

export class TabsService {

  private subjectIndexChange = new BehaviorSubject<TabServiceObjectModel>({index: -1, loadChild:[], loadOptions:[]});
  navItem$ = this.subjectIndexChange.asObservable();

  constructor(){}

  changeIndex(index:number, loadChild:any[], loadOptions?:any[]){
    //index refers to which tab to select from left to right, it makes that the root.  Then, allows any child views to be loaded on this with options.
    this.subjectIndexChange.next({index:index, loadChild:loadChild, loadOptions:loadOptions});
    console.log({index:index, loadChild:loadChild, loadOptions:loadOptions});
  }



}
