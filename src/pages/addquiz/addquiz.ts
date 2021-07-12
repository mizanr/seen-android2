import { AlertProvider } from "./../../providers/alert/alert";
import { AuthProvider } from "./../../providers/auth/auth";
import { RestApiProvider } from "./../../providers/rest-api/rest-api";
import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";

@Component({
  selector: "page-addquiz",
  templateUrl: "addquiz.html"
})
export class AddquizPage {
  question = [
    {
      title: "",
      choices: [{ value: "" }, { value: "" }],
      answer: "",
      show: false
    }
  ];
  quiz_title:any;
  quiz_count:any=1;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public veiwCtrl: ViewController,
    public restApi: RestApiProvider,
    public auth: AuthProvider,
    public aler: AlertProvider,
    public viewCtrl: ViewController
  ) {}

  removeC(index) {
    //this.circuits.splice(index);
    this.question.splice(index, 1);
  }

  addquestion(item) {
    if (item.title == "") {
      this.aler.show("تحذير!", "يرجى ادخال السؤال بالاعلى");
      return;
    } else {
      for (let index = 0; index < item.choices.length; index++) {
        if (item.choices[index].value == "") {
          this.aler.show(
            "تحذير!",
            "يرجى ادخال كل الاختيارات للسؤال السابق"
          );
          return;
        }
      }
    }
    if (item.answer == "") {
      this.aler.show("تحذير!", "يرجى ادخال الاجابة للسؤال السابق");
      return;
    }
    let newquest = {
      title: "",
      choices: [{ value: "" }, { value: "" }],
      answer: "",
      show: false
    };
    this.question.push(newquest);
  }

  addchoices(index, it) {
    this.question[index].choices.push({ value: "" });
    it.answer = "";
    it.show = false;
  }

  onChoiseChange(choices, it) {
    console.log("In ch   ange");
    it.show = true;
    for (let index = 0; index < choices.length; index++) {
      if (choices[index].value == "") {
        it.show = false;
        console.log("In change");
      }
    }
  }
  removeO(index, questionIndex) {
    this.question[questionIndex].choices.splice(index, 1);
    this.question[questionIndex].show = true;
    let arr = this.question[questionIndex].choices;
    for (let index = 0; index < arr.length; index++) {
      if (arr[index].value == "") {
        this.question[questionIndex].show = false;
        console.log("In change");
      }
    }
  }

  addQuiz() {
    if (this.question.length > 0) {
      let qArr = this.question;
      for (let index = 0; index < qArr.length; index++) {
          if (qArr[index].title == "") {
            this.aler.show("تحذير!", "يرجى ادخال السؤال  "+(index+1)+"!");
            return;
          } else {
            for (let ci = 0; ci < qArr[index].choices.length; ci++) {
              if (qArr[index].choices[ci].value == "") {
                this.aler.show(
                  "تحذير!",
                  "يرجى التحقق هناك بعض الخيارات لا تزال فارغة"
                );
                return;
              }
            }
          }
          if (qArr[index].answer == "") {
            this.aler.show("تحذير!", "يرجى ادخال الجواب للسؤال "+(index+1)+"!");
            return;
          }
      }
      let Data = {
        teacher_id: { value: this.auth.getCurrentUserId(), type: "NO" },
        course_id: { value: this.navParams.get("CourseId"), type: "NO" },
        lession_id: { value: this.navParams.get("LessonId"), type: "NO" },
        question: { value: JSON.stringify(this.question), type: "NO" },
        quiz_title: { value: this.quiz_title, type: "QTITLE" },
        quiz_count: { value: this.quiz_count, type: "QCOUNT" },
      };

      this.restApi.postData(Data, 1, "add_quiz").then((result: any) => {
        console.log(result);
        if (result.status == 1) {
          this.viewCtrl.dismiss(true);
          // this.aler.showAsync('Alert!',result.message).then(()=>{
          //   this.navCtrl.push(DetailsPage, { CourseId: result.data.course_id })
          // });
        } else {
          // this.alertP.show("Alert!", result.message);
        }
      });
    }
  }
}
