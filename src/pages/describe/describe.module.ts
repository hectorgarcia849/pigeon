import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DescribePage } from './describe';

@NgModule({
  declarations: [
    DescribePage,
  ],
  imports: [
    IonicPageModule.forChild(DescribePage),
  ],
})
export class DescribePageModule {}
