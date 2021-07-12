import { AlertProvider } from './../../providers/alert/alert';
import { Component } from '@angular/core';
import { Events, NavController, NavParams, ViewController } from 'ionic-angular';
import { SeenCardPage } from '../seen-card/seen-card';

/**
 * Generated class for the PaymentOptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-payment-option',
  templateUrl: 'payment-option.html',
})
export class PaymentOptionPage {
  course_info:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public events:Events,
    public alertP: AlertProvider) {
      this.course_info= navParams.data.course_info;
      console.log(this.course_info);
      // events.subscribe('buynow',(data) => {
      //   console.log('buynow');
      //   // if(data){
      //     this.viewCtrl.dismiss('seen');
      //   // }
      // })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentOptionPage');
  }

  soon() {
    // this.viewCtrl.dismiss();
    alert('Coming Soon!');
  }

  new_method() {
    this.navCtrl.push(SeenCardPage,{course_info:this.course_info});
    setTimeout(() => {
      this.viewCtrl.dismiss();
    },500);
  }

}
