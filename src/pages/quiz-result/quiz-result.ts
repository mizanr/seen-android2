import { Component } from '@angular/core';
import { NavController, NavParams , ViewController } from 'ionic-angular';
import { CoursePage } from '../course/course';


/**
 * Generated class for the QuizResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-quiz-result',
  templateUrl: 'quiz-result.html',
})
export class QuizResultPage {
info:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public veiwCtrl:ViewController ) {
    this.info = navParams.data.data;
    console.log(this.info);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizResultPage');
  }

  closemodal(){
    this.veiwCtrl.dismiss(true);
  }

  new(){
    this.veiwCtrl.dismiss(true);
  //  this.navCtrl.push(CoursePage);
  }

}
