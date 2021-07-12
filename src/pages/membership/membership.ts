import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import { ModalpagePage } from '../modalpage/modalpage';

/**
 * Generated class for the MembershipPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-membership',
  templateUrl: 'membership.html',
})
export class MembershipPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  //  presentModal() {
  //   const modal = this.modalCtrl.create('ModalpagePage');
  //   modal.present();
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MembershipPage');
  }
  
}
