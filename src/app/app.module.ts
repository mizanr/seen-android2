import { PurchasedStudentListPage } from './../pages/purchased-student-list/purchased-student-list';
import { StudentListPage } from './../pages/student-list/student-list';
import { ThankyouPage } from './../pages/thankyou/thankyou';
import { PaymentOptionPage } from './../pages/payment-option/payment-option';
import { ImageProvider } from './../providers/image/image';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, MenuController } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ForgotPage } from '../pages/forgot/forgot';
import { SignupPage } from '../pages/signup/signup';
import { SearchPage } from '../pages/search/search';
import { ChatlistPage } from '../pages/chatlist/chatlist';
import { ChatdetailsPage } from '../pages/chatdetails/chatdetails';
import { ProfilePage } from '../pages/profile/profile';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { TermsPage } from '../pages/terms/terms';
import { SettingsPage } from '../pages/settings/settings';
import { NewsfeedPage } from '../pages/newsfeed/newsfeed';
import { CategoriesPage } from '../pages/categories/categories';
import { LocationPage } from '../pages/location/location';
import { AddBusinessPage } from '../pages/add-business/add-business';
import { MembershipPage } from '../pages/membership/membership';
import { CategoryPage } from '../pages/category/category';
import { DetailsPage } from '../pages/details/details';
import { ClientPage } from '../pages/client/client';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AddclientPage } from '../pages/addclient/addclient';
import { PlaceorderPage } from '../pages/placeorder/placeorder';
import { NextvisitPage } from '../pages/nextvisit/nextvisit';
import { ProductlistPage } from '../pages/productlist/productlist';
import { AddclientinfoPage } from '../pages/addclientinfo/addclientinfo';
import { ProductPage } from '../pages/product/product';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { PivacyPage } from '../pages/pivacy/pivacy';
import { AboutPage } from '../pages/about/about';
import { NewsPage } from '../pages/news/news';
import { NewsDetailPage } from '../pages/news-detail/news-detail';
import { NotificationsPage } from '../pages/notifications/notifications';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { SalesNotePage } from '../pages/sales-note/sales-note';
import { SelectPage } from '../pages/select/select';
import { PaymentPage } from '../pages/payment/payment';
import { CoursePage } from '../pages/course/course';
import { QuizPage } from '../pages/quiz/quiz';
import { MycourcesPage } from '../pages/mycources/mycources';
import { HelpPage } from '../pages/help/help';
import { TeacherloginPage } from '../pages/teacherlogin/teacherlogin';
import { TeachersignupPage } from '../pages/teachersignup/teachersignup';
import { ApprovedPage } from '../pages/approved/approved';
import { AddcoursesPage } from '../pages/addcourses/addcourses';
import { TeacherhomePage } from '../pages/teacherhome/teacherhome';
import { TeacherprofilePage } from '../pages/teacherprofile/teacherprofile';
import { AddlessionPage } from '../pages/addlession/addlession';
import { AddquizPage } from '../pages/addquiz/addquiz';
import { MywalletPage } from '../pages/mywallet/mywallet';
import { ProfileteacherPage } from '../pages/profileteacher/profileteacher';
import { PromocodePage } from '../pages/promocode/promocode';
import { CourseSidebarPage } from '../pages/course-sidebar/course-sidebar';
import { QuizResultPage } from '../pages/quiz-result/quiz-result';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { TransactionPage } from '../pages/transaction/transaction';
import { Camera } from '@ionic-native/camera';

import { EmailFormPage } from '../pages/email-form/email-form';
import { DetailNextPage } from '../pages/detail-next/detail-next';
import { JoinPage } from '../pages/join/join';
import { AlmostdonePage } from '../pages/almostdone/almostdone';
import { ContactusPage } from '../pages/contactus/contactus';
import { WalletPage } from '../pages/wallet/wallet';
import { MycampaignPage } from '../pages/mycampaign/mycampaign';
import { PrivacyPage } from '../pages/privacy/privacy';
import { AutofillPlacesPage } from '../pages/autofill-places/autofill-places';
import { Keyboard } from '@ionic-native/keyboard';
import { RestApiProvider } from '../providers/rest-api/rest-api';
import { AuthProvider } from '../providers/auth/auth';
import { AlertProvider } from '../providers/alert/alert';
import { HttpClientModule } from '@angular/common/http';
import { CityListPage } from '../pages/city-list/city-list';
import { Facebook } from '@ionic-native/facebook';
import { FacebookProvider } from '../providers/facebook/facebook';
import { LoaderProvider } from '../providers/loader/loader';
import { VideoProvider } from '../providers/video/video';
import { VideoEditor } from '@ionic-native/video-editor';
import { File } from '@ionic-native/file';
import { BuyProvider } from '../providers/buy/buy';
import {SeenCardPage} from '../pages/seen-card/seen-card';
import {MyQuizPage} from '../pages/my-quiz/my-quiz';
import {QuizSuccessPage} from '../pages/quiz-success/quiz-success';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { IntoductionPage } from '../pages/intoduction/intoduction';
import { OnesignalProvider } from '../providers/onesignal/onesignal';
// import { Ionic3StarRatingComponent } from '../components/ionic3-star-rating/ionic3-star-rating';
import { OneSignal } from '@ionic-native/onesignal';
import { CustomKeypadPage } from '../pages/custom-keypad/custom-keypad';
import { DataStoreProvider } from '../providers/data-store/data-store';
// import { StarRatingModule } from 'ionic3-star-rating';





