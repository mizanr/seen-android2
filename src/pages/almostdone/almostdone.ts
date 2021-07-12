import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocationPage } from '../location/location';

/**
 * Generated class for the AlmostdonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-almostdone',
  templateUrl: 'almostdone.html',
})
export class AlmostdonePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlmostdonePage');
  }
  next(){
    this.navCtrl.push(LocationPage);
  }
}
