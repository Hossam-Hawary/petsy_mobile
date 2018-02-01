import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup} from '@angular/forms'
import { HomePage } from '../home/home'
import { UserProvider } from '../../providers/user/user'
import { HelperProvider } from '../../providers/helper/helper'
import { UserValidator } from  '../../validators/user-validator';

/**
 * Generated class for the CompleteProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-complete-profile',
  templateUrl: 'complete-profile.html',
})
export class CompleteProfilePage {
	profileForm:FormGroup
   	errorMessage:string;
   	imgSrc:string;
   constructor(public navCtrl: NavController, public navParams: NavParams,
  	 public formBuilder: FormBuilder, private userProvider:UserProvider,
     private helper:HelperProvider) {
  }

 ngOnInit(){

    this.profileForm = this.formBuilder.group({
        name: ['', Validators.compose([UserValidator.fullnameValidator, Validators.required])],
        username: ['', Validators.compose([UserValidator.usernameValidator, Validators.required])],
        img: [''],
        phoneNumber:['', Validators.compose([Validators.pattern('[0-9]{11}'), Validators.required])]
    });
 }
	async takePhoto(){
		let photo = await this.helper.takePhoto();
		if (photo) {
			this.helper.showSpinner();
			const result:any = await this.userProvider.uploadPhotoToStorage(photo)
			console.log("data",result)
			if (result.success) this.imgSrc = result.data.downloadURL;
      this.profileForm.controls.img.setValue(this.imgSrc)
			this.helper.hideSpinner();
		}
	}

 async createProfile(){
 	this.helper.showSpinner();
   this.userProvider.afAuth.authState.take(1).subscribe( async (auth)=>{
    console.log("auth..uid....",auth )
    if(auth) {
      try {       
      await auth.updateProfile({
        displayName: this.profileForm.value.name,
        photoURL:this.imgSrc
      })
      auth.sendEmailVerification();
      this.helper.hideSpinner();
      this.navCtrl.setRoot(HomePage)
      }catch(err){
        this.helper.hideSpinner();
      }
    }
  })
 	this.userProvider.createProfile(this.profileForm.value)
 }


}
