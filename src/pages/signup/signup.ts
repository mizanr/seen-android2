import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { EmailFormPage } from '../email-form/email-form';
import { TermsPage } from '../terms/terms';
import { PrivacyPage } from '../privacy/privacy';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  terms() {
    this.navCtrl.push(TermsPage);
  }
  login() {
    this.navCtrl.push(LoginPage);
  }
  signup() {
    this.navCtrl.push(EmailFormPage);
  }
  privacy() {
    this.navCtrl.push(PrivacyPage);
  }
}
