import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  Events,
  MenuController
} from "ionic-angular";
import { LoginPage } from "../login/login";
import { TeacherloginPage } from "../teacherlogin/teacherlogin";

@Component({
  selector: "page-select",
  templateUrl: "select.html"
})
export class SelectPage {
  isTeacher = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public event: Events,
    public menuCtrl: MenuController
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SelectPage");
  }

  login() {
    if (this.isTeacher == true) {
      this.navCtrl.setRoot(TeacherloginPage);
      // this.event.publish("dashboardselect3ed", 0);
    } else if (this.isTeacher == false) {
      this.navCtrl.setRoot(LoginPage);
      // this.event.publish("dashboardselect3ed", 1);
    }
  }

  setTeacher(val) {
    this.isTeacher = val;
    console.log(this.isTeacher);
  }

  //setTeacher(){
  // this.navCtrl.push(TeacherloginPage);
  //}
}
