import {AfterContentInit, Component, EventEmitter, OnDestroy, OnInit} from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import {ProfileService} from "../../services/profile.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Subscription} from "rxjs/Subscription";
import {Profile} from "../../models/profile.model";

@Component({
  selector: 'descriptors',
  templateUrl: 'descriptors.html',
  outputs: ['hasMinDescriptors']
})
export class DescriptorsComponent implements AfterContentInit, OnInit, OnDestroy {

  descriptors: string[] = ['male','female', 'tall', 'brunette', 'blue eyes', 'short', 'blonde', 'thin' ];
  profile: Profile;
  pageTransitionIsfromSignIn = false;
  hasMinDescriptors = new EventEmitter<number>();
  profileSubsciption: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private profileService: ProfileService,
              private authService: AuthenticationService) {}

  ngOnInit(){
    this.pageTransitionIsfromSignIn = this.navParams.get('pageTransitionIsfromSignIn');
    this.profileSubsciption = this.profileService
      .profile$
      .subscribe((profile: Profile) => {
        console.log('profile subscription', profile);
        this.profile = profile;
        this.profile.descriptors = this.pageTransitionIsfromSignIn? [] : this.profile.descriptors;
      });
  }

  ionViewWillEnter(){

  }

  ionViewCanLeave(): boolean{return true;}

  ngAfterContentInit(){
    this.hasMinDescriptors.emit(this.profile.descriptors.length);
  }

  ngOnDestroy(){
    this.profileService.setProfile(this.profile);
    this.authService.getLocalToken()
      .then((token) => {
        this.profileService.saveProfileOnServer(token)
          .subscribe(
            (updatedProfile) => {
              this.profileService.broadcastProfile();
            },
          (error) => {
            console.log(error);
          });
    });
  }

  onSelect(i: number) {
    const descriptor = this.descriptors[i];
    if(this.profile.descriptors.indexOf(descriptor) == -1) {
      this.profile.descriptors.push(descriptor);
    }
    else {
      this.profile.descriptors.splice(this.profile.descriptors.indexOf(descriptor), 1);
    }
    this.hasMinDescriptors.emit(this.profile.descriptors.length);
  }

  isSelected(descriptor: string){
    return this.profile.descriptors.indexOf(descriptor) != -1;
  }

  onNext() {
    this.navCtrl.pop();
  }
}
