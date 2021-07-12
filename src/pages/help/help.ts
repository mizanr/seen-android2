import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  help_text:any;

  constructor(public navCtrl: NavController, 
    public restApi:RestApiProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

  ionViewWillEnter(){
    this.get_help();
  }

  get_help() {
    let url=`help_us`;
    this.restApi.get({},0,url).then((res:any) => {
      console.log(res);
      if(res.status==1){
        this.help_text=res.data.content;
      }
    })
  }

}
