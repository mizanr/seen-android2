import { ImageProvider } from "./../../providers/image/image";
import { AuthProvider } from "./../../providers/auth/auth";
import { RestApiProvider } from "./../../providers/rest-api/rest-api";
import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import { VideoProvider } from "../../providers/video/video";
import { AlertProvider } from "../../providers/alert/alert";
import { DataStoreProvider } from "../../providers/data-store/data-store";
import { CoursePage } from "../course/course";

@Component({
  selector: "page-addlession",
  templateUrl: "addlession.html"
})
export class AddlessionPage {
  formData = {
    lession_image: "",
    lession_name: "",
    youtube_link: "",
    chapter_id: "",
    lession_video: "",
    lession_description: "",
    video_thumbnail:'',
  };
  blob_img: any = null;
  blobimageName: any = "";
  chapterList: any;
  vdoRes: any = "";
  lesson: any = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public restApi: RestApiProvider,
    public auth: AuthProvider,
    public video: VideoProvider,
    public dataP:DataStoreProvider,
    public alertP:AlertProvider,
    public imageP: ImageProvider
  ) {
    this.lesson = navParams.get("Lesson");
    if(this.lesson){
      this.formData=navParams.get("Lesson");
    }

    this.getChapter();
    console.log(this.lesson);
    
  }

  getChapter() {
    this.restApi.get({}, 0, "get_chapters").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.chapterList = result.data;
        this.dataP.chapterList = result.data;
      } else {
      }
    });
  }

  getVideo() {
    this.video.getVideoByGallery().then((res1: any) => {
      if (res1 != 0) {
        // this.sendThumb(res1);
        console.log("res1=-=-=-=-=-=-=-=-=-=-=-=", res1);
        this.vdoRes = res1;
        this.formData.lession_video=this.vdoRes.video.preview;
        this.formData.video_thumbnail=this.vdoRes.thumb.preview;
      } else {
        alert("اضافة اختبار");
      }
    });
  }

  getImage() {
    this.imageP.getImage().then((img: any) => {
      console.log();
      this.blob_img = this.imageP.imgURItoBlob(img);

      this.blobimageName = this.imageP.generateImageName("hello.jpg");
      this.formData.lession_image = img;
    });
  }

  add() {
    console.log(this.vdoRes);
    if (!this.vdoRes) {
      this.alertP.show('رفع فيديو', 'الرجاء تحميل الفيديو.');
      return;
    }
    let Data = {
      teacher_id: { value: this.auth.getCurrentUserId(), type: "NO" },
      course_id: { value: this.navParams.get("CourseId"), type: "NO" },
      chapter_id: { value: this.formData.chapter_id, type: "CHAPTER" },
      lession_name: { value: this.formData.lession_name, type: "LNAME" },
      // youtube_link: { value: this.formData.youtube_link, type: "YOUTUBE" },
      lession_description: {
        value: this.formData.lession_description,
        type: "DESC"
      },
      lession_image: {
        value: this.blob_img,
        type: "NO",
        name: this.blobimageName
      }
    };
    if(this.formData.youtube_link){
      Data["youtube_link"]={ value: this.formData.youtube_link, type: "YOUTUBE" }
    }
    if (this.vdoRes) {
      Data["video_thumbnail"] = {
        value: this.vdoRes.thumb.file,
        type: "IMAGE",
        name: this.vdoRes.thumb.name
      };
      Data["lession_video"] = {
        value: this.vdoRes.video.file,
        type: "IMAGE",
        name: this.vdoRes.video.name
      };
    }

    this.restApi.postData(Data, 1, "add_lession").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.viewCtrl.dismiss(result.data.lession_id);
        // setTimeout(() => {
        //   this.navCtrl.push(CoursePage, { LessonId: result.data.lession_id });          
        // }, 200);
      } else {
        // this.alertP.show("Alert!", result.message);
      }
    });
  }

  update() {
    console.log(this.vdoRes);

    let Data = {
      teacher_id: { value: this.auth.getCurrentUserId(), type: "NO" },
      lession_id: { value:this.navParams.get("Lesson").lession_id, type: "NO" },
      course_id: { value:  this.lesson.course_id, type: "NO" },
      chapter_id: { value: this.formData.chapter_id, type: "CHAPTER" },
      lession_name: { value: this.formData.lession_name, type: "LNAME" },
      // youtube_link: { value: this.formData.youtube_link, type: "YOUTUBE" },
      lession_description: {
        value: this.formData.lession_description,
        type: "DESC"
      }
    };
    if(this.formData.youtube_link){
      Data["youtube_link"]={ value: this.formData.youtube_link, type: "NO" }
    }
    if (this.vdoRes) {
      Data["video_thumbnail"] = {
        value: this.vdoRes.thumb.file,
        type: "IMAGE",
        name: this.vdoRes.thumb.name
      };
      Data["lession_video"] = {
        value: this.vdoRes.video.file,
        type: "IMAGE",
        name: this.vdoRes.video.name
      };
    }
    if (this.blob_img) {
      Data["lession_image"] = {
        value: this.blob_img,
        type: "NO",
        name: this.blobimageName
      };
    }

    this.restApi.postData(Data, 1, "edit_lession").then((result: any) => {
      console.log(result);
      if (result.status == 1) {
        this.viewCtrl.dismiss(true);
      } else {
        // this.alertP.show("Alert!", result.message);
      }
    });
  }
}
