import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  slides = [
    {
      image: "assets/imgs/product.png",
    },
    {
      image: "assets/imgs/product.png",
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }
  profile(){
    this.navCtrl.push(ProfilePage);
  }
  notify(){
    this.navCtrl.push(NotificationsPage);
  }
}
