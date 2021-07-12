import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the AddclientinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-addclientinfo',
  templateUrl: 'addclientinfo.html',
})
export class AddclientinfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddclientinfoPage');
  }
  profile(){
    this.navCtrl.push(ProfilePage);
  }
  notify(){
    this.navCtrl.push(NotificationsPage);
  }
}
