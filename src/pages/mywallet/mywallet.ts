import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { DataStoreProvider } from '../../providers/data-store/data-store';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { DetailsPage } from '../details/details';

/**
 * Generated class for the MywalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mywallet',
  templateUrl: 'mywallet.html',
})
export class MywalletPage {
wallet_amount:any=0;
lists:any=[];
  isdidloadcalled: any = false;

  constructor(public navCtrl: NavController,
    public auth: AuthProvider,
    public restApi: RestApiProvider,
    public dataP: DataStoreProvider,
    public loader:LoadingController,
    public alertP: AlertProvider,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.isdidloadcalled = true;
    this.get_transaction(1);
    console.log('ionViewDidLoad MywalletPage');
  }

  ionViewWillEnter() {
    if (this.isdidloadcalled) {
      this.get_transaction(0);      
    }
  }

  get_transaction(m) {

    const loader = this.loader.create({
      content: ''
    });
    if (m == 1&& this.dataP.my_transation_history.length==0) {
      loader.present();
    }

    let Data = {
      user_id:{value:this.auth.getCurrentUserId(),type:"NO"},
    }
    this.restApi.postData_withoutloder(Data, 0, "transaction").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        loader.dismiss();
        this.lists = result.data;
        this.dataP.my_transation_history = result.data;
        this.wallet_amount = result.walletAmt;
      } else {
        loader.dismiss();
      }
    }).catch((err) => loader.dismiss());
  }

  details(k) {
    this.navCtrl.push(DetailsPage, { CourseId: k.course_id });
  }

}
