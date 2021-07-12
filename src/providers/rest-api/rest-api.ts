import { AuthProvider } from "./../auth/auth";
import { HttpParams, HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  LoadingController,
  AlertController,
  ModalController,
  Events,
  ActionSheetController
} from "ionic-angular";
import { AlertProvider } from "../alert/alert";

// let apiUrl = "https://www.webwiders.com/WEB01/Educational/Api/";
let apiUrl = "https://seen-edu.com/Api/";

/*
    usefullData

*/
/***validation***/

const validation = {
  EMAIL: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PHONE: /^[0-9]{6,14}$/,
  postal_code: /^[0-9\ ]{4,8}$/,
  onlyAlpha: /^[a-zA-Z\s]*$/,
  // "PASSW":/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,20}$/,
  PASSW: /^[a-zA-Z0-9]{6,100}$/,
  // "PASSW": /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/,
  OPASS: /^[a-zA-Z0-9]{6,100}$/,
  NPASS: /^[a-zA-Z0-9]{6,100}$/,
  HEADLINE: /^(?:[A-Za-z]+ ){0,2}[A-Za-z]+$/,
  // YOUTUBE:/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:vimeo\.com|vimeo.be))(\/(?:[\w\-]+\?v=|video\/|v\/)?)([\w\-]+)(\S+)?$/
  YOUTUBE:/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/

};

