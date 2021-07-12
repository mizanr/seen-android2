import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-purchased-student-list',
  templateUrl: 'purchased-student-list.html',
})
export class PurchasedStudentListPage {
  students: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController) {
    this.students = navParams.get('StudentList');
  }


}
