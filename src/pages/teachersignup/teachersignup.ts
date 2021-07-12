import { PrivacyPage } from './../privacy/privacy';
import { TermsPage } from './../terms/terms';
import { DashboardPage } from "./../dashboard/dashboard";
import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ModalController,
  MenuController
} from "ionic-angular";
import { ApprovedPage } from "../approved/approved";
import { AutofillPlacesPage } from "../autofill-places/autofill-places";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { AlertProvider } from "../../providers/alert/alert";
import { CityListPage } from "../city-list/city-list";
import { AuthProvider } from "../../providers/auth/auth";

/**
 * Generated class for the TeachersignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-teachersignup",
  templateUrl: "teachersignup.html"
})
export class TeachersignupPage {
  formData = {
    email: "",
    password: "",
    confirm_password: "",
    fullname: "",
    user_type: "",
    subject: "",
    phone: "",
    school: "",
    city_name: "",
    city_id: "",
    terms: false
  };
  subjectList: any;
  allcity: any;
  schoolList: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public restApi: RestApiProvider,
    public alertP: AlertProvider,
    public auth: AuthProvider,
    public menuCtrl: MenuController
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.getSubject();
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TeachersignupPage");
  }

  approve() {
    this.navCtrl.push(ApprovedPage);
  }

  cityList() {
    const modal = this.modalCtrl.create(CityListPage);
    modal.onDidDismiss((data: any) => {
      if (data) {
        console.log(data);
        this.formData.city_id = data.id;
        this.formData.city_name = data.name;
      }
    });
    modal.present();
  }

  autofillPlaces() {
    const modal = this.modalCtrl.create(AutofillPlacesPage, {
      isOnlyCity: true
    });
    modal.onDidDismiss((location: any) => {
      if (location) {
        // console.log(location);
        this.formData.city_name = location.city;
      }
    });
    modal.present();
  }

  signup() {
    let Data = {
      fullname: { value: this.formData.fullname, type: "FULLNAME" },
      email: { value: this.formData.email, type: "EMAIL" },
      phone: { value: this.formData.phone, type: "PHONE" },
      subject: { value: this.formData.subject, type: "SUBJECT" },
      city: { value: this.formData.city_id, type: "CITY" },
      school: { value: this.formData.school, type: "SCHOOL" },
      password: { value: this.formData.password, type: "PASSW" },
      confirmP: {
        value: this.formData.confirm_password,
        type: "CONFP"
      },
      terms: { value: this.formData.terms, type: "TERMS" },
      user_type: { value: 1, type: "NO" }
    };
    console.log(this.formData.terms);

    this.restApi.postData(Data, 0, "signup").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        // this.alertP.show("Alert!", result.message);
        // this.navCtrl.pop();
        this.navCtrl.setRoot(ApprovedPage);
        this.login();
      } else {
        this.alertP.show("تحذير!", result.message);
      }
    });
  }

  login() {
    let Data = {
      email: { value: this.formData.email, type: "EMAIL" },
      password: { value: this.formData.password, type: "PASSW" }
    };
    this.restApi.postData(Data, 0, "login").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        // this.navCtrl.setRoot(DashboardPage);
        this.auth.updateUserDetails(result.data);
      } else {
        // this.alertP.show("Alert!", result.message);
        this.auth.updateUserDetails(result.data);
      }
    });
  }

  getSubject() {
    // let Data = {
    //   email: { value: this.formData.email, type: "EMAIL" },
    //   password: { value: this.formData.password, type: "PASSW" }
    // };
    this.restApi.get({}, 1, "get_subject_list").then((result: any) => {
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
    this.restApi.get({}, 1, "citylist").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.allcity = result.data;
      } else {
      }
    });
  }

  getSchool() {
    let Data = {
      city_id: { value: this.formData.city_id, type: "NO" }
    };
    this.restApi.postData(Data, 0, "get_school").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.schoolList = result.data;
      } else {
      }
    });
  }

  onChange() {
    this.getSchool();
  }

  onSchoolChange() {
    console.log(this.formData.subject);

  }
  terms(k) {
    this.navCtrl.push(PrivacyPage, { Type: k });
  }
}
