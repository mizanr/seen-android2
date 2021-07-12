import { DetailsPage } from './../details/details';
import { AlertProvider } from "./../../providers/alert/alert";
import { ImageProvider } from "./../../providers/image/image";
import { AuthProvider } from "./../../providers/auth/auth";
import { RestApiProvider } from "./../../providers/rest-api/rest-api";
import { Component, NgZone } from "@angular/core";
import { Events, ModalController, Nav, ViewController } from "ionic-angular";
import { NavController, NavParams } from "ionic-angular";
import { AddlessionPage } from "../addlession/addlession";
import { AddquizPage } from "../addquiz/addquiz";
import { CustomKeypadPage } from '../custom-keypad/custom-keypad';

@Component({
  selector: "page-addcourses",
  templateUrl: "addcourses.html"
})
export class AddcoursesPage {
  cateList: any;
  level: any;
  formData: any = {
    course_title: '',
    course_image: '',
    price: '',
    level_id: '',
    cat_id: '',
    duration: '',
    course_description: '',
    youtube_link: ''
  }
  blob_img: any = null;
  blobimageName: any = "";
  course: any = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public restApi: RestApiProvider,
    public auth: AuthProvider,
    public imageP: ImageProvider,
    public events: Events,
    public zone: NgZone,
    public alertP: AlertProvider,
    public viewCtrl: ViewController
  ) {
    this.getCate();
    this.course = this.navParams.get('Course');
    console.log(this.course);

    // events.subscribe('keypad_', (data) => {
    //   console.log(data);
    //   zone.run(() => {
    //     // let v = JSON.parse(data).join('');
    //     this.formData.price = data;
    //     this.formData.price = this.auth.authPrice;
    //     console.log(this.formData.price);
    //   })     
    //   // if (data.length>0) {
    //   //   this.formData.price = data.join('');        
    //   // }
    // })

  }

  getCate() {
    this.restApi.get({}, 0, "get_category").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.cateList = result.data;
        this.getLevel();
      } else {
      }
    });
  }

  getLevel() {
    this.restApi.get({}, 0, "get_education_level").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.level = result.data;
        if (this.course) {
          this.formData = this.course;
        }
      } else {
      }
    });
  }

  getImage() {
    this.imageP.getImage().then((img: any) => {
      console.log();
      this.blob_img = this.imageP.imgURItoBlob(img);

      this.blobimageName = this.imageP.generateImageName("hello.jpg");
      this.formData.course_image = img;
    });
  }

  addCourse() {
    let Data = {
      teacher_id: { value: this.auth.getCurrentUserId(), type: "NO" },
      course_title: { value: this.formData.course_title, type: "COURSENAME" },
      price: { value: this.formData.price, type: "PRICE" },
      cat_id: { value: this.formData.cat_id, type: "CATEGORY" },
      level_id: { value: this.formData.level_id, type: "ELEVEL" },
      course_description: { value: this.formData.course_description, type: "DESC" },
      duration: { value: this.formData.duration, type: "DURATION" },
      course_image: { value: this.blob_img, type: "IMAGE", name: this.blobimageName }
    };
    
    if (this.formData.youtube_link) {
      Data["youtube_link"] = { value: this.formData.youtube_link, type: "YOUTUBE" }
    }

    this.restApi.postData(Data, 0, "add_course").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.viewCtrl.dismiss(true);
        this.alertP.showAsync('تحذير!', result.message).then(() => {
          this.navCtrl.push(DetailsPage, { CourseId: result.data.course_id })
        });
      } else {
        // this.alertP.show("Alert!", result.message);
      }
    });
  }

  updateCourse() {
    let Data = {
      course_id: { value: this.course.course_id, type: "NO" },
      teacher_id: { value: this.auth.getCurrentUserId(), type: "NO" },
      course_title: { value: this.formData.course_title, type: "COURSENAME" },
      price: { value: this.formData.price, type: "PRICE" },
      cat_id: { value: this.formData.cat_id, type: "CATEGORY" },
      level_id: { value: this.formData.level_id, type: "ELEVEL" },
      course_description: { value: this.formData.course_description, type: "DESC" },
      duration: { value: this.formData.duration, type: "DURATION" },
      // course_image: { value: this.blob_img, type: "IMAGE", name: this.blobimageName }
    };

    if (this.formData.youtube_link) {
      Data["youtube_link"] = { value: this.formData.youtube_link, type: "NO" }
    }

    if (this.blob_img) {
      Data["course_image"] = {
        value: this.blob_img,
        type: "IMAGE",
        name: this.blobimageName
      };
    }

    this.restApi.postData(Data, 1, "edit_course").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.viewCtrl.dismiss(true);
      } else {
        // this.alertP.show("Alert!", result.message);
      }
    });
  }


  quiz() {
    const modal = this.modalCtrl.create(
      AddquizPage,
      {},
      { cssClass: "moremodel", showBackdrop: true, enableBackdropDismiss: true }
    );
    modal.present();
  }

  custom_keypad(t) {
    // this.navCtrl.push(CustomKeypadPage);
    const model = this.modalCtrl.create(CustomKeypadPage, { form: this.formData, type: t });
    model.present();
    model.onDidDismiss((data) => {
      if (data) {
        console.log(data);
        // if(this.course)
        //this.formData.price = data.join('');
      }
    })
  }

}
