import { PurchasedStudentListPage } from './../purchased-student-list/purchased-student-list';
import { DomSanitizer } from '@angular/platform-browser';
import { BuyProvider } from './../../providers/buy/buy';
import { AuthProvider } from './../../providers/auth/auth';
import { AddlessionPage } from "./../addlession/addlession";
import { AlertProvider } from "./../../providers/alert/alert";
import { AddcoursesPage } from "./../addcourses/addcourses";
import { RestApiProvider } from "./../../providers/rest-api/rest-api";
import { Component } from "@angular/core";
import { ModalController, ActionSheetController, Events, AlertController } from "ionic-angular";
import { NavController, NavParams } from "ionic-angular";
import { DetailNextPage } from "../detail-next/detail-next";
import { NextvisitPage } from "../nextvisit/nextvisit";
import { NotificationsPage } from "../notifications/notifications";
import { ProductlistPage } from "../productlist/productlist";
import { PaymentPage } from "../payment/payment";
import { CoursePage } from "../course/course";
import { ProfileteacherPage } from "../profileteacher/profileteacher";
import { ThankyouPage } from '../thankyou/thankyou';
import { DataStoreProvider } from '../../providers/data-store/data-store';
import { LoaderProvider } from '../../providers/loader/loader';

@Component({
  selector: "page-details",
  templateUrl: "details.html"
})
export class DetailsPage {
  active = 1;
  courseDetail: any;
  isdidloadcalled: any = false;
  youtubeUrl: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public restApi: RestApiProvider,
    public actionSheetCtrl: ActionSheetController,
    public alertP: AlertProvider,
    public alertCtrl:AlertController,
    public auth: AuthProvider,
    public buy: BuyProvider,
    public dataP: DataStoreProvider,
    public loader:LoaderProvider,
    public events:Events,
    public domSanitizer: DomSanitizer
  ) {
    this.courseDetail = this.dataP.courseDetail;
    this.events.subscribe('changeChapter',(data) => {
      console.log('change chapter------------',data);
      if(data){
        this.active = data.index + 1;
      }
    })

    events.subscribe('seenCode',(data) => {
      if(data==true){
        // events.publish('buynow',true);
      this.Option_ForBuy(this.courseDetail.course_id).then((val:any)=> {
        console.log(this.courseDetail.course_id);
        if(val==1){
          this.getDetail(0);
        }
      })
      }
    })
  }

  ionViewWillEnter() {
    if (this.isdidloadcalled) {
      this.getDetail(0);
    }
  }

  ionViewDidLoad() {
    this.isdidloadcalled = true;
    this.getDetail(1);
  }

  ionViewWillLeave() {
   this.events.unsubscribe('seenCode');
  }

  getDetail(m) {
    if (m == 1) {
      this.loader.show();
    }
    let data = {
      course_id: { value: this.navParams.get("CourseId"), type: "NO" },
      user_id: { value: this.auth.getCurrentUserId(), type: "NO" }
    };
    this.restApi.postData_withoutloder(data, 0, "get_course_by_ID").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.loader.hide();
        this.courseDetail = result.data;
        this.dataP.courseDetail = result.data;
        this.youtubeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.courseDetail.youtube_link)
      } else {
        this.loader.hide();
      }
    }).catch((err) => this.loader.hide());
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      // title: "Options",
      buttons: [
        {
          text: "تحرير الدورة",
          // role: 'destructive',
          handler: () => {
            console.log("Destructive clicked");
            const modal = this.restApi.modalCtrl.create(AddcoursesPage, {
              Course: this.courseDetail
            });
            modal.present();
            modal.onDidDismiss(data => {
              if (data) {
                this.getDetail(0);
              }
            });
          }
        },
        {
          text: "حذف الدورة",
          handler: () => {
            this.alertP
              .confirmationAlert("تحذير!", "هل ترغم بتقديم طلب للإدارة بحذف هذه الدورة؟")
              .then(res => {
                if (res) {
                  this.deleteCourse();
                }
              });
          }
        },
        {
          text: "الغاء",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    actionSheet.present();
  }

  deleteCourse() {
    let data = {
      course_id: { value: this.navParams.get("CourseId"), type: "NO" },
      teacher_id: { value: this.auth.getCurrentUserId(), type: "NO" },
    };
    this.restApi.postData(data, 1, "delete_course").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        // this.navCtrl.pop();
      } else {
      }
    });
  }

  payment() {
    const modal = this.modalCtrl.create(
      PaymentPage,
      {},
      { cssClass: "moremodel", showBackdrop: true, enableBackdropDismiss: true }
    );
    modal.present();
  }

  next() {
    this.navCtrl.push(DetailNextPage);
  }

  back() {
    this.navCtrl.pop();
  }

  coursepage(item, index) {
    console.log('item------', item, index);
    if (this.auth.getUserDetails().user_type == 2 && this.courseDetail.is_purchased == 0) {
      if (index == 0) {
        this.navCtrl.push(CoursePage, { LessonId: item.lession_id });
      } else {
        this.alertP.show('تحذير!', 'يجب شراء الدورة حتى تتمكن من مشاهدة هذا الدرس');
      }
    } else {
      this.navCtrl.push(CoursePage, { LessonId: item.lession_id,courseDetail:this.courseDetail});
    }
  }

  profile() {
    this.navCtrl.push(ProfileteacherPage, { TeacherId: this.courseDetail.teacher_id });
  }

  addlesson() {
    const modal = this.modalCtrl.create(
      AddlessionPage,
      { CourseId: this.navParams.get("CourseId") },
      { cssClass: "moremodel", showBackdrop: true, enableBackdropDismiss: true }
    );
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.navCtrl.push(CoursePage, { LessonId: data });
        this.getDetail(0);
      }
    })

  }

  startBuy() {
    this.buy.selectOption(this.courseDetail.course_id,this.courseDetail).then((res) => {
      console.log('In resolve');
      this.getDetail(0);
    }).catch(error => {

    });
  }

  openEnrolled() {
    if (this.courseDetail.student.length > 0) {
      const modal = this.restApi.modalCtrl.create(PurchasedStudentListPage, { StudentList: this.courseDetail.student });
      modal.present();
    }
  }

  Option_ForBuy(course_id) {
    return new Promise((resolve, reject) => {
      // const modal = this.restApi.modalCtrl.create(PaymentOptionPage, {course_info:course_info}, { cssClass: 'mymodal' });
      // modal.present();
      // modal.onDidDismiss(res => {
        // if (res == 'seen') {
          const prompt = this.alertCtrl.create({
            title: 'شراء ',
            message: "ادخل رقم بطاقة سين",
            inputs: [
              {
                name: 'code',
                placeholder: '87YHGT5'
              },
            ],
            buttons: [
              {
                text: 'الغاء',
              },
              {
                text: 'حفظ',
                handler: val => {
                  if (val.code) {
                    let data = {
                      course_id: { value: course_id, type: "NO" },
                      student_id: { value: this.auth.getCurrentUserId(), type: "NO" },
                      code:{ value: val.code, type: "NO" }
                    };
                    this.restApi.postData(data, 0, "buy_course").then((result: any) => {
                      console.log(result);
                      if (result.status == 1) {
                        // this.navCtrl.pop();
                        resolve(1);
                        this.showSuccess();
                      } else {
                        this.alertP.show('تحذير!','غير صحيح');
                        resolve(0);
                      }
                    });
                  } else {
                    this.alertP.show('تحذير!','ادخل رقم بطاقة سين!');
                    resolve(0);
                  }
                }
              }
            ]
          });
          prompt.present();
        // }
      // })
    });
  }

  showSuccess(){
    const modal = this.restApi.modalCtrl.create(ThankyouPage,{},{cssClass:'alertModal',showBackdrop: true, enableBackdropDismiss: true});
    modal.present();
  }

  
}
