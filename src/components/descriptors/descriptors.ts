import {AfterContentInit, Component, EventEmitter, OnDestroy, OnInit} from "@angular/core";
import {AlertController, NavController, NavParams,} from "ionic-angular";
import {ProfileService} from "../../services/profile.service";
import {AuthenticationService} from "../../services/authentication.service";
//import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'descriptors',
  templateUrl: 'descriptors.html',
  outputs: ['hasMinDescriptors']
})
export class DescriptorsComponent implements AfterContentInit, OnInit, OnDestroy {

  descriptors:string[] = ['male','female', 'tall', 'brunette', 'blue eyes', 'short', 'blonde', 'thin' ];
  selectedDescriptors:string[];
  fromSignIn = false;
  hasMinDescriptors = new EventEmitter<number>();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private profileService: ProfileService,
              private authService: AuthenticationService) {

  }

  ngOnInit(){
    this.selectedDescriptors = this.profileService.getDescriptors();
  }

  ionViewWillEnter(){
    this.fromSignIn = this.navParams.get('fromSignIn');
  }

  ionViewCanLeave(): boolean{return true;}

  ngAfterContentInit(){
    this.hasMinDescriptors.emit(this.selectedDescriptors.length);
  }

  ngOnDestroy(){
    this.profileService.updateDescriptors(this.selectedDescriptors);
    this.authService.getToken().then((token)=> {
      this.profileService.storeProfile(token)
        .subscribe(
          (updatedProfile) => {
            console.log('successful', updatedProfile);
          },
        (error) => {
          console.log(error);
        });
    });
  }

  onSelect(i:number) {
    const descriptor: string = this.descriptors[i];
    if(this.selectedDescriptors.indexOf(descriptor) == -1) {
      this.selectedDescriptors.push(descriptor);
    }
    else {
      this.selectedDescriptors.splice(this.selectedDescriptors.indexOf(descriptor), 1);
    }
    this.hasMinDescriptors.emit(this.selectedDescriptors.length);
  }

  isSelected(descriptor:string){
    return this.selectedDescriptors.indexOf(descriptor) != -1;
  }

  onNext() {
    this.navCtrl.pop();
  }
}
