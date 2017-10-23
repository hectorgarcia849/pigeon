import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectedPigeonPage } from './selected-pigeon';

@NgModule({
  declarations: [
    SelectedPigeonPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectedPigeonPage),
  ],
})
export class SelectedPigeonPageModule {}
