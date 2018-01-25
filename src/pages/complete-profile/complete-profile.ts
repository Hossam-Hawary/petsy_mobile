import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup} from '@angular/forms'
import { UserValidator } from  '../../validators/user-validator';
import { HomePage } from '../home/home'
import { UserProvider } from '../../providers/user/user'
import { HelperProvider } from '../../providers/helper/helper'

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
        name: ['', Validators.compose([Validators.minLength(3),Validators.maxLength(30), Validators.pattern('[a-zA-Z]{3}[ ]*[a-zA-Z ]*'), Validators.required])],
        username: ['', Validators.compose([Validators.minLength(3),Validators.maxLength(30),Validators.pattern('[a-zA-Z]*'), Validators.required])],
        img: ['']
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
 	const result:any = await this.userProvider.createProfile(this.profileForm.value)
 	console.log(result)
 	this.helper.hideSpinner();
 	if (result.success) this.navCtrl.setRoot(HomePage)
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompleteProfilePage');
  }

}
