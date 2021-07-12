import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-student-list',
  templateUrl: 'student-list.html',
})
export class StudentListPage {
  students: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl:ViewController) {
      this.students = navParams.get('StudentList');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentListPage');
  }

}
