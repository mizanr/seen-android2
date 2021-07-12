import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
//import { Keyboard } from 'ionic-native';
//import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the AutofillPlacesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@Component({
  selector: 'page-autofill-places',
  templateUrl: 'autofill-places.html',
})
export class AutofillPlacesPage {
  @ViewChild('focusInput') myInput;
  autocomplete: any;
  autocompleteItems: any;
  GoogleAutocomplete: any;
  geocode: any;
  geocoder: any;
  responseData: any;
  constructor(
    public navCtrl: NavController,
    public zone: NgZone,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private keyboard: Keyboard
    // private geolocation: Geolocation
  ) {






    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.geocoder = new google.maps.Geocoder;


  }

  ionViewWillEnter() {
    this.keyboard.show();
  }
  ionViewDidLoad() {

    //  this.myInput.setFocus();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      //   Keyboard.show() // for android
      this.myInput.setFocus();
    }, 150);

  }

  updateSearchResults() {
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }

    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        // alert(JSON.stringify(predictions));
        // console.log(predictions);
        if (predictions) {
          this.autocompleteItems = [];
          this.zone.run(() => {

            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);

            });

          });
        }
      });
  }

  selectSearchResult(item) {
    // console.log(item);
    this.autocompleteItems = [];
    let selected_area = {
      "fulladdress": "",
      "city": "",
      "state": "",
      "country": "",
      "post_code": "",
      "lat": "",
      "lng": ""
    };
    this.geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
      if (status === 'OK' && results[0]) {
        selected_area.city = this.getlongname(results[0].address_components, "locality");
        selected_area.state = this.getlongname(results[0].address_components, "administrative_area_level_1");
        selected_area.country = this.getlongname(results[0].address_components, "country");
        selected_area.post_code = this.getlongname(results[0].address_components, "postal_code");
        selected_area.fulladdress = results[0].formatted_address;
        selected_area.lat = results[0].geometry.location.lat();
        selected_area.lng = results[0].geometry.location.lng();
        // console.log(selected_area.post_code);

        let position = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
          formatted_address: results[0].address_components[0].long_name
        }
        this.viewCtrl.dismiss(selected_area);

      }
    })
  }
  //city//locality
  //distric//sublocality
  //postal_code
  //country
  //state//administrative_area_level_1
  //distric//administrative_area_level_2
  getlongname(data, type) {

    for (let j = 0; j < data.length; j++) {
      if (data[j].types.indexOf(type) > -1) {
        return data[j].long_name;

      }
    }
    return "";
  }
  // getLocationLong(){
  //
  //
  // 	  this.geolocation.getCurrentPosition().then((resp) => {
  // 	  this.responseData = resp;
  //
  //       let position = {
  //          lat:this.responseData.coords.latitude,
  //          lng:this.responseData.coords.longitude,
  //          formatted_address : ""
  //       }
  //
  //
  //
  //       this.viewCtrl.dismiss(position);
  //
  //
  //
  //
  // }).catch((error) => {
  //   console.log('Error getting location', error);
  // });
  // }



}