import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePigeonPage } from './create-pigeon';

@NgModule({
  declarations: [
    CreatePigeonPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePigeonPage)
  ],
})
export class CreatePostPageModule {}