/*****************/
@Injectable()
export class RestApiProvider {
  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public alert: AlertProvider,
    public modalCtrl: ModalController,
    public events: Events,
    public auth: AuthProvider,
    public actionSheetCtrl:ActionSheetController
  ) {
    console.log("Hello RestApiProvider Provider");
  }

  // presentAlert(message) {
  //
  //
  //
  //   let alert = this.alertCtrl.create({
  //     subTitle: 'GoFrakt',
  //     cssClass: 'simpleAlert',
  //     message: message,
  //     buttons: [{
  //     text:'Okay',
  //     cssClass:'cancel'
  //   }
  //     ]
  //   });
  //   alert.present();
  // }

  /***************************************************************************************************
   *******************************************POST DATA*************************************************
   ****************************************************************************************************/

  validation(data: any) {
      console.log('data-------',data);
    for (let key in data) {
      if (data[key].type != "NO" && data[key].type != "IMAGE1") {
        if (
          data[key].value == null ||
          data[key].value == "" ||
          data[key].value === false
        ) {
          this.alert.showEmptyMessage(data[key].type);
          return 0;
        } else if (
          key == "confirmP" &&
          data[key].value != data["password"].value
        ) {
          this.alert.showMessage(data[key].type);
          return 0;
        } else {
          if (
            data[key].type == "EMAIL" ||
            data[key].type == "PHONE" ||
            data[key].type == "onlyAlpha" ||
            data[key].type == "PASSW" ||
            data[key].type == "NPASS" ||
            data[key].type == "HEADLINE" ||
            data[key].type == "YOUTUBE"
          ) {
            if (!validation[data[key].type].test(data[key].value)) {
              this.alert.showMessage(data[key].type);
              return 0;
            }
          }
        }
      }
    }
    return 1;
  }

  // generateFormData(data: any) {
  //   let input = new FormData();
  //   for (let key in data) {
  //     if (key !== "confirmP" && key !== "terms") {
  //       if ((data[key].type == "IMAGE" || data[key].type == "IMAGE1") && data[key].value) {
  //         input.append(key, data[key].value, data[key].name);
  //       } else {
  //         input.append(key, data[key].value);
  //       }
  //     }
  //   }
  //   return input;
  // }

  generateFormData(data: any) {
    let input = new FormData();
    for (let key in data) {
      if (key !== "confirmP" && key !== "terms") {
        if (data[key].name && data[key].value) {
          console.log('name added',data[key].name)
          input.append(key, data[key].value, data[key].name);
        } else {
          input.append(key, data[key].value);
        }
      }
    }
    return input;
  }

  // generateFormData(data: any) {
  //   let input = new FormData();
  //   for (let key in data) {
  //     if (key !== "confirmP" && key !== "terms") {
  //       if (data[key].name && data[key].value) {
  //         input.append(key, data[key].value, data[key].name);
  //       } else {
  //         input.append(key, data[key].value);
  //       }
  //     }
  //   }
  //   return input;
  // }

  // generateFormData(data: any) {

  //   let input = new FormData();
  //   for (let key in data) {
  //     if (key !== "confirmP" && key !== "terms") {
  //       if (data[key].name && data[key].value) {
  //         input.append(key, data[key].value, data[key].name);
  //       } else {
  //         input.append(key, data[key].value);

  //       }
  //       // console.log("----------------form data generated",input,key,data);
  //     }
  //   }
  //   return input;
  // }

  postDatawithoutldr(data: any, showMsg: number, url: string) {
    const loader = this.loadingCtrl.create({
      // content: "<img src='/assets/f2.gif'>",
      // spinner:'hide',
      cssClass: "customloading"
    });
    // loader.present();
    let valid = this.validation(data);
    // valid=0;
    //let formdata=this.generateFormData(data);// 2 min ruk....uijkm,nkkkjnnnb
    //console.log(formdata);
    if (valid != 0) {
      let formdata = this.generateFormData(data);
      // let headers = new HttpHeaders({ Accept: "application/json" }); 
      let headers = new HttpHeaders({ "Accept": "application/json" , "Auth-Api-Key":'SeeN-eDu-$XcDk3434'  });
    //  headers = headers.append("Auth-Api-Key", "SeeN-eDu-$XcDk3434");
      return new Promise((resolve, reject) => {
        this.http
          .post(apiUrl + url, formdata, { headers: headers })
          .toPromise()
          .then((response: any) => {
            if (showMsg) {
              this.alert.show("تحذير!", response.responseMessage);
            }
            resolve(response);

            loader.dismiss();
          })
          .catch(error => {
            this.alert.showMessage("TECHP");

            // alert(JSON.stringify(error));

            reject(error);
            loader.dismiss();
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        loader.dismiss();
      });
    }
  }

  postData(data: any, showMsg: number, url: string) {
    const loader = this.loadingCtrl.create({
      // content: "<img src='/assets/f2.gif'>",
      // spinner:'hide',
      cssClass: "customloading"
    });
    loader.present();
    let valid = this.validation(data);
    // valid=0;
    //let formdata=this.generateFormData(data);
    //console.log(formdata);
    if (valid != 0) {
      let formdata = this.generateFormData(data);
      let headers = new HttpHeaders({ "Accept": "application/json" , "Auth-Api-Key":'SeeN-eDu-$XcDk3434'  });
      // let headers = new HttpHeaders({ Accept: "application/json" });     
      // headers = headers.append("Auth-Api-Key", "SeeN-eDu-$XcDk3434");
      return new Promise((resolve, reject) => {
        this.http
          .post(apiUrl + url, formdata, { headers: headers })
          .toPromise()
          .then((response: any) => {
            if (showMsg) {
              this.alert.show("تحذير!", response.message);
            }
            resolve(response);

            loader.dismiss();
          })
          .catch(error => {
            this.alert.showMessage("TECHP");

            // alert(JSON.stringify(error));

            reject(error);
            loader.dismiss();
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        loader.dismiss();
      });
    }
  }

  postData_withoutloder(data: any, showMsg: number, url: string) {
    const loader = this.loadingCtrl.create({
      // content: "<img src='/assets/f2.gif'>",
      // spinner:'hide',
      cssClass: "customloading"
    });
    //loader.present();
    let valid = this.validation(data);
    // valid=0;
    //let formdata=this.generateFormData(data);
    //console.log(formdata);
    if (valid != 0) {
      let formdata = this.generateFormData(data);
      let headers = new HttpHeaders({ "Accept": "application/json" , "Auth-Api-Key":'SeeN-eDu-$XcDk3434'  });    
      // let headers = new HttpHeaders({ Accept: "application/json" });
      // headers = headers.append("Auth-Api-Key", "SeeN-eDu-$XcDk3434");     
      return new Promise((resolve, reject) => {
        this.http
          .post(apiUrl + url, formdata, { headers: headers })
          .toPromise()
          .then((response: any) => {
            if (showMsg) {
              this.alert.show("تحذير!", response.responseMessage);
            }
            resolve(response);

            loader.dismiss();
          })
          .catch(error => {
            this.alert.showMessage("TECHP");

            // alert(JSON.stringify(error));

            reject(error);
            loader.dismiss();
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        loader.dismiss();
      });
    }
  }

  /******************************************************************************************************************
   *******************************************POST DATA WITHOUT LOADER PRESENT**************************************
   *****************************************************************************************************************/

  postDataWithoutLoader(data: any, showMsg: number) {
    const loader = this.loadingCtrl.create({
      // content: "<img src='/assets/f2.gif'>",
      // spinner:'hide',
      cssClass: "customloading"
    });
    // loader.present();
    let valid = this.validation(data);
    // valid=0;
    //let formdata=this.generateFormData(data);
    //console.log(formdata);
    if (valid != 0) {
      let formdata = this.generateFormData(data);
      let headers = new HttpHeaders({ "Accept": "application/json" , "Auth-Api-Key":'SeeN-eDu-$XcDk3434'  });
      // headers = headers.append("Auth-Api-Key", "SeeN-eDu-$XcDk3434");
      return new Promise((resolve, reject) => {
        this.http
          .post(apiUrl, formdata, { headers: headers })
          .toPromise()
          .then((response: any) => {
            if (showMsg) {
              this.alert.show("", response.message);
            }
            resolve(response);

            // loader.dismiss();
          })
          .catch(error => {
            this.alert.showMessage("TECHP");

            // alert(JSON.stringify(error));

            reject(error);
            loader.dismiss();
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        loader.dismiss();
      });
    }
  }

  /***************************************************************************************************
   *******************************************GET DATA*************************************************
   ****************************************************************************************************/

  getUrlFromData(data: any) {
    let params = new HttpParams();

    for (let key in data) {
      params = params.append(key, data[key]);
    }
    return params;
  }

  get(data: any, spinner: any, url: string) {
    const loader = this.loadingCtrl.create({
      //   content: "<img src='/assets/f2.gif'>",
      //     spinner:'hide',
      cssClass: "customloading"
    });
    if (spinner == "1") {
      loader.present();
    }
    let params = this.getUrlFromData(data);
    let headers = new HttpHeaders({ "Accept": "application/json" , "Auth-Api-Key":'SeeN-eDu-$XcDk3434'  });
    return new Promise((resolve, reject) => {
      this.http
        .get(apiUrl + url, { params: params,headers:headers})
        .toPromise()
        .then(response => {
          resolve(response);
          loader.dismiss();
        })
        .catch(error => {
          reject(error);
          loader.dismiss();
        });
    });
  }

  getwithUrl(spinner: any, url: string) {
    const loader = this.loadingCtrl.create({
      //   content: "<img src='/assets/f2.gif'>",
      //     spinner:'hide',
      cssClass: "customloading"
    });
    if (spinner == "1") {
      loader.present();
    }
    // let params = this.getUrlFromData(data);
    let headers = new HttpHeaders({ "Accept": "application/json" , "Auth-Api-Key":'SeeN-eDu-$XcDk3434'  });
    return new Promise((resolve, reject) => {
      this.http
        .get(apiUrl + url, {headers:headers})
        .toPromise()
        .then(response => {
          resolve(response);
          loader.dismiss();
        })
        .catch(error => {
          reject(error);
          loader.dismiss();
        });
    });
  }

  check() {
    let headers = new HttpHeaders({ "Accept": "application/json" , "Auth-Api-Key":'SeeN-eDu-$XcDk3434'  });
    return new Promise((resolve, reject) => {
      this.http
        .get(apiUrl, {headers:headers})
        .toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /***************************************************************************************************
   *******************************************GET LANGUAGE DETAILS*************************************************
   ****************************************************************************************************/

  verifyOtp(otp) {
    const loader = this.loadingCtrl.create({
      //   content: "<img src='/assets/f2.gif'>",
      //     spinner:'hide',
      cssClass: "customloading"
    });

    loader.present();

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (otp == localStorage.getItem("OtpCode")) {
          loader.dismiss();
          resolve(true);
        } else {
          loader.dismiss();
          this.alert.show("", "Invalid OTP!");
          resolve(false);
        }
      }, 200);
    });
  }

  getCountries() {
    const loader = this.loadingCtrl.create({
      //   content: "<img src='/assets/f2.gif'>",
      //     spinner:'hide',
      cssClass: "customloading"
    });

    loader.present();

    return new Promise((resolve, reject) => {
      this.http
        .get("countries.json", {})
        .toPromise()
        .then(response => {
          resolve(response);
          loader.dismiss();
        })
        .catch(error => {
          reject(error);
          loader.dismiss();
        });
    });
  }

  getBalance() {
    return new Promise((resolve, reject) => {
      this.getwithUrl(
        0,
        "piWalletHistory/" + this.auth.getCurrentUserId()
      ).then((result: any) => {
        if (result.status == 1) {
          resolve(result.pi_wallet_amount);
        } else {
        }
      });
    });
  }
}
