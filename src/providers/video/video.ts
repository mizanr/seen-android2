import { LoaderProvider } from './../loader/loader';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VideoEditor, CreateThumbnailOptions } from '@ionic-native/video-editor';

import { File, FileEntry } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
@Injectable()
export class VideoProvider {

  constructor(public http: HttpClient,
    public camera:Camera,
    public loading:LoaderProvider,
    private videoEditor: VideoEditor,
    private file:File,) {
    console.log('Hello VideoProvider Provider');
  }

  
  getVideoByGallery(){
    console.log("media provider");
    return new Promise((resolve, reject) => {
      if (Camera['installed']()) {
        this.camera.getPicture({
          
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          mediaType:this.camera.MediaType.VIDEO
      }).then(async (data) => {
        console.log('checking path for get video by gallery',data);
         if(data){
          let path = data.includes("file://") ? data : "file://" + data;
          console.log('checking path ',path);
          this.loading.show();
          var filename = data.substr(data.lastIndexOf('/') + 1);
          var dirpath = data.substr(0, data.lastIndexOf('/') + 1);

          dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;
          // try {
          //   var dirUrl = await this.file.resolveDirectoryUrl(dirpath);
          //   var retrievedFile = await this.file.getFile(dirUrl, filename, {});
            

          // } catch(err) {
          //   console.log('try error');
          //   this.loading.hide();
          //   return 0;//this.alert.s("Error","Something went wrong.");
          // }
          
          // retrievedFile.file( f => {
          //     this.loading.hide();
          //     console.log('retrieved file size:',f.size);
          //     console.log('retrieved file mime:',f.type);
          //     console.log("retrieve",f)
          //     // if (data.size > MAX_FILE_SIZE) return this.presentAlert("Error", "You cannot upload more than 5mb.");
          //     // if (data.type !== ALLOWED_MIME_TYPE) return this.presentAlert("Error", "Incorrect file type.");

          //     // this.selectedVideo = retrievedFile.nativeURL;
          // });
        // let path =  "file://"+data;
          this.readAsBlob(dirpath+filename).then((res)=>{
            if(res==0){
              this.loading.hide();
              resolve(0);
            }
            else{
              console.log("get blob successfull",res);
              this.getThumbByVideo(path).then((thmb:any)=>{
                this.loading.hide();
                    if(thmb==0){
                      resolve(0);
                    }
                    else{
                      resolve({thumb:thmb,video:res})
                    }

                      
              });
            }
          });
         }
         else{
           console.log('did not get any data');
         }

          
      }, (err) => {
        reject('Unable to take photo: ' + err);
      })
      }

    });
  }

  getThumbByVideo(filepath){
    console.log('getThumbByVideo',filepath);
    return new Promise((resolve) => {
    var option:CreateThumbnailOptions = {fileUri:filepath,width:300, height:300, atTime:1, outputFileName: 'thumb', quality:50 };
    this.videoEditor.createThumbnail(option).then(result=>{
       let thumbpath=this.file.externalDataDirectory+"files/videos/thumb.jpg";
       this.readAsBlob(thumbpath).then((res)=>{
        if(res==0){
     
          resolve(0);
        }
        else{
          console.log("get blob successfull",res);
          resolve(res);;
        }
      });  
    }).catch(e=>{
      console.log('thumb error', e);
     resolve(0);
    });
    })
  }

  
  readAsBlob(path){
    return new Promise((resolve, reject) => {
      console.log(path);
    this.file.resolveLocalFilesystemUrl(path)
    .then(entry => {
      (<FileEntry>entry).file(file =>{
        const reader = new FileReader();
        reader.onloadend = () => {
          const blob = new Blob([reader.result], {
            type: file.type
          });
          console.log("blob.....",blob);
          resolve({name:file.name,file:blob,preview:(<any>window).Ionic.WebView.convertFileSrc(path),path:path});
         // this.blob['name']=file.name;
         // this.blob['file']=blob;
        //  console.log("got blob file successfully", this.blob);
        };
        reader.readAsArrayBuffer(file);
      })
    })
    .catch(err => {
      console.log("localfilesytem resolve.....",err);
           resolve(0);
      });
    })
  }
}
