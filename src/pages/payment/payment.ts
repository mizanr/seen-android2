import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NavController, NavParams,  ViewController } from 'ionic-angular';
import { PromocodePage } from '../promocode/promocode';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public veiwCtrl:ViewController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  closemodal(){
    this.veiwCtrl.dismiss();
  }

  promocode() {
    const modal = this.modalCtrl.create(PromocodePage,{},{cssClass:'moremodel', showBackdrop:true, enableBackdropDismiss:true});
     modal.present();
   }

}
