import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events ,App} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the ThankyouPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-thankyou',
  templateUrl: 'thankyou.html',
})
export class ThankyouPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public app:App,
    public viewCtrl: ViewController, public events: Events) {
  }

}
