import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {Pigeon} from "../../models/pigeon.model";
import {PigeonService} from "../../services/pigeon.service";



@IonicPage()
@Component({
  selector: 'page-create-post',
  templateUrl: 'create-post.html',
})
export class CreatePostPage {

  piegon:Pigeon;

  constructor(private pigeonService: PigeonService){}

  onSend() {

    //this.pigeonService.sendPigeon(title, body, date, to);

  }
}
