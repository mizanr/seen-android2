import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlmostdonePage } from '../almostdone/almostdone';

/**
 * Generated class for the JoinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-join',
  templateUrl: 'join.html',
})
export class JoinPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoinPage');
  }

  done(){
    this.navCtrl.push(AlmostdonePage);
  }

}
