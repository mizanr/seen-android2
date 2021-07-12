import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, ViewController } from 'ionic-angular';
import { ProductlistPage } from '../productlist/productlist';

/**
 * Generated class for the PlaceorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-placeorder',
  templateUrl: 'placeorder.html',
})
export class PlaceorderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaceorderPage');
  }
  closemodal() {
    this.viewCtrl.dismiss();
  }
  list() {
    this.viewCtrl.dismiss();
    const modal = this.modalCtrl.create(ProductlistPage,{},{cssClass:'moremodel', showBackdrop:true, enableBackdropDismiss:true});
    modal.present();
  }
}
