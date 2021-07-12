import { RestApiProvider } from "./../../providers/rest-api/rest-api";
import { AuthProvider } from "./../../providers/auth/auth";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { DetailsPage } from "../details/details";
import { NotificationsPage } from "../notifications/notifications";
import { IntoductionPage } from "../intoduction/intoduction";

@Component({
  selector: "page-teacherhome",
  templateUrl: "teacherhome.html"
})
export class TeacherhomePage {
  slides = [
    {
      image: "assets/imgs/seen/course-detail.png"
    },
    {
      image: "assets/imgs/seen/detail_image.png"
    },
    {
      image: "assets/imgs/seen/detail_image.png"
    }
  ];

  courseList: any=[];
  noDataS = false;
  interval;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public restApi: RestApiProvider
  ) {
    this.unread_count();
  }
  ionViewWillEnter() {
    this.getMyCourses();
  }

  getMyCourses() {
    let data = {
      user_id: { value: this.auth.getCurrentUserId(), type: "NO" }
    };
    this.restApi.postData(data, 0, "my_courses").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.courseList = result.data;
      } else {
      }

      if (this.courseList.length == 0) {
        this.noDataS = true;
      } else {
        this.noDataS = false;
      }
    });
  }

  
  details(k) {
    this.navCtrl.push(DetailsPage,{CourseId:k.course_id});
  }

  unread_count() {
    this.interval =   setInterval(() => {
          let Data = {
            user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
          }
          this.restApi.get(Data,0,'GetUnreadNotification').then((result:any) => {
              console.log('unread count--',result);
              if(result.status == 1){
                this.auth.notification_count = result.unreadNotification;
                
                if(result.is_block==1) {
                  clearInterval(this.interval);
                  // this.alertP.show('Alert','Your session is unauthorized');
                  setTimeout(() => {
                    this.nullupdate_deviceId();
                    this.auth.removeUserDetails();
                    this.navCtrl.setRoot(IntoductionPage);
                  },500);                   
                }
              } else {

              }
          })
      },3000)     
  }
  
  nullupdate_deviceId() {
    let Data = {
      id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
      device_id:{"value":'',"type":'NO'},
    }
    this.restApi.postData_withoutloder(Data,0,'UpdateDeviceId').then((result:any) => {
      console.log(result);
      if (result.status == 1) {      
        }
      })
  }

  noti() {
    this.navCtrl.push(NotificationsPage);
  }
  
}
