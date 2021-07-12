import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewsDetailPage } from '../news-detail/news-detail';
import { NotificationsPage } from '../notifications/notifications';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }
  
  details(){
    this.navCtrl.push(NewsDetailPage);
  }
  profile(){
    this.navCtrl.push(ProfilePage);
  }
  notify(){
    this.navCtrl.push(NotificationsPage);
  }
}
