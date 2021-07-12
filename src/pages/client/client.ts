import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AddclientPage } from '../addclient/addclient';
import { DetailsPage } from '../details/details';
import { NotificationsPage } from '../notifications/notifications';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the ClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
})
export class ClientPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientPage');
  }
  add() {
    const modal = this.modalCtrl.create(AddclientPage,{},{cssClass:'moremodel', showBackdrop:true, enableBackdropDismiss:true});
    modal.present();
  }
  details(){
    this.navCtrl.push(DetailsPage);
  }
  profile(){
    this.navCtrl.push(ProfilePage);
  }
  notify(){
    this.navCtrl.push(NotificationsPage);
  }
}
