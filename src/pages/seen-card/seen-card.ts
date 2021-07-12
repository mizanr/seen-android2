import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { BuyProvider } from '../../providers/buy/buy';
import { DataStoreProvider } from '../../providers/data-store/data-store';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

/**
 * Generated class for the SeenCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-seen-card',
  templateUrl: 'seen-card.html',
})
export class SeenCardPage {
title:any;
desc:any;
course_info:any;
  constructor(public navCtrl: NavController, 
    public restApi: RestApiProvider,
    public auth: AuthProvider,
    public aler: AlertProvider,
    public buyP: BuyProvider,
    public dataP:DataStoreProvider,
    public events:Events,
    public navParams: NavParams) {
      this.course_info= navParams.data.course_info;
      console.log(this.course_info);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeenCardPage');
    this.get_content();
  }

  get_content() {
    // let Data = {
    //   user_id:{value:this.auth.getCurrentUserId(),type:"NO"},
    // }
    // this.restApi.postData(Data,0,'get_seen_card_details').then((res:any) => {
    //   console.log(res);
    //   if(res.status==1){

    //   }
    // })
    let url = 'get_seen_card_details';
    this.restApi.get({},0,url).then((res:any) => {
      console.log(res);
      if(res.status==1){
        this.title = res.data[0].seen_card_title;
        this.desc = res.data[0].seen_card_description;
      }
    })
  }

  seen_code() {
    this.navCtrl.pop();
    setTimeout(() => {
      this.events.publish('seenCode',true);
      // this.buyP.Option_ForBuy(this.course_info.course_id);
    },500);
  }


  request_code() {
       let Data = {
        // user_id:{value:this.auth.getCurrentUserId(),type:"NO"},
        course_id:{value:this.course_info.course_id,type:"NO"},
        teacher_id:{value:this.course_info.teacher_id,type:"NO"},
        student_id:{value:this.auth.getCurrentUserId(),type:"NO"},
    }
    this.restApi.postData(Data,0,'seen_card_request').then((res:any) => {
      console.log(res);
      if(res.status==1){
        this.aler.showAsync('النجاح',res.message).then(() => {
          this.navCtrl.pop();
        })
      } else {
        this.aler.show('يحذر',res.message);
      }
    })
  }

}
