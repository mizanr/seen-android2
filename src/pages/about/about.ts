import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { NotificationsPage } from '../notifications/notifications';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  about_text: any;

  constructor(public navCtrl: NavController,
    public restApi:RestApiProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.get_aboutus();
    console.log('ionViewDidLoad AboutPage');
  }

  profile(){
    this.navCtrl.push(ProfilePage);
  }
  
  notify(){
    this.navCtrl.push(NotificationsPage);
  }

  get_aboutus() {
    let url=`about_us`;
    this.restApi.get({},0,url).then((res:any) => {
      console.log(res);
      if(res.status==1){
        this.about_text=res.data.content;
      }
    })
  }

}
