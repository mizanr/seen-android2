import { ThankyouPage } from './../pages/thankyou/thankyou';
import { AlertProvider } from "./../providers/alert/alert";
import { RestApiProvider } from "./../providers/rest-api/rest-api";
import { AuthProvider } from "./../providers/auth/auth";
import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, NavController, Events } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { HomePage } from "../pages/home/home";
import { TabsPage } from "../pages/tabs/tabs";
import { LoginPage } from "../pages/login/login";
import { ForgotPage } from "../pages/forgot/forgot";
import { SignupPage } from "../pages/signup/signup";
import { SearchPage } from "../pages/search/search";
import { ChatlistPage } from "../pages/chatlist/chatlist";
import { ChatdetailsPage } from "../pages/chatdetails/chatdetails";
import { ProfilePage } from "../pages/profile/profile";
import { ChangepasswordPage } from "../pages/changepassword/changepassword";
import { TermsPage } from "../pages/terms/terms";
import { SettingsPage } from "../pages/settings/settings";
import { NewsfeedPage } from "../pages/newsfeed/newsfeed";
import { CategoriesPage } from "../pages/categories/categories";
import { LocationPage } from "../pages/location/location";
import { AddBusinessPage } from "../pages/add-business/add-business";
import { MembershipPage } from "../pages/membership/membership";
import { CategoryPage } from "../pages/category/category";
import { DetailsPage } from "../pages/details/details";
import { ClientPage } from "../pages/client/client";
import { AddclientPage } from "../pages/addclient/addclient";
import { PlaceorderPage } from "../pages/placeorder/placeorder";
import { NextvisitPage } from "../pages/nextvisit/nextvisit";
import { ProductlistPage } from "../pages/productlist/productlist";
import { AddclientinfoPage } from "../pages/addclientinfo/addclientinfo";
import { ProductPage } from "../pages/product/product";
import { PivacyPage } from "../pages/pivacy/pivacy";
import { AboutPage } from "../pages/about/about";
import { ProductDetailPage } from "../pages/product-detail/product-detail";
import { NotificationsPage } from "../pages/notifications/notifications";
import { NewsPage } from "../pages/news/news";
import { NewsDetailPage } from "../pages/news-detail/news-detail";
import { ForgotPasswordPage } from "../pages/forgot-password/forgot-password";
import { SalesNotePage } from "../pages/sales-note/sales-note";
import { SelectPage } from "../pages/select/select";
import { PaymentPage } from "../pages/payment/payment";
import { CoursePage } from "../pages/course/course";
import { QuizPage } from "../pages/quiz/quiz";
import { MycourcesPage } from "../pages/mycources/mycources";
import { HelpPage } from "../pages/help/help";
import { TeacherloginPage } from "../pages/teacherlogin/teacherlogin";
import { TeachersignupPage } from "../pages/teachersignup/teachersignup";
import { ApprovedPage } from "../pages/approved/approved";
import { AddcoursesPage } from "../pages/addcourses/addcourses";
import { TeacherhomePage } from "../pages/teacherhome/teacherhome";
import { TeacherprofilePage } from "../pages/teacherprofile/teacherprofile";
import { AddlessionPage } from "../pages/addlession/addlession";
import { AddquizPage } from "../pages/addquiz/addquiz";
import { MywalletPage } from "../pages/mywallet/mywallet";
import { ProfileteacherPage } from "../pages/profileteacher/profileteacher";
import { PromocodePage } from "../pages/promocode/promocode";
import { CourseSidebarPage } from "../pages/course-sidebar/course-sidebar";
import { QuizResultPage } from "../pages/quiz-result/quiz-result";
import { TransactionPage } from "../pages/transaction/transaction";
import { DashboardPage } from "../pages/dashboard/dashboard";

