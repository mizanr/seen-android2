import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, ViewController } from 'ionic-angular';
import { PlaceorderPage } from '../placeorder/placeorder';

/**
 * Generated class for the ProductlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-productlist',
  templateUrl: 'productlist.html',
})
export class ProductlistPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public veiwCtrl:ViewController, public modalCtrl: ModalController) {
  }
  place() {
    this.veiwCtrl.dismiss();
    const modal = this.modalCtrl.create(PlaceorderPage,{},{cssClass:'moremodel', showBackdrop:true, enableBackdropDismiss:true});
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductlistPage');
  }
  closemodal(){
    this.veiwCtrl.dismiss();
  }
}
