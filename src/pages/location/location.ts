import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { NextvisitPage } from '../nextvisit/nextvisit';
import { NotificationsPage } from '../notifications/notifications';
import { PlaceorderPage } from '../placeorder/placeorder';
import { ProductlistPage } from '../productlist/productlist';
import { ProfilePage } from '../profile/profile';
import { SalesNotePage } from '../sales-note/sales-note';

/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
  }
  place() {
    const modal = this.modalCtrl.create(PlaceorderPage,{},{cssClass:'moremodel', showBackdrop:true, enableBackdropDismiss:true});
    modal.present();
  }
  next(){
    const modal = this.modalCtrl.create(NextvisitPage,{},{cssClass:'moremodel', showBackdrop:true, enableBackdropDismiss:true});
    modal.present();
  }
  sales(){
    const modal = this.modalCtrl.create(SalesNotePage,{},{cssClass:'moremodel', showBackdrop:true, enableBackdropDismiss:true});
    modal.present();
  }
  product() {
    const modal = this.modalCtrl.create(ProductlistPage,{},{cssClass:'moremodel', showBackdrop:true, enableBackdropDismiss:true});
    modal.present();
  }
  profile(){
    this.navCtrl.push(ProfilePage);
  }
  notify(){
    this.navCtrl.push(NotificationsPage);
  }
}
