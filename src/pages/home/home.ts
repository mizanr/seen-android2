import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { NextvisitPage } from '../nextvisit/nextvisit';
import { NotificationsPage } from '../notifications/notifications';
import { ProductlistPage } from '../productlist/productlist';
import { ProfilePage } from '../profile/profile';
import { SalesNotePage } from '../sales-note/sales-note';
import { IntoductionPage } from '../intoduction/intoduction';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  buttonColor = "#fff";
  typ = "Explore"
  inner = "eBay";
  active: any = '';

  about_text:any;

  activate = [
    { active: false },
  ];

  toggleClass(activate) {
    activate.active = !activate.active;
    console.log('Chala');

  }
  level: any;
  subjectList: any;
  selectedSubject: any = '';
  courseList: any = [];
  noDataS = false;
  allItems = [];
  myCourseList: any = [];
  noDataSCourse = false;

  interval: any;

  openDetail(variant) {
    this.buttonColor = '#a306f9';
  }
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    public auth: AuthProvider,
    public restApi: RestApiProvider,
    public alertP: AlertProvider) {    
    this.unread_count();
    if (this.auth.getUserDetails().grade == '') {
      this.getLevel();
    } else {
      this.getCourse();
      this.getLevel();
      this.active = this.auth.getUserDetails().grade.id;
      let l = this.auth.getUserDetails().subject
      this.selectedSubject = l.split(',');
    }


  }

  ionViewWillEnter() {
    this.get_aboutus();
  }


  getLevel() {
    this.restApi.get({}, 1, "get_education_level").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.level = result.data;
        this.getSubject();
      } else {
      }
    });
  }

  getSubject() {
    this.restApi.get({}, 0, "get_subject_list").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.subjectList = result.data;
      } else {
      }
    });
  }

  getMyCourses() {
    let data = {
      user_id: { value: this.auth.getCurrentUserId(), type: "NO" }
    };
    this.restApi.postData_withoutloder(data, 0, "my_courses").then((result: any) => {
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

  selectGrade(id) {
    this.active = id;
    this.selectedSubject = '';
    this.submit();
  }

  submit() {
    //  let k = this.subjectList.filter(data=>data.subject_name==this.selectedSubject);
    //  if(k.length==0){
    //    this.alertP.showEmptyMessage('SUBJECT');
    //    return
    //  }

    let Data = {
      student_id: { value: this.auth.getCurrentUserId(), type: "NO" },
      grade_id: { value: this.active, type: "GRADE" },
      subject_id: { value: this.selectedSubject, type: "NO" },
    };

    this.restApi.postData(Data, 0, "add_student_data").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.auth.updateUserDetails(result.data);
        this.getCourse();
      } else {
        // this.alertP.show("Alert!", result.message);
      }
    });
  }


  getCourse() {
    let data = {
      student_id: { value: this.auth.getCurrentUserId(), type: "NO" }
    };
    this.restApi.postData_withoutloder(data, 0, "get_best_courses").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.courseList = result.data;
        this.allItems = result.data;
        this.getMyCourses()
      } else {
        this.courseList = [];
      }

      if (this.courseList.length == 0) {
        this.noDataS = true
      } else {
        this.noDataS = false
      }
    });
  }

  getItems(ev: any) {
    // console.log(this.allItem);
    // this.allItems.splice(0,1);
    // Reset items back to all of the items
    // this.initializeItems();
    // set val to the value of the searchbar
    const val = ev.target.value;
    //console.log(val);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.courseList = this.allItems.filter((item) => {
        return (item.course_description.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.course_title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.courseList = this.allItems;
    }
    if (this.courseList.length == 0) {
      this.noDataS = true
    } else {
      this.noDataS = false
    }
  }

  // payment() {
  // const modal = this.modalCtrl.create(PaymentPage,{},{cssClass:'moremodel', //showBackdrop:true, enableBackdropDismiss:true});
  //  modal.present();
  // }


  // next(){
  //   const modal = this.modalCtrl.create(NextvisitPage,{},{cssClass:'moremodel', showBackdrop:true, enableBackdropDismiss:true});
  //   modal.present();
  // }
  // sales(){
  //   const modal = this.modalCtrl.create(SalesNotePage,{},{cssClass:'moremodel', showBackdrop:true, enableBackdropDismiss:true});
  //   modal.present();
  // }
  // profile(){
  //   this.navCtrl.push(ProfilePage);
  // }

  details(k) {
    this.navCtrl.push(DetailsPage, { CourseId: k.course_id });
  }

  subject_change() {
    console.log(this.selectedSubject);
    this.submit();
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

  unread_count() {
    this.interval =   setInterval(() => {
          let Data = {
            user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
          }
          this.restApi.postData_withoutloder(Data,0,'GetUnreadNotification').then((result:any) => {
              console.log('unread count--',result);
              if(result.status == 1){
                this.auth.notification_count = result.unreadNotification;
                
                if(result.is_block==1) {
                  clearInterval(this.interval);
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
    if(result.status == 1){
    //   window.location.href="";
    // this.nav.push(HomePage);
    // this.auth.removeAllSessions();
    }
  })
  }

  noti() {
    this.navCtrl.push(NotificationsPage);
  }

}
