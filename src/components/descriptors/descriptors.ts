import {AfterContentInit, Component, EventEmitter, OnDestroy, OnInit} from "@angular/core";
import {AlertController, NavController, NavParams,} from "ionic-angular";
import {ProfileService} from "../../services/profile.service";
import {AuthenticationService} from "../../services/authentication.service";

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
              public profileService: ProfileService,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public authService: AuthenticationService) {

  }

  ngOnInit(){
    this.selectedDescriptors = this.profileService.getDescriptors();
  }

  // ionViewWillEnter(){
  //   this.selectedDescriptors = this.profileService.getDescriptors();
  // }

  ngAfterContentInit(){
    console.log('ngAfterContentInit() DescribeComponent', 'fromSignIn', this.navParams.get('fromSignIn'));
    this.fromSignIn = this.navParams.get('fromSignIn');
    this.hasMinDescriptors.emit(this.selectedDescriptors.length);
  }

  ngOnDestroy(){
    this.profileService.updateDescriptors(this.selectedDescriptors);
    console.log('leaving component', this.profileService.getDescriptors());

    this.authService.getActiveUser().getIdToken().then((token)=> {
      this.profileService.storeProfileToServerDB(token)
        .subscribe(
          () => {
          }),
        ((error) => {
          console.log(error);
          //this.handleError(error.json().error);
        });
    });
  }

  onSelect(i:number) {
    const descriptor: string = this.descriptors[i];
    if(this.selectedDescriptors.indexOf(descriptor) == -1) {
      this.selectedDescriptors.push(descriptor);
      //console.log(descriptor,' not in selected list, adding to list');
    }
    else {
      this.selectedDescriptors.splice(this.selectedDescriptors.indexOf(descriptor), 1);
      //console.log(descriptor, ' already in selected list, removing from list');
    }
    this.hasMinDescriptors.emit(this.selectedDescriptors.length);
  }

  isSelected(descriptor:string){
    if(this.selectedDescriptors.indexOf(descriptor) != -1) {
      return true;
    }
    else {
      return false;
    }
  }

  onNext() {
    this.navCtrl.pop();
  }

  private handleError(errorMessage: string){
    const alert = this.alertCtrl.create({
      title: 'error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }


}
