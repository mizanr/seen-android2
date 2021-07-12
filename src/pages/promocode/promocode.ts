import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PromocodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-promocode',
  templateUrl: 'promocode.html',
})
export class PromocodePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public veiwCtrl:ViewController) {
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromocodePage');
  }

  closemodal(){
    this.veiwCtrl.dismiss();
  }


}
