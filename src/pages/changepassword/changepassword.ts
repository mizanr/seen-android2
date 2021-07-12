import { AlertProvider } from "./../../providers/alert/alert";
import { RestApiProvider } from "./../../providers/rest-api/rest-api";
import { AuthProvider } from "./../../providers/auth/auth";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ProfilePage } from "../profile/profile";

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-changepassword",
  templateUrl: "changepassword.html"
})
export class ChangepasswordPage {
  old_pass: any = "";
  new_pass: any = "";
  confirmP: any = "";
  oType='password';
  nType='password';
  cType='password';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public rest_api: RestApiProvider,
    public alertP: AlertProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ChangepasswordPage");
  }
  profile() {
    this.navCtrl.push(ProfilePage);
  }

  save() {
    let Data = {
      user_id: { value: this.auth.getCurrentUserId(), type: "NO" },
      user_password: { value: this.old_pass, type: "OPASS" },
      password: { value: this.new_pass, type: "NPASS" },
      confirmP: { value: this.confirmP, type: "NCONFP" },
      confirm_password: { value: this.confirmP, type: "CONFP" }
    };

    this.rest_api.postData(Data, 0, "change_password").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.alertP.showAsync("تمت العملية بنجاح", result.message).then(() => {
          this.navCtrl.pop();
        });
      } else {
        this.alertP.show("تحذير!", result.message);
      }
    });
  }
}
