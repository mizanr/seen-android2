import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PrivacyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html',
})
export class PrivacyPage {
  privacy: any = '';
  isPrivacy = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restapi: RestApiProvider) {
      console.log('ffffff----------',navParams.get('Type'));
      
    if (navParams.get('Type') == 'privacy') {
      this.isPrivacy = true
    } else {
      this.isPrivacy = false;
    }
    this.socialLogin();
  }

  socialLogin() {
    let Data = {
      // email: { value: k.email, type: "NO" },
    };

    this.restapi.get(Data, 1, "terms_privacy").then((result: any) => {
      if (result.status == 1) {
        if (this.isPrivacy) {
          this.privacy = result.privacy
        } else {
          this.privacy = result.terms
        }
      } else {
      }
    });
  }

}
