import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ChatdetailsPage } from '../chatdetails/chatdetails';

/**
 * Generated class for the ChatlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chatlist',
  templateUrl: 'chatlist.html',
})
export class ChatlistPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatlistPage');
  }
  
  chatdetail(){
     this.navCtrl.push(ChatdetailsPage);
  }
}
