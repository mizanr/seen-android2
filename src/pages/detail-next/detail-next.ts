import { Component } from '@angular/core';
import { Nav, NavController, NavParams } from 'ionic-angular';
import { JoinPage } from '../join/join';

/**
 * Generated class for the DetailNextPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail-next',
  templateUrl: 'detail-next.html',
})
export class DetailNextPage {
  pet: string = "full";
  constructor(public navCtrl: NavController, public navParams: NavParams, public nav:Nav) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailNextPage');
  }

  join(){
    this.nav.push(JoinPage);
  }
}
