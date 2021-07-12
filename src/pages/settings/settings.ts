import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { LoginPage } from '../login/login';
import { NotificationsPage } from '../notifications/notifications';
import { PivacyPage } from '../pivacy/pivacy';
import { ProfilePage } from '../profile/profile';
import { TermsPage } from '../terms/terms';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public nav: Nav) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  profile(){
    this.navCtrl.push(ProfilePage);
  }
  privacy(){
    this.navCtrl.push(PivacyPage);
  }
  about(){
    this.navCtrl.push(AboutPage);
  }
  terms(){
    this.navCtrl.push(TermsPage);
  }
  change(){
    this.navCtrl.push(ChangepasswordPage);
  }
  login(){
    this.nav.push(LoginPage);
  }
  notify(){
    this.navCtrl.push(NotificationsPage);
  }

}
