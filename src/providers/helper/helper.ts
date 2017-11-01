import { Injectable, NgZone } from '@angular/core';
import { LoadingController, ModalController, Platform} from 'ionic-angular';
import { Toast, ToastOptions } from '@ionic-native/toast';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { TranslateService } from '@ngx-translate/core';
import { Pro } from '@ionic/pro';





@Injectable()
export class HelperProvider {

	loader:any;
	connectionState:boolean;
  constructor(private loadingCntrl:LoadingController, 
  	private modalCtrl:ModalController, private toast:Toast, private socialSharing: SocialSharing,
  	private platform: Platform, private spinnerDialog: SpinnerDialog,
     private translateService: TranslateService, private zone:NgZone) {
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
          duration: 3000,
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
      this.createToast(this.translate('ERRORS.REQUEST'),'');
      Pro.getApp().monitoring.exception(err);
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
}
