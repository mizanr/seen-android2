import { SelectPage } from "./../select/select";
import { Component } from "@angular/core";
import { NavController, NavParams, Nav, App } from "ionic-angular";
import { TeacherhomePage } from "../teacherhome/teacherhome";
import { AuthProvider } from "../../providers/auth/auth";

/**
 * Generated class for the ApprovedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-approved",
  templateUrl: "approved.html"
})
export class ApprovedPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public nav: Nav,
    public auth: AuthProvider,
    public app: App
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ApprovedPage");
  }

  next() {
    // this.nav.setRoot(TeacherhomePage);
    this.navCtrl.popToRoot();
  }

  logout() {
    this.auth.removeUserDetails();
    this.app.getRootNav().setRoot(SelectPage);
    // window.location.href = "";
  }
}
