import { ApprovedPage } from "./../approved/approved";
import { Component } from "@angular/core";
import { NavController, NavParams, Nav, MenuController, Platform } from "ionic-angular";
import { TeachersignupPage } from "../teachersignup/teachersignup";
import { TeacherhomePage } from "../teacherhome/teacherhome";
import { ForgotPage } from "../forgot/forgot";
import { DashboardPage } from "../dashboard/dashboard";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { AlertProvider } from "../../providers/alert/alert";
import { AuthProvider } from "../../providers/auth/auth";
import { OnesignalProvider } from "../../providers/onesignal/onesignal";

@Component({
  selector: "page-teacherlogin",
  templateUrl: "teacherlogin.html"
})
export class TeacherloginPage {
  formData = {
    email: "",
    password: ""
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public onesignal: OnesignalProvider,
    public plt:Platform,
    public nav: Nav,
    public restApi: RestApiProvider,
    public alertP: AlertProvider,
    public auth: AuthProvider,
    public menuCtrl: MenuController
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  register() {
    this.navCtrl.push(TeachersignupPage);
  }

  // login() {
  //   this.nav.setRoot(DashboardPage);
  // }

  forgot() {
    this.navCtrl.push(ForgotPage);
  }

  login() {
    let Data = {
      email: { value: this.formData.email, type: "EMAIL" },
      password: { value: this.formData.password, type: "NO" }
    };
    this.restApi.postData(Data, 0, "login").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        if (result.data.active_status == 1) {
          this.navCtrl.setRoot(DashboardPage);
        } else if (result.data.active_status == 2) {
          this.navCtrl.setRoot(ApprovedPage);
        }
        this.auth.updateUserDetails(result.data);
        this.update_deviceId();
      } else {
        this.alertP.show("تحذير!", result.message);
      }
    });
  }

  update_deviceId() {
    if(this.plt.is('cordova')){
      this.onesignal.id().then(identity => {
        console.log('-------Device Id----------',identity);
        let Data = {
      id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
     device_id:{"value":identity,"type":'NO'},
    }
      this.restApi.postData_withoutloder(Data,0,'UpdateDeviceId').then((result:any) => {
      console.log(result);
      })
      })
    }
  }

}
