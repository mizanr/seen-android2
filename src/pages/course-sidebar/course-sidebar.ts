import { DashboardPage } from './../dashboard/dashboard';
import { AlertProvider } from './../../providers/alert/alert';
import { AuthProvider } from "./../../providers/auth/auth";
import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ViewController,
  Events,
  App,
} from "ionic-angular";
import { HomePage } from '../home/home';
import { TeacherhomePage } from '../teacherhome/teacherhome';

@Component({
  selector: "page-course-sidebar",
  templateUrl: "course-sidebar.html"
})
export class CourseSidebarPage {
  active = 1;
  course: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public veiwCtrl: ViewController,
    public events: Events,
    public app:App,
    public auth: AuthProvider,
    public alertP:AlertProvider
  ) {
    this.course = navParams.get("Course");
    console.log(this.course);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CourseSidebarPage");
  }

  closemodal() {
    this.veiwCtrl.dismiss();
  }

  active_event(ev:any,i:any){
    this.active = i+1;
  }

  changeLesson(item, index) {
    console.log('index=============',index);
    console.log('item.is_purchased=============',this.navParams.get("IsPurchased"));
    if(this.auth.getUserDetails().user_type == 2 && this.navParams.get("IsPurchased")==0){
      
      if(index==0){
        this.events.publish("LessonChanged", item.lession_id);
        console.log("lesson chnaged  1");
        this.closemodal();
      }else{
        this.alertP.show('تحذير!','يجب شراء الدورة حتى تتمكن من مشاهدة هذا الدرس');
       // this.alertP.show('Alert!','Coming soon!');
      }


    }else{
      this.events.publish("LessonChanged", item.lession_id);
      console.log("lesson chnaged");
      this.closemodal();
    }

    

    // if (this.auth.getUserDetails().user_type == 2 && item.is_purchased==0) {
    //   if(index==0){
    //     this.events.publish("LessonChanged", item.lession_id);
    //     console.log("lesson chnaged");
    //   }
    // }else{
    //   this.events.publish("LessonChanged", item.lession_id);
    //   console.log("lesson chnaged");
    // }
    
  }

  change_chapter(ev:any,chapter:any,index:any) {
    console.log(chapter,index);
    let data = {
      data:chapter,
      index:index,
    }
    this.veiwCtrl.dismiss(true);
    setTimeout(() => {
      this.events.publish('changeChapter',data);
    },500)
  }

  go_cource_detail(){
    this.veiwCtrl.dismiss(true);
  }

  back_to_home(): void{
    this.veiwCtrl.dismiss();
    if(this.auth.getUserDetails().user_type==1){
      this.app.getRootNav().setRoot(DashboardPage);
    } else {
      this.app.getRootNav().setRoot(HomePage);
    }
  }
}
