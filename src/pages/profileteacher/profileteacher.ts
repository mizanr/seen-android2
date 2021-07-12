import { DetailsPage } from './../details/details';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-profileteacher',
  templateUrl: 'profileteacher.html',
})
export class ProfileteacherPage {
  teacher:any;
  myCourseList: any=[];
  noDataSCourse = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restApi:RestApiProvider) {
      this.getProfile();
  }

   back(){
  this.navCtrl.pop();
  }

  getProfile() {
    this.restApi
      .get({}, 1, "profile/" + this.navParams.get('TeacherId'))
      .then((result: any) => {
        console.log(result);
        if (result.status == 1) {
          this.teacher=result.data;
          this.getMyCourses();
        } else {
        }
      });
  }
  
  getMyCourses() {
    let data = {
      user_id: { value: this.navParams.get('TeacherId'), type: "NO" }
    };
    this.restApi.postData(data, 0, "my_courses").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.myCourseList = result.data;
      } else {
      }

      if (this.myCourseList.length == 0) {
        this.noDataSCourse = true
      } else {
        this.noDataSCourse = false
      }
    });
  }
  
  details(k) {
    this.navCtrl.push(DetailsPage, { CourseId: k.course_id });
  }
}
