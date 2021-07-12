import { AlertProvider } from './../../providers/alert/alert';
import { ImageProvider } from "./../../providers/image/image";
import { Component } from "@angular/core";
import {
  Nav,
  NavController,
  NavParams,
  Platform,
  MenuController,
  AlertController
} from "ionic-angular";
import { ForgotPage } from "../forgot/forgot";
import { HomePage } from "../home/home";
import { EmailFormPage } from "../email-form/email-form";
import { PrivacyPage } from "../privacy/privacy";
import { TermsPage } from "../terms/terms";
import { FacebookProvider } from "../../providers/facebook/facebook";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { AuthProvider } from "../../providers/auth/auth";
import { OnesignalProvider } from '../../providers/onesignal/onesignal';

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {

  blob_img: any = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public nav: Nav,
    public facebook: FacebookProvider,
    public rest_api: RestApiProvider,
    public auth: AuthProvider,
    public plt: Platform,
    public onesignal:OnesignalProvider,
    public menuCtrl: MenuController,
    public imageP: ImageProvider,
    public alertCtrl: AlertController,
    public alertP: AlertProvider
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  privacy() {
    this.navCtrl.push(PrivacyPage);
  }
  register() {
    this.navCtrl.push(EmailFormPage);
  }
  home() {
    this.nav.setRoot(HomePage);
  }
  terms() {
    this.navCtrl.push(TermsPage);
  }
  forgotnew() {
    this.navCtrl.push(ForgotPage);
  }
  back() {
    this.navCtrl.pop();
  }
  signup() {
    this.navCtrl.push(EmailFormPage);
  }

  // fbLogin() {

  //     this.socialLogin({
  //       email: "Mike@gmail.com",
  //       fname: "Mike",
  //       lname: "Mcgill",
  //       id: "1234567",
  //     });
  // }

  fbLogin() {
    if (this.plt.is("cordova")) {
      this.facebook.login().then((res: any) => {
        console.log("Fb res--------------------------", res);
        if (res) {
          this.imageP.imgURLtoURI(res.profilepic).then((base64: any) => {
            this.imageP.imgURItoBlobR(base64).then((blob: any) => {
              console.log('final blob-----', blob);
              this.blob_img = blob;
              this.socialLogin(res);
            });
          });
        }
      });
      // this.socialLogin({
      //   email: "Jimmy@gmail.com",
      //   fname: "Jimmy",
      //   lname: "Mcgill",
      //   id: "123456",
      // });
    } else {
      this.socialLogin({
        email: "Mike@gmail.com",
        fname: "Mike",
        lname: "Mcgill",
        id: "1234567",
      });
      // this.socialLogin({
      //   email: "Jimmy@gmail.com",
      //   fname: "Jimmy",
      //   lname: "Mcgill",
      //   id: "123456",
      // });
    }
  }

  socialLogin(k: any) {
    let Data = {
      email: { value: k.email, type: "NO" },
      fname: { value: k.fname, type: "NO" },
      lname: { value: k.lname, type: "NO" },
      facebook_id: { value: k.id, type: "NO" },
    };

    if (this.blob_img) {
      let m = this.blob_img.type == "image/png" ? 'png' : 'jpg';
      Data["profile"] = {
        value: this.blob_img,
        type: "IMAGE",
        name: this.imageP.generateImageName("hello." + m)
      };
      console.log("data---------", Data["profile"]);
    }
    this.rest_api.postData(Data, 0, "social_login").then((result: any) => {
      console.log(result);
      if (result.status == 1) {

        this.auth.updateUserDetails(result.data);
        this.update_deviceId();
        this.navCtrl.setRoot(HomePage);
        
        // if (result.data.facebook_url == '') {
        //   this.presentPrompt(result);
        // } else {
        //   this.navCtrl.setRoot(HomePage);
        //   this.auth.updateUserDetails(result.data);
        //   this.update_deviceId();
        // }


      } else {
        this.alertP.show('تحذير!', result.message);
      }
    });
  }

  presentPrompt(result) {
    let alert = this.alertCtrl.create({
      title: 'Enter your facebook profile url',
      inputs: [
        {
          name: 'url',
          placeholder: 'Enter url',
          value: 'https://www.facebook.com/'
        },
      ],
      buttons: [
        {
          text: 'Submit',
          handler: data => {
            console.log(data);
            if (data.url && data.url != 'https://www.facebook.com/') {
              this.navCtrl.setRoot(HomePage);
              this.auth.updateUserDetails(result.data);
              this.update_deviceId();
              this.fbUrl(data.url);
            } else {
              this.alertP.show('تحذير!', 'Please complete your facebook profile url!')
            }
          }
        }
      ]
    });
    alert.present();
  }

  fbUrl(u) {
    let data = {
      user_id: { value: this.auth.getCurrentUserId(), type: "NO" },
      facebook_url: { value: u, type: "NO" },
    };
    this.rest_api.postData_withoutloder(data, 0, "fill_url").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        // this.navCtrl.pop();
      } else {
      }
    });
  }

  update_deviceId() {
    if(this.plt.is('cordova')){
      this.onesignal.id().then(identity => {
        console.log('-------Device Id----------',identity);
        let Data = {
      id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
     device_id:{"value":identity,"type":'NO'},
    }
      this.rest_api.postData_withoutloder(Data,0,'UpdateDeviceId').then((result:any) => {
      console.log(result);
      })
      })
    }
  }
}
