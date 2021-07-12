import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the NextvisitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-nextvisit',
  templateUrl: 'nextvisit.html',
})
export class NextvisitPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NextvisitPage');
  }
  closemodal(){
    this.view.dismiss();
  }
  profile(){
    this.navCtrl.push(ProfilePage);
  }
}
