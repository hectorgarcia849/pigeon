import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectedPostPage } from './selected-post';

@NgModule({
  declarations: [
    SelectedPostPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectedPostPage),
  ],
})
export class SelectedPostPageModule {}
