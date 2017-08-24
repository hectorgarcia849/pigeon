import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectedMessagePage } from './selected-message';

@NgModule({
  declarations: [
    SelectedMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(SelectedMessagePage),
  ],
})
export class SelectedMessagePageModule {}
