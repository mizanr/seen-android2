import { ThankyouPage } from './../../pages/thankyou/thankyou';
import { AuthProvider } from './../auth/auth';
import { AlertProvider } from './../alert/alert';
import { AlertController } from 'ionic-angular';
import { PaymentOptionPage } from './../../pages/payment-option/payment-option';
import { RestApiProvider } from './../rest-api/rest-api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BuyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BuyProvider {

  constructor(public http: HttpClient,
    public restApi: RestApiProvider,
    public alertCtrl: AlertController,
    public alertP: AlertProvider,
    public auth:AuthProvider) {
    console.log('Hello BuyProvider Provider');
  }

  selectOption(course_id,course_info) {
    return new Promise((resolve, reject) => {
      const modal = this.restApi.modalCtrl.create(PaymentOptionPage, {course_info:course_info}, { cssClass: 'mymodal' });
      modal.present();
      modal.onDidDismiss(res => {
        if (res == 'seen') {
          const prompt = this.alertCtrl.create({
            title: 'شراء ',
            message: "ادخل رقم بطاقة سين",
            inputs: [
              {
                name: 'code',
                placeholder: '87YHGT5'
              },
            ],
            buttons: [
              {
                text: 'Cancel',
              },
              {
                text: 'Save',
                handler: idata => {
                  if (idata.code) {
                    let data = {
                      course_id: { value: course_id, type: "NO" },
                      student_id: { value: this.auth.getCurrentUserId(), type: "NO" },
                      code:{ value: idata.code, type: "NO" }
                    };
                    this.restApi.postData(data, 0, "buy_course").then((result: any) => {
                      console.log(result);
                      if (result.status == 1) {
                        // this.navCtrl.pop();
                        resolve();
                        this.showSuccess();
                      } else {
                         reject();
                         this.alertP.show('تحذير!','غير صحيح');
                      }
                    });
                  } else {
                    this.alertP.show('تحذير!','ادخل رقم بطاقة سين!');
                    reject();
                  }
                }
              }
            ]
          });
          prompt.present();
        }
      })
    });
  }

  Option_ForBuy(course_id) {
    return new Promise((resolve, reject) => {
      // const modal = this.restApi.modalCtrl.create(PaymentOptionPage, {course_info:course_info}, { cssClass: 'mymodal' });
      // modal.present();
      // modal.onDidDismiss(res => {
        // if (res == 'seen') {
          const prompt = this.alertCtrl.create({
            title: 'شراء ',
            message: "ادخل رقم بطاقة سين",
            inputs: [
              {
                name: 'code',
                placeholder: '87YHGT5'
              },
            ],
            buttons: [
              {
                text: 'الغاء',
              },
              {
                text: 'حفظ',
                handler: idata => {
                  if (idata.code) {
                    let data = {
                      course_id: { value: course_id, type: "NO" },
                      student_id: { value: this.auth.getCurrentUserId(), type: "NO" },
                      code:{ value: idata.code, type: "NO" }
                    };
                    this.restApi.postData(data, 0, "buy_course").then((result: any) => {
                      console.log(result);
                      if (result.status == 1) {
                        // this.navCtrl.pop();
                        resolve(1);
                        this.showSuccess();
                      } else {
                         reject();
                         this.alertP.show('تحذير!','غير صحيح');
                      }
                    });
                  } else {
                    this.alertP.show('تحذير!','ادخل رقم بطاقة سين!');
                    reject(0);
                  }
                }
              }
            ]
          });
          prompt.present();
        // }
      // })
    });
  }

  showSuccess(){
    const modal = this.restApi.modalCtrl.create(ThankyouPage,{},{cssClass:'alertModal',showBackdrop: true, enableBackdropDismiss: true});
    modal.present();
  }

}
