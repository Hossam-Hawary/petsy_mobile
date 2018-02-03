import { Injectable, NgZone } from '@angular/core';
import { LoadingController, ModalController, Platform, normalizeURL} from 'ionic-angular';
import { Toast, ToastOptions } from '@ionic-native/toast';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { TranslateService } from '@ngx-translate/core';
import { Pro } from '@ionic/pro';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';




@Injectable()
export class HelperProvider {

	loader:any;
	connectionState:boolean;
  constructor(private loadingCntrl:LoadingController,
  	private modalCtrl:ModalController, private toast:Toast, private socialSharing: SocialSharing,
  	private platform: Platform, private spinnerDialog: SpinnerDialog,private camera:Camera,
     private translateService: TranslateService, private imgPicker:ImagePicker,private zone:NgZone,
     private file: File) {
  }

    showSpinner(){
        if (!this.platform.is('cordova')) {this.showLoader(); return} ;
        this.platform.ready().then(() => {
        	this.spinnerDialog.show();
        });
    }

    hideSpinner(){
      if (!this.platform.is('cordova')) {this.hideLoader(); return} ;
    	this.spinnerDialog.hide();
    }
    showLoader() {
       this.loader = this.loadingCntrl.create({
          showBackdrop:true
        });
       this.loader.present();
    }

    hideLoader(){
      if(this.loader) {
        this.loader.dismiss();
        this.loader = null;
      }
    }

    createToast(message:string,closeButtonText?:string,position?:string){
      this.hideSpinner();
      if (!this.platform.is('cordova')){console.log(message);return ;} 
      if (!message) return ;
      this.platform.ready().then(() => {
        let toastOptions: ToastOptions = {
          message:message,
          duration: 5000,
          position: position || 'bottom'
         };
        this.toast.showWithOptions(toastOptions).subscribe();
      });
    }

    createModal(page, data?,options={}){
      let modal = this.modalCtrl.create(page,data, options );
      return modal;
    }
    changeConnection(status:boolean){
      this.connectionState = status;
      if(!status) this.displayConnectionError();
    }

    isConnected(){
      return this.connectionState;
    }

     displayConnectionError(posision?){
      this.createToast(this.translate('ERRORS.OFFLINE'),'',posision);
    }

    translate(key:string, params?){
      return this.translateService.instant(key, params)
    }

    handleRequestError(err){
      let msg = err.error? JSON.parse(err.error):{}
      msg = msg.error_messages ? msg.error_messages.join(', '):this.translate('ERRORS.REQUEST');
      this.createToast(msg)
      // Pro.getApp().monitoring.exception(err);
    }

    runZone(callBack?){
      this.zone.run(()=>{
       if(callBack) callBack();
      })
    }

     share(url, message, subject){
     if (!this.platform.is('cordova')) return ;
     this.platform.ready().then(() => {
       let options={
         message: message,
         subject: subject,
         url: url,
         chooserTitle:''

       }
       this.socialSharing.shareWithOptions(options)
     });
   }

   async takePhoto(){
     try{

     const options: CameraOptions = {
        quality: 100, //0-100
        targetWidth:700, //px
        targetHeight:700, //px
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.PNG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation:true,
        cameraDirection:this.camera.Direction.FRONT,
        saveToPhotoAlbum:false,
        allowEdit:true
      }
       const imageData =  await this.camera.getPicture(options)
      return  'data:image/png;base64,' + imageData;
     }
     catch(err){
        return  null;
     }
   }
   async uploadImage(options={maximumImagesCount:1}){
     try{
       const hasPermession = await this.imgPicker.hasReadPermission()
       if(!hasPermession) return {success:false, message:this.translate('ERRORS.PERMISSION_DENIED')}
       const fileUris = await this.imgPicker.getPictures(options)
       if(fileUris && fileUris != "OK" && fileUris.length){
          return {success:true,fileUri:normalizeURL(fileUris[0])}
       }else{
          return {success:false}
       }

     }catch(err){
       return {success:false,error:err}
     }
   }

  async resolveFileUriToBuffer(entry){
    let dirPath = entry.nativeURL;
    let dirPathSeg = dirPath.split("/")
    dirPathSeg.pop();
    dirPath = dirPathSeg.join("/")
    return await this.file.readAsArrayBuffer(dirPath,entry.name)
  }

}
