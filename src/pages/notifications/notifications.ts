import { Component } from '@angular/core';
import { NavController, NavParams ,ModalController, LoadingController} from 'ionic-angular';

import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { MywalletPage } from '../mywallet/mywallet';
import { DetailsPage } from '../details/details';
import { QuizPage } from '../quiz/quiz';
import { CoursePage } from '../course/course';
import { DataStoreProvider } from '../../providers/data-store/data-store';
// import { OrganizationHomePage } from '../organization-home/organization-home';
// import { TravelerDetailsPage } from '../traveler-details/traveler-details';
// import { RejectedTripsPage } from '../rejected-trips/rejected-trips';
// import { TripsApprovalPage } from '../trips-approval/trips-approval';
// import { TripsPendingPage } from '../trips-pending/trips-pending';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
lists:any = new Array();
isdidloadcalled: any = false;

  constructor(public nav: NavController,
  	public auth:AuthProvider,
 	 public rest_api:RestApiProvider,
		public modalCtrl: ModalController,
		public loader: LoadingController,
		public dataP:DataStoreProvider,
 	 public alertP:AlertProvider, 
  	public navParams: NavParams) {
  }

	ionViewDidLoad() {
		this.isdidloadcalled = true;
  	this.get_list(1);
    console.log('ionViewDidLoad NotificationsPage');
	}
	
	ionViewWillEnter() {
		if (this.isdidloadcalled) {
			this.get_list(0);
		}
	}

  clear_noti() {
    let Data = {
  		user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
  	}

  	this.rest_api.postData_withoutloder(Data,0,'ClearNotification').then((result: any) => {
			console.log(result);
			this.get_list(0);			
  		if(result.status == 1){
  			// this.get_list();
  		}
  	})
  }

	get_list(m) {
		const loader = this.loader.create({
			content: '',
		});
		if (m == 1&&this.dataP.noti_lists.length==0) {
			loader.present();
		}
  	let Data = {
  		user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
  	}

		this.rest_api.postData_withoutloder(Data, 0, 'GetNotification').then((result: any) => {
			console.log(result);
			if (result.status == 1) {
				loader.dismiss();
				this.read_noti();
				this.lists = result.data;
				this.dataP.noti_lists = result.data;
			} else {
				loader.dismiss();
				this.lists = [];
				this.dataP.noti_lists = [];
			}
		}).catch((err) => loader.dismiss());
  }

   read_noti() {
  	let Data = {
  		user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
  	}
  	this.rest_api.postData_withoutloder(Data,0,'MarkAsReadNotification').then((result: any) => {
  		console.log(result);
  		if(result.status == 1){  			
  		}
  	})
  }

  go(data:any){
    console.log(data);
    if(data.other.screen == 'course'){
        this.nav.push(MywalletPage,{id:data.other.course_organization_id});
		}
		
		if(data.other.screen == 'add_course'  || data.other.screen == 'Delete_lession'){
				this.nav.push(DetailsPage,{CourseId:data.other.course_id});
		}

		if(data.other.screen == 'Quiz_submitted'){
				this.nav.push(QuizPage,{QuizId:data.other.quiz_id});
		}

		if(data.other.screen == 'add_lession'){
				this.nav.push(CoursePage,{LessonId:data.other.lession_id});
		}
    
  }

}
