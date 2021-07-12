import { Component } from "@angular/core";
import { NavController, NavParams, MenuController } from "ionic-angular";
import { TeachersignupPage } from "../teachersignup/teachersignup";
import { TeacherloginPage } from "../teacherlogin/teacherlogin";
import { TabsPage } from "../tabs/tabs";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { AlertProvider } from "../../providers/alert/alert";

@Component({
  selector: "page-forgot",
  templateUrl: "forgot.html"
})
export class ForgotPage {
  email: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restApi: RestApiProvider,
    public alertP: AlertProvider,
    public menuCtrl: MenuController
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ForgotPage");
  }
  login() {
    this.navCtrl.push(TeacherloginPage);
  }
  back() {
    this.navCtrl.pop();
  }

  register() {
    this.navCtrl.push(TeachersignupPage);
  }

  send() {
    let Data = {
      email: { value: this.email, type: "EMAIL" }
    };
    this.restApi.postData(Data, 0, "forgot_password").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.alertP.show("تحذير!", result.message);
        this.navCtrl.pop();
      } else {
        this.alertP.show("تحذير!", result.message);
      }
    });
  }
}
