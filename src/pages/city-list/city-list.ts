import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import { RestApiProvider } from "../../providers/rest-api/rest-api";

@Component({
  selector: "page-city-list",
  templateUrl: "city-list.html"
})
export class CityListPage {
  res: any = [];
  allItems: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restApi: RestApiProvider,
    public viewCtrl:ViewController
  ) {}

  ionViewWillEnter(){
   this.getChatUsers();
  }
  getChatUsers() {
    this.restApi.getwithUrl(1, "citylist").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.res = result.data;
        this.allItems = result.data;
        // this.loadMap();
        // this.addMarker();
      } else {
      }
    });
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    // this.initializeItems();
    // set val to the value of the searchbar
    const val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != "") {
      this.res = this.allItems.filter(item => {
        return (
          item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 
        );
      });
    } else {
      this.res = this.allItems;
    }
  }
}