import { EmailFormPage } from "../pages/email-form/email-form";
import { DetailNextPage } from "../pages/detail-next/detail-next";
import { JoinPage } from "../pages/join/join";
import { AlmostdonePage } from "../pages/almostdone/almostdone";
import { ContactusPage } from "../pages/contactus/contactus";
import { WalletPage } from "../pages/wallet/wallet";
import { PrivacyPage } from "../pages/privacy/privacy";
import { MycampaignPage } from "../pages/mycampaign/mycampaign";
import { IntoductionPage } from '../pages/intoduction/intoduction';
import { OnesignalProvider } from '../providers/onesignal/onesignal';

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  type = 1;
  structure: any = { lower: 0, upper: 60 };
  splashData: any;
  constructor(
    private platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public event: Events,
    public auth: AuthProvider,
    public restApi: RestApiProvider,
    public alertP: AlertProvider,
    public onesignal:OnesignalProvider,
  ) {
    platform.ready().then(() => {
      platform.setDir('rtl', true);
      this.onesignal.init();
      this.onesignal.open.subscribe((data:any)=>{
        if(data!=0 && data){
  
          if(data.other.screen == 'course'){
            setTimeout(() => {
              this.nav.push(MywalletPage,{id:data.other.course_organization_id});
            },700)
          }

          if(data.other.screen == 'add_course'  || data.other.screen == 'Delete_lession'){
            setTimeout(() => {
              this.nav.push(DetailsPage,{CourseId:data.other.course_id});
            },500)
          }
  
          if(data.other.screen == 'Quiz_submitted'){
            setTimeout(() => {
              this.nav.push(QuizPage,{QuizId:data.other.quiz_id});
            },500)
          }
  
          if(data.other.screen == 'add_lession' || data.other.screen == 'Delete_lession'){
            setTimeout(() => {
              this.nav.push(CoursePage,{LessonId:data.other.lession_id});
            },500)
          }
  
        }
      });
      

     // this.getSplash();
      setTimeout(() => {
        statusBar.show();
        setTimeout(() => { }, 500);
        // statusBar.backgroundColorByHexString("#FFFFFF");
        // this.events.publish('animate', true);
        this.checkUser();
      }, 6);
      // 6000
    });
    statusBar.styleLightContent();
  }

  update_deviceId() {
    if(this.platform.is('cordova')){
      this.onesignal.id().then(identity => {
        console.log('-------Device Id----------',identity);
        let Data = {
      id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
     device_id:{"value":identity,"type":'NO'},
    }
      this.restApi.postData_withoutloder(Data,0,'UpdateDeviceId').then((result:any) => {
      console.log(result);
      })
      })
    }
  }

  update_nulldeviceid() {
    // if(this.platform.is('cordova')){
      // this.onesignal.id().then(identity => {
        // console.log('-------Device Id----------',identity);
        let Data = {
      id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
     device_id:{"value":'',"type":'NO'},
    }
      this.restApi.postData_withoutloder(Data,0,'UpdateDeviceId').then((result:any) => {
      console.log(result);
      })
      // })
    // }
  }

  about() {
    this.nav.push(AboutPage);
  }

  profile() {
    if (this.auth.getUserDetails().user_type == 2) {
      this.nav.push(ProfilePage);
    } else {
      this.nav.push(DashboardPage);
    }
  }
  
  getSplash() {
    this.restApi.postDatawithoutldr({}, 0, "get_splash").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.splashData = result.data;
      } else {
      }
    });
  }

  teacherprofile() {
    this.nav.push(TeacherprofilePage);
  }
  terms() {
    this.nav.push(TermsPage);
  }
  courses() {
    if (this.auth.isUserLoggedIn()) {
      if (this.auth.getUserDetails().user_type == 1) {
        this.nav.push(MycourcesPage);
      } else {
        this.nav.push(MycourcesPage, { for: 'Student' });
      }
    }
  }
  contact() {
    this.nav.push(ContactusPage);
  }
  campaign() {
    this.nav.push(MycampaignPage);
  }
  login() {
    this.nav.push(SelectPage);
  }
  help() {
    this.nav.push(HelpPage);
  }
  change() {
    this.nav.push(ChangepasswordPage);
  }
  wallet() {
    this.nav.push(MywalletPage);
  }

  trans() {
    this.nav.push(MywalletPage);
  }

  logout() {
    this.alertP
      .confirmationAlert("تحذير!", "هل انت متأكد من انك تريد تسجيل الخروج")
      .then(res => {
        if (res) {
          this.update_nulldeviceid();
          this.auth.removeUserDetails();
          this.nav.setRoot(IntoductionPage);
          // window.location.href = "";
        }
      });
  }

  checkUser() {
    console.log(this.auth.isUserLoggedIn());
    if (this.auth.isUserLoggedIn()) {
      this.getProfile();

    } else {
      this.rootPage = IntoductionPage;
      // this.rootPage = ApprovedPage;
    }
  }

  getProfile() {
    this.restApi
      .get({}, 0, "profile/" + this.auth.getCurrentUserId())
      .then((result: any) => {
        console.log(result);
        if (result.status == 1) {
          this.auth.updateUserDetails(result.data);
          this.update_deviceId();
          if (this.auth.getUserDetails().user_type == 1) {
            if (this.auth.getUserDetails().active_status == 1) {
              // this.rootPage = TeacherhomePage;
              this.rootPage = DashboardPage;
            } else {
              this.rootPage = ApprovedPage;
            }
          } else {
            this.rootPage = HomePage;
            // this.rootPage = ThankyouPage;
          }
        } else {
        }
      });
  }
}
