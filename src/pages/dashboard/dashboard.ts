import { SelectPage } from './../select/select';
import { App } from 'ionic-angular';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { TeacherprofilePage } from './../teacherprofile/teacherprofile';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { MycourcesPage } from '../mycources/mycources';
import { MywalletPage } from '../mywallet/mywallet';
import { AddcoursesPage } from '../addcourses/addcourses';
import { AddlessionPage } from '../addlession/addlession';
import { NotificationsPage } from '../notifications/notifications';
import { IntoductionPage } from '../intoduction/intoduction';
import { DataStoreProvider } from '../../providers/data-store/data-store';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  count: any = '0';
  interval: any;
  isdidloadcalled: any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
    public auth:AuthProvider,
    public restApi:RestApiProvider,
    public alertP:AlertProvider,public dataP:DataStoreProvider,
    public app: App) {
    this.count = this.dataP.mycourse_count;
  }

  ionViewDidLoad() {
    // this.getCate();
  }

  ionViewWillEnter() {
    this.getCate();
  }

  getCate() {
    this.restApi.postData_withoutloder({'teacher_id':{value:this.auth.getCurrentUserId(),type:'NO'}}, 0, "mycourse_count").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.count = result.data.count;
        this.dataP.mycourse_count = result.data.count;
      } else {
      }
    });
  }

  logout() {
    this.alertP
      .confirmationAlert("تحذير!", "هل انت متأكد من انك تريد تسجيل الخروج")
      .then(res => {
        if (res) {
          this.auth.removeUserDetails();
          this.app.getRootNav().setRoot(SelectPage);
          // this.nav.setRoot(SelectPage);
          // window.location.href = "";
        }
      });
  }

  courses() {
    this.navCtrl.push(MycourcesPage);
  }

  wallet(){
   this.navCtrl.push(MywalletPage);
  }

  // add(){
  //  this.navCtrl.push(AddcoursesPage);
  // }

  addlession() {
    const modal = this.modalCtrl.create(AddlessionPage,{},{cssClass:'moremodel', showBackdrop:true, enableBackdropDismiss:true});
     modal.present();
   }

   editProfile(){
     this.navCtrl.push(TeacherprofilePage)
   }

   
  add() {
    const modal = this.restApi.modalCtrl.create(AddcoursesPage);
    modal.present();
    modal.onDidDismiss(data=>{
       if(data){
        //  this.getMycourses();
       }
    });
  }

  noti() {
    this.navCtrl.push(NotificationsPage);
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
  
}

