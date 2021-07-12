import { LoaderProvider } from './../loader/loader';
import { Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
/*
https://developers.facebook.com/apps/939319526180134/settings/basic/

1.  > add packagename/bundleid in android/ios platform
    > http://code.google.com/p/openssl-for-windows/downloads/detail?name=openssl-0.9.8k_WIN32.zip
    >  keytool -exportcert -alias androiddebugkey -keystore "C:\Documents and Settings\Administrator.android\debug.keystore" | "C:\OpenSSL\bin\openssl" sha1 -binary |"C:\OpenSSL\bin\openssl" base64

2. ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="939319526180134" --variable APP_NAME="webwider_test"
    npm install --save @ionic-native/facebook@4

3. add  to module
    import { Facebook } from '@ionic-native/facebook';



*/


@Injectable()
export class FacebookProvider {

      constructor(
            public http: HttpClient,
            public platform: Platform,
            public fb: Facebook,
            public loading: LoaderProvider
      ) {
            console.log('Hello FacebookProvider Provider');
      }



      login() {
            this.loading.show();
            return new Promise((resolve, reject) => {
                  if (this.platform.is("cordova")) {
                        this.fb.login(['public_profile', 'email']).then((res: FacebookLoginResponse) => {
                              this.fb.api(res.authResponse.userID + "/?fields=id,email,first_name,last_name,picture.width(300).height(300).as(picture_large)", []).then(profile => {
                                    let data = {
                                          "fname": profile.first_name,
                                          "lname": profile.last_name,
                                          "email": profile.email,
                                          "profilepic": profile.picture_large.data.url,
                                          "id": res.authResponse.userID,
                                    }

                                    resolve(data);
                                    this.loading.hide();
                              }, err => {
                                    reject(err);
                                    console.log("api error", err);
                                    this.loading.hide();

                              });
                        }).catch(e => {
                              reject(e);
                              console.log("calling error", e);

                              this.loading.hide();

                        });

                  }
            })
      }



}




