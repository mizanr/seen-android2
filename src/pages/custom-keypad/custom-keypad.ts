import { Component, NgZone } from '@angular/core';
import { Events, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the CustomKeypadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-custom-keypad',
  templateUrl: 'custom-keypad.html',
})
export class CustomKeypadPage {
  step = 2;
  num: any;
  form: any;
  arr = [

  ];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public auth: AuthProvider,
    public zone: NgZone,
    public viewCtrl: ViewController,) {
    this.form = this.navParams.get("form")

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomKeypadPage');
  }

  pressa(i) {
    if (i == '١١') {
      this.viewCtrl.dismiss();
    }
    else if (i == '١٢') {
      this.arr.pop();
      this.events.publish('keypad_', this.num);
      // this.viewCtrl.dismiss();
    } else if (i == "#" || i == '*') {

    }
    else {
      this.arr.push(i);

      //this.events.publish('keypad_', this.num);
      //this.viewCtrl.dismiss();
    }
    this.num = this.arr.join('');
    this.zone.run(() => {
      if (this.navParams.get('type') == 'price') {
        this.form.price = this.num;
      } else {
        this.form.duration = this.num;
      }
      console.log(this.num);
    })

  }

  back() {
    this.viewCtrl.dismiss();
  }

}
