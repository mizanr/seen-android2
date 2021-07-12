import { AutofillPlacesPage } from "./../autofill-places/autofill-places";
import { AlertProvider } from "./../../providers/alert/alert";
import { RestApiProvider } from "./../../providers/rest-api/rest-api";
import { ImageProvider } from "./../../providers/image/image";
import { AuthProvider } from "./../../providers/auth/auth";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

@Component({
  selector: "page-teacherprofile",
  templateUrl: "teacherprofile.html"
})
export class TeacherprofilePage {
  formData = {
    email: "",
    password: "",
    confirm_password: "",
    fullname: "",
    user_type: "",
    subject: "Chemistry",
    phone: "",
    school: "",
    city: "",
    profile: "",
    about:''
  };

  blob_img: any = null;
  blobimageName: any = "";

  subjectList: any;
  allcity: any;
  schoolList: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public imageP: ImageProvider,
    public restApi: RestApiProvider,
    public alertP: AlertProvider
  ) {
    this.getSubject();
    this.formData = this.auth.getUserDetails();
    this.formData.fullname = this.auth.getUserDetails().full_name;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TeacherprofilePage");
  }

  getImage() {
    this.imageP.getImage().then((img: any) => {
      console.log();
      this.blob_img = this.imageP.imgURItoBlob(img);

      this.blobimageName = this.imageP.generateImageName("hello.jpg");
      this.formData.profile = img;
    });
  }

  update() {
    console.log('working..');
    let Data = {
      user_id: { value: this.auth.getCurrentUserId(), type: "NO" },
      fullname: { value: this.formData.fullname.trim(), type: "FULLNAME" },
      subject: { value: this.formData.subject, type: "NO" },
      city: { value: this.formData.city, type: "CITY" },
      phone: { value:this.formData.phone, type: "PHONE" },
      school: { value: this.formData.school, type: "SCHOOL" },
      email: { value: this.formData.email.trim(), type: "EMAIL" },
      about: { value: this.formData.about, type: "NO" }
    };

    if (this.blob_img) {
      Data["profile"] = {
        value: this.blob_img,
        type: "IMAGE",
        name: this.blobimageName
      };
    }
    this.restApi.postData(Data, 0, "update_profile").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.auth.updateUserDetails(result.data);
        this.navCtrl.pop();
        this.alertP.show("تحذير!", result.message);
      } else {
        this.alertP.show("تحذير!", result.message);
      }
    });
  }

  autofillPlaces() {
    const modal = this.restApi.modalCtrl.create(AutofillPlacesPage, {
      isOnlyCity: true
    });
    modal.onDidDismiss((location: any) => {
      if (location) {
        // console.log(location);
        this.formData.city = location.city;
      }
    });
    modal.present();
  }

  getSubject() {
    // let Data = {
    //   email: { value: this.formData.email, type: "EMAIL" },
    //   password: { value: this.formData.password, type: "PASSW" }
    // };
    this.restApi.get({}, 0, "get_subject_list").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.subjectList = result.data;
        this.getCity();
      } else {
      }
    });
  }

  getCity() {
    // let Data = {
    //   email: { value: this.formData.email, type: "EMAIL" },
    //   password: { value: this.formData.password, type: "PASSW" }
    // };
    this.restApi.get({}, 0, "citylist").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.allcity = result.data;
        this.getSchool();
      } else {
      }
    });
  }

  getSchool() {
    let Data = {
      city_id: { value: this.formData.city, type: "NO" }
    };
    this.restApi.postData_withoutloder(Data, 0, "get_school").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.schoolList = result.data;
      } else {
      }
    });
  }

  onChange() {
    this.formData.school = "";
    this.getSchool();
  }
}
