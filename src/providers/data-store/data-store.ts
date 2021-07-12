import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataStoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataStoreProvider {
  mycourse_count: any = 0;
  my_courses: any = new Array();
  my_transation_history: any = new Array();
  noti_lists: any = new Array();
  courseDetail: any;
  chapterList: any = new Array();

  constructor(public http: HttpClient) {
    console.log('Hello DataStoreProvider Provider');
  }

}
