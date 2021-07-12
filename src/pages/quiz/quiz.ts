import { AlertProvider } from "./../../providers/alert/alert";
import { RestApiProvider } from "./../../providers/rest-api/rest-api";
import { Component } from "@angular/core";
import { ModalController } from "ionic-angular";
import { NavController, NavParams } from "ionic-angular";
import { QuizResultPage } from "../quiz-result/quiz-result";
import { AuthProvider } from "../../providers/auth/auth";

/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-quiz",
  templateUrl: "quiz.html"
})
export class QuizPage {
  questions: any;
  other_detail:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public restApi: RestApiProvider,
    public auth:AuthProvider,
    public alertP: AlertProvider
  ) {
    this.other_detail = navParams.data.other_detail;
    console.log(this.other_detail);
    this.getQuiz();    
  }

  result() {
    const modal = this.modalCtrl.create(
      QuizResultPage,
      {},
      { cssClass: "moremodel", showBackdrop: true, enableBackdropDismiss: true }
    );
    modal.present();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad QuizPage");
  }

  presentActionSheet() {
    const actionSheet = this.restApi.actionSheetCtrl.create({
      title: "الخيارات",
      buttons: [
        {
          text: "يحرر",
          // role: 'destructive',
          handler: () => {}
        },
        {
          text: "حذف",
          handler: () => {
            this.alertP
              .confirmationAlert("تحذير!", "هل تريد حذف هذا الاختبار؟")
              .then(res => {
                if (res) {
                  this.deleteQuiz();
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

  getQuiz() {
    let data = {
      quiz_id: { value: this.navParams.get("QuizId"), type: "NO" }
    };
    this.restApi
      .postData(data, 0, "get_quiz_by_lession_ID")
      .then((result: any) => {
        console.log(result);
        if (result.status == 1) {
          this.questions = result.data;
        } else {
        }
      });
  }

  deleteQuiz() {
    let data = {
      quiz_id: { value: this.navParams.get("QuizId"), type: "NO" }
    };
    this.restApi.postData(data, 1, "delete_quiz").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.navCtrl.pop();
      } else {
      }
    });
  }

  quiz_choice(qus:any,ans:any) {
    console.log(qus,ans);
    qus['student_ans'] = ans;
  }

  submit_quiz(){
    var studentAns=[];
    for(let i=0;i<this.questions.questions.length;i++){
      if(this.questions.questions[i]['student_ans']){
        studentAns.push({ques_id:this.questions.questions[i].quiz_id,ans:this.questions.questions[i]['student_ans']});
      } else {
        // this.alertP.show('Alert','يرجى اختيار الجواب');
        // break;
      }
    }
    console.log('studentAns=======',studentAns);
    if(studentAns.length==0){
      this.alertP.show('Alert','يرجى اختيار الجواب');
      return;
    }
    let Data = {
      course_id:{value:this.other_detail.course_id,type:'NO'},
      teacher_id:{value:this.other_detail.teacher_id,type:'NO'},
      lession_id:{value:this.other_detail.lession_id,type:'NO'},
      student_id:{value:this.auth.getCurrentUserId(),type:'NO'},
      quiz_id:{value:this.questions.questions[0].quizId,type:'NO'},
      answer:{value:JSON.stringify(studentAns),type:'NO'},
    }
    this.restApi.postData(Data,0,'quiz_submit').then((res:any) => {
      console.log(res);
      if(res.status==1){
        // this.alertP.showAsync('Success',res.message).then(() => {
          const modal = this.modalCtrl.create(
            QuizResultPage,
            {data:res.data[0]},
            { cssClass: "moremodel", showBackdrop: true, enableBackdropDismiss: true }
          );
          modal.present();
          modal.onDidDismiss((data) => {
            if(data){
              this.navCtrl.pop();
            }
          })
        // })
      } else {
        this.alertP.show('Alert',res.message);
      }
    })
  }

}
