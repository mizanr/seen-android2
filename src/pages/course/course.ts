import { StudentListPage } from './../student-list/student-list';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from "./../../providers/alert/alert";
import { AddlessionPage } from "./../addlession/addlession";
import { AddquizPage } from "./../addquiz/addquiz";
import { RestApiProvider } from "./../../providers/rest-api/rest-api";
import { Component } from "@angular/core";
import { ModalController, Events } from "ionic-angular";
import { NavController, NavParams } from "ionic-angular";
import { QuizPage } from "../quiz/quiz";
import { CourseSidebarPage } from "../course-sidebar/course-sidebar";
import { DomSanitizer } from "@angular/platform-browser";
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
@Component({
  selector: "page-course",
  templateUrl: "course.html"
})
export class CoursePage {
  lessonDetail: any = "";
  quizList: any = "";
  courseDetail:any;
  lessonId:any;
  youtubeUrl:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public restApi: RestApiProvider,
    public youtube:YoutubeVideoPlayer,
    public alertP: AlertProvider,
    public domSanitizer: DomSanitizer,
    public events:Events,
    public auth:AuthProvider,
  ) {
    this.events.subscribe('LessonChanged',(lessonId)=>{
      this.lessonId=lessonId;
      this.getDetail();
    });
    this.lessonId=this.navParams.get("LessonId");


  }

  ionViewWillEnter() {
    this.getDetail();
  }

  ionViewDidLeave(){
   this.events.unsubscribe('LessonChanged');
  }

  getDetail() {
    let data = {
      lession_id: { value: this.lessonId, type: "NO" },
      user_id:{value:this.auth.getCurrentUserId(),type:"NO"},
    };
    this.restApi.postData(data, 0, "get_lession_by_ID").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.lessonDetail = result.data;
        this.youtubeUrl=this.domSanitizer.bypassSecurityTrustResourceUrl(this.lessonDetail.youtube_link);
        // this.getQuiz();
        this.getCourse();
      } else {
      }
    });
  }

  getCourse(){
    let data = {
      course_id: { value: this.lessonDetail.course_id, type: "NO" },
      user_id: { value: this.auth.getCurrentUserId(), type: "NO" }
    };
    this.restApi.postData_withoutloder(data, 0, "get_course_by_ID").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.courseDetail = result.data;
        if(this.auth.getUserDetails().user_type==2){
          this.lessonViewed();
        }
      } else {
      }
    });
  }


  lessonViewed(){
    let data = {
      lession_id: { value: this.lessonId, type: "NO" },
      user_id: { value: this.auth.getCurrentUserId(), type: "NO" }
    };
    this.restApi.postData_withoutloder(data, 0, "lession_view").then((result: any) => {
      if (result.status == 1) {
      } else {
      }
    });
  }

  presentActionSheet() {
    const actionSheet = this.restApi.actionSheetCtrl.create({
      title: "الخيارات",
      buttons: [
        {
          text: "المشاهدات("+this.lessonDetail.student.length+")",
          // role: 'destructive',
          handler: () => {
            if(this.lessonDetail.student.length>0){
              const modal=this.restApi.modalCtrl.create(StudentListPage,{StudentList:this.lessonDetail.student});
              modal.present();
            }
          }
        },
        {
          text: "تحرير الدرس",
          // role: 'destructive',
          handler: () => {
            const modal = this.restApi.modalCtrl.create(AddlessionPage, {
              Lesson: this.lessonDetail
            });
            modal.present();
            modal.onDidDismiss(data => {
              if (data) {
                this.getDetail();
              }
            });
          }
        },
        {
          text: "حذف الدرس",
          handler: () => {
            this.alertP
              .confirmationAlert("تحذير!", "هل انت متأكد انك تريد حذف الدرس؟")
              .then(res => {
                if (res) {
                  this.deleteLesson();
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

  quizActionSheet(id) {
    const actionSheet = this.restApi.actionSheetCtrl.create({
      title: "الخيارات",
      buttons: [
        // {
        //   text: "Add Quiz",
        //   // role: 'destructive',
        //   handler: () => {
        //     this.addQuiz();
        //   }
        // },
        {
          text: "تحرير الاختبار",
          // role: 'destructive',
          handler: () => {
            // console.log("Destructive clicked");
            // const modal = this.restApi.modalCtrl.create(AddquizPage, {
            //   Quiz: this.lessonDetail
            // });
            // modal.present();
            // modal.onDidDismiss(data => {
            //   if (data) {
            //     this.getDetail();
            //   }
            // });
            this.alertP.show('تحذير!','Coming Soon!');
          }
        },
        {
          text: "حذف الاختبار",
          handler: () => {
            this.alertP
              .confirmationAlert("تحذير!", "هل انت متأكد انك تريد حذف الاختبار؟")
              .then(res => {
                if (res) {
                  this.deleteQuiz(id);
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

  deleteLesson() {
    let data = {
      lession_id: { value: this.lessonId, type: "NO" }
    };
    this.restApi.postData(data, 1, "delete_lession").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.navCtrl.pop();
      } else {
      }
    });
  }

  deleteQuiz(id) {
    let data = {
      quiz_id: { value: id, type: "NO" }
    };
    this.restApi.postData(data, 1, "delete_quiz").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.getDetail();
      } else {
      }
    });
  }

  quiz() {
    this.navCtrl.push(QuizPage);
  }

  opensidebar() {
    const modal = this.modalCtrl.create(
      CourseSidebarPage,
      {Course:this.courseDetail,IsPurchased:this.courseDetail.is_purchased
      },
      { cssClass: "moremodel", showBackdrop: true, enableBackdropDismiss: true }
    );
    modal.present();
    modal.onDidDismiss((data) => {
      if(data){
        this.navCtrl.pop();
      }
    })
  }

  addQuiz() {
    console.log("add quick clicked");
    const modal = this.modalCtrl.create(
      AddquizPage,
      {
        CourseId: this.lessonDetail.course_id,
        LessonId: this.lessonDetail.lession_id},
      { cssClass: "moremodel", showBackdrop: true, enableBackdropDismiss: true }
    );
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.getDetail();
      }
    });
  }

  openQuiz(item) {
    if(this.auth.getUserDetails().user_type==1){
      this.navCtrl.push(QuizPage,{QuizId:item.quiz_id});
    } else if(this.courseDetail.is_purchased==1){
      this.navCtrl.push(QuizPage,{QuizId:item.quiz_id,other_detail:this.lessonDetail});
    } else {
      this.alertP.show('تحذير!', 'يجب شراء الدورة حتى تتمكن من مشاهدة هذا الدرس');
    }
  }
}
