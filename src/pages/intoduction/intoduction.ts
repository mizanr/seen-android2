import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { SelectPage } from '../select/select';

/**
 * Generated class for the IntoductionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-intoduction',
  templateUrl: 'intoduction.html',
})
export class IntoductionPage {
  @ViewChild('sl') slide: Slides;
images:any=[];
  constructor(public navCtrl: NavController, 
    public restApi:RestApiProvider,
    public navParams: NavParams) {
      this.getSplash();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntoductionPage');
  }

  getSplash() {
    this.restApi.postDatawithoutldr({}, 0, "get_splash").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.images = result.data;
      } else {
      }
    });
  }

  next() {
    this.navCtrl.push(SelectPage);
  }

}
