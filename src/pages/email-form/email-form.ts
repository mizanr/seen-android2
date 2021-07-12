import { Component } from '@angular/core';
import { Nav, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the EmailFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-email-form',
  templateUrl: 'email-form.html',
})
export class EmailFormPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public nav: Nav) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailFormPage');
  }
  back(){
    this.navCtrl.pop();
  }
  home(){
    this.nav.setRoot(HomePage);
  }
}
