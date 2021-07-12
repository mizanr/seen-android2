import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { LocationPage } from '../location/location';
import { ClientPage } from '../client/client';
import { ProductPage } from '../product/product';
import { NewsPage } from '../news/news';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = LocationPage;
  tab3Root = ClientPage;
  tab4Root = ProductPage;
  tab5Root = NewsPage;

  constructor() {

  }
}
