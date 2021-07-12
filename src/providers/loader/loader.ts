import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoaderProvider {
  loading:any;
  constructor(public http: HttpClient,
    public loadingCtrl: LoadingController
    ) {
    //console.log('Hello LoaderProvider Provider');
  
  }

  show(){
    this.loading= this.loadingCtrl.create({
      content:''
    });
    this.loading.present();
  }
  hide(){
    this.loading.dismiss();
  }


}
