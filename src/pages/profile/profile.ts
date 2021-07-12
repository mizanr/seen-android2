import { DetailsPage } from './../details/details';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import { SettingsPage } from '../settings/settings';
import { HelpPage } from '../help/help';
import { MycourcesPage } from '../mycources/mycources';
import { MyQuizPage } from '../my-quiz/my-quiz';
import { AlertProvider } from '../../providers/alert/alert';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
typ="Plan";
gaming: string = "n64";
  myCourseList: any = [];
  phone: any='';
noDataSCourse = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public auth: AuthProvider,
    public alertP:AlertProvider,
    public restApi:RestApiProvider) {
      this.getMyCourses();
      this.phone=this.auth.getUserDetails().phone;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  setting(){
    this.navCtrl.push(SettingsPage);
  }
  notify(){
    this.navCtrl.push(NotificationsPage);
  }

  help(){
    this.navCtrl.push(HelpPage);
  }

  mycourse(){
    this.navCtrl.push(MycourcesPage);
  }

  back(){
  this.navCtrl.pop();
  }
  
  getMyCourses() {
    let data = {
      user_id: { value: this.auth.getCurrentUserId(), type: "NO" }
    };
    this.restApi.postData(data, 0, "my_courses").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.myCourseList = result.data;
      } else {
      }

      if (this.myCourseList.length == 0) {
        this.noDataSCourse = true
      } else {
        this.noDataSCourse = false
      }
    });
  }
  
  details(k) {
    this.navCtrl.push(DetailsPage, { CourseId: k.course_id });
  }

  my_quiz() {
    this.navCtrl.push(MyQuizPage);
  }

  update() {
    let Data = {
      user_id:{value:this.auth.getCurrentUserId(),type:"NO"},
      phone:{value:this.phone,type:"PHONE"},
    }
    this.restApi.postData(Data,0,'edit_profile').then((res:any) => {
      console.log(res);
      if(res.status==1){
        this.auth.updateUserDetails(res.data);
        this.alertP.showAsync('نجاح',res.message).then(() => {
          
        })
      }
    })
  }
  
}
