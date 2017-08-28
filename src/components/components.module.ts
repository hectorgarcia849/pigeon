import { NgModule } from '@angular/core';
import { DescriptorsComponent } from './descriptors/descriptors';
import {IonicModule} from "ionic-angular";
import { ChatBubbleComponent } from './chat-bubble/chat-bubble';
import {MomentModule} from "angular2-moment";

@NgModule({
	declarations: [DescriptorsComponent,
    ChatBubbleComponent],
	imports: [IonicModule, MomentModule],
	exports: [DescriptorsComponent,
    ChatBubbleComponent]
})
export class ComponentsModule {}
