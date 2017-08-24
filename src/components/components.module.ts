import { NgModule } from '@angular/core';
import { DescriptorsComponent } from './descriptors/descriptors';
import {IonicModule} from "ionic-angular";
@NgModule({
	declarations: [DescriptorsComponent],
	imports: [IonicModule],
	exports: [DescriptorsComponent]
})
export class ComponentsModule {}
