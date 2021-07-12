import { Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OneSignal, OSNotification } from '@ionic-native/onesignal';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
/*
  Generated class for the OnesignalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
//$ ionic cordova plugin add onesignal-cordova-plugin
//$ npm install --save @ionic-native/onesignal@4

@Injectable()
export class OnesignalProvider {

  open: BehaviorSubject<any> = new BehaviorSubject(null);
  received: BehaviorSubject<any> = new BehaviorSubject(null);
  
  constructor(public http: HttpClient,
    private oneSignal: OneSignal,
    private platform: Platform
    ) {
   // console.log('Hello OnesignalProvider Provider');

  }


  init(){
    if(this.platform.is("cordova")){
    //  console.log("onesignal initialization ----------------------------");
      this.oneSignal.startInit('f8bf2461-4402-4e39-a896-72e1e94b5622', '1069509271868'); //clientkey

      
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      this.oneSignal.handleNotificationReceived().subscribe((data:any) => {
        let newData=data.payload.additionalData;
        if(newData){
          newData["isFocus"]=data.isAppInFocus;
          this.received.next(newData);
        }
     
      });
  
      this.oneSignal.handleNotificationOpened().subscribe((data:any) => {
        let newData=data.notification.payload.additionalData;
        if(newData){
          newData["isFocus"]=data.notification.isAppInFocus;
          this.open.next(newData);
        }
       
      });
      this.oneSignal.endInit();


    }
    else{ 
      this.received.next(0);
      this.open.next(0);
    }




  }

  enableWhenAppIsOpen(v:boolean){
    if(v==true){
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    }
    else{
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
    }

  }

  id(){
    return new Promise((resolve, reject) => {
      if(this.platform.is("cordova")){
          this.oneSignal.getIds().then(identity => {
            resolve(identity.userId);
          });
      }else{
        resolve(0);
      }
  });

  }


        /**************one signal**************** 
        this.onesignal.init();
        this.onesignal.open.subscribe((data:any)=>{
                 if(data!=0){
                    if(data.isFocus){

                    }
               }
        });
        this.onesignal.received.subscribe((data:any)=>{
                  if(data!=0){
                        if(data.isFocus){

                        }
                  }
        });
          *************one signal end**************** */
         sendNotification(user:any,token:string,type:string){
           let data={
            profile:user,
            type:type,
            channel:user.channel
           }
           
           let obj:OSNotification={
             app_id:'e27699db-d0bc-4d45-9133-f2f2c240b9b5',
             contents : {'en':user.full_name+" calling you"},
             include_player_ids:[token],
             data:data
           }
           console.log('notification sending data',obj);
            this.oneSignal.postNotification(obj).then((res)=>{
              console.log("success",res)
            }).catch((res)=>{
              console.log("error",res)
            })
         }





         sendPushNotification(message:string, token:any, data:any){
           
          let obj:OSNotification={
            app_id:'e27699db-d0bc-4d45-9133-f2f2c240b9b5',
            contents : {'en':message},
            include_player_ids:token,
            data:data
          }
          console.log('notification sending data',obj);
           this.oneSignal.postNotification(obj).then((res)=>{
             console.log("success",res)
           }).catch((res)=>{
             console.log("error",res)
           })
        }

}
