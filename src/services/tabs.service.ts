import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {TabServiceObjectModel} from "../models/tab-service-object.model";
import {TAB} from '../utils/tab';

export class TabsService {
  private tabChangeSubject = new BehaviorSubject<TabServiceObjectModel>({rootTab: -1, pagesToPush:[], loadOptions:[]});
  tabChange$ = this.tabChangeSubject.asObservable();

  constructor(){}

  changeTab(newRootTab: TAB, pagesToPush: any[], loadOptions = []){
    /*
       newRootTab refers to which rootTab to select from left to right and sets it as the new root.
       Allows any child views to be loaded on this with any specified options.
    */
    this.tabChangeSubject.next({rootTab: newRootTab, pagesToPush, loadOptions});
  }
}