@NgModule({
  declarations: [
    MyApp,
    LocationPage,
    EmailFormPage,
    DetailNextPage, JoinPage, AlmostdonePage, ContactusPage, WalletPage, MycampaignPage, PrivacyPage,
    MembershipPage, ClientPage, AddclientPage, PlaceorderPage, NextvisitPage, ProductlistPage, AddclientinfoPage, NewsPage, NewsDetailPage, NotificationsPage, ForgotPasswordPage, SalesNotePage,
    ProductPage,
    ProductDetailPage,
    AboutPage,
    PivacyPage,
    CategoryPage,
    DetailsPage,
    AddBusinessPage,
    NewsfeedPage,
    CategoriesPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    ForgotPage,
    SearchPage,
    DetailsPage,
    ChatlistPage,
    ChatdetailsPage,
    ProfilePage,
    ChangepasswordPage,
    TermsPage, SelectPage, PaymentPage, CoursePage, QuizPage, MycourcesPage, HelpPage, TeacherloginPage, TeachersignupPage, ApprovedPage, TeacherhomePage, TeacherprofilePage, AddcoursesPage, AddquizPage, AddlessionPage, MywalletPage, ProfileteacherPage, PromocodePage, CourseSidebarPage, QuizResultPage, DashboardPage, TransactionPage,
    SettingsPage,
    AutofillPlacesPage,
    CityListPage,
    PaymentOptionPage,
    ThankyouPage,
    StudentListPage,
    PurchasedStudentListPage,
    SeenCardPage,
    MyQuizPage,
    QuizSuccessPage, IntoductionPage,
    CustomKeypadPage,
    // Ionic3StarRatingComponent
    // StarRatingModule
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(
      MyApp, {
        mode: "ios",
        backButtonText: ""
      }
    )],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage, LocationPage,
    AddBusinessPage,
    CategoryPage,
    EmailFormPage,
    DetailNextPage, JoinPage, AlmostdonePage, ContactusPage, WalletPage, MycampaignPage, PrivacyPage,
    DetailsPage, ClientPage, AddclientPage, PlaceorderPage, NextvisitPage, ProductlistPage, AddclientinfoPage, NewsPage, NewsDetailPage, NotificationsPage, ForgotPasswordPage, SalesNotePage,
    ProductPage,
    AboutPage,
    ProductDetailPage,
    PivacyPage,
    CategoriesPage,
    MembershipPage,
    NewsfeedPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    ForgotPage,
    SearchPage,
    DetailsPage,
    ChatlistPage,
    ChatdetailsPage,
    ChangepasswordPage,
    TermsPage, SelectPage, PaymentPage, CoursePage, QuizPage, MycourcesPage, HelpPage, TeacherloginPage, TeachersignupPage, ApprovedPage, TeacherhomePage, TeacherprofilePage, AddcoursesPage, AddquizPage, AddlessionPage, MywalletPage, ProfileteacherPage, PromocodePage, CourseSidebarPage, QuizResultPage, DashboardPage, TransactionPage,
    SettingsPage,
    AutofillPlacesPage,
    CityListPage,
    PaymentOptionPage,
    ThankyouPage,
    StudentListPage,
    PurchasedStudentListPage,
    SeenCardPage,
    MyQuizPage,
    QuizSuccessPage, IntoductionPage,
    CustomKeypadPage,
    // StarRatingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Keyboard,
    RestApiProvider,
    AuthProvider,
    AlertProvider,
    Facebook,
    FacebookProvider,
    LoaderProvider,
    Camera,
    ImageProvider,
    VideoProvider,
    VideoEditor,
    File,
    BuyProvider,
    YoutubeVideoPlayer,
    OnesignalProvider,
    OneSignal,
    DataStoreProvider,

  ]
})
export class AppModule { }
