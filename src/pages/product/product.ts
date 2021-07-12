import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import { ProductDetailPage } from '../product-detail/product-detail';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

  detail(){
    this.navCtrl.push(ProductDetailPage);
  }

  profile(){
    this.navCtrl.push(ProfilePage);
  }
  notify(){
    this.navCtrl.push(NotificationsPage);
  }
}
