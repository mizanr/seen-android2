import { AuthProvider } from "./../../providers/auth/auth";
import { RestApiProvider } from "./../../providers/rest-api/rest-api";
import { Component } from "@angular/core";
import { LoadingController, NavController, NavParams } from "ionic-angular";
import { AddcoursesPage } from "../addcourses/addcourses";
import { DetailsPage } from "../details/details";
import { DataStoreProvider } from "../../providers/data-store/data-store";

@Component({
  selector: "page-mycources",
  templateUrl: "mycources.html"
})
export class MycourcesPage {
  courseList: any=[];
  allItems:any;
  noDataS = false;
  isdidloadcalled: any = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loader:LoadingController,
    public restApi: RestApiProvider,
    public dataP:DataStoreProvider,
    public auth: AuthProvider
  ) {
  }

  ionViewDidLoad() {
    this.isdidloadcalled = true;
    this.getMycourses(1);
  }

  ionViewWillEnter() {
    if (this.isdidloadcalled) {
      this.getMycourses(0);
    }
  }

  getMycourses(m) {
    const loader = this.loader.create({
      content: '',
    });
    if (m == 1&&this.dataP.my_courses.length==0) {
      loader.present();
    }
    let data = {
      user_id: { value: this.auth.getCurrentUserId(), type: "NO" }
    };
    this.restApi.postData_withoutloder(data, 0, "my_courses").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        loader.dismiss();
        this.dataP.my_courses = result.data;
        this.courseList = result.data;
        this.allItems=result.data;
      } else {
        loader.dismiss();
      }
      
    if (this.courseList.length == 0) {
      this.noDataS = true
    } else {
      this.noDataS = false
    }
    }).catch((error) => {
      loader.dismiss();
    })
  }

  add() {
    const modal = this.restApi.modalCtrl.create(AddcoursesPage);
    modal.present();
    modal.onDidDismiss(data=>{
       if(data){
         this.getMycourses(0);
       }
    });
  }
  details(k) {
    this.navCtrl.push(DetailsPage,{CourseId:k.course_id});
  }

  
  getItems(ev: any) {
    // console.log(this.allItem);
    // this.allItems.splice(0,1);
    // Reset items back to all of the items
    // this.initializeItems();
    // set val to the value of the searchbar
    const val = ev.target.value;
    //console.log(val);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.dataP.my_courses = this.allItems.filter((item) => {
        return (item.course_description.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.course_title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.courseList = this.allItems;
      this.dataP.my_courses = this.allItems;
    }
    if (this.courseList.length == 0 ||  this.dataP.my_courses.length == 0) {
      this.noDataS = true
    } else {
      this.noDataS = false
    }
  }

}
