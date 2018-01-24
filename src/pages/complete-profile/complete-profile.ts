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
   constructor(public navCtrl: NavController, public navParams: NavParams,
  	 public formBuilder: FormBuilder, private userProvider:UserProvider,
     private helper:HelperProvider) {
  }

 ngOnInit(){

    this.profileForm = this.formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        username: ['', Validators.compose([Validators.maxLength(30),Validators.pattern('[a-z]*'), Validators.required])],
    });
 }


  createProfile(){
 	 this.userProvider.createProfile(this.profileForm.value).then(result=>{
 	 	console.log(result)
 	 	this.navCtrl.setRoot(HomePage)
 	 })
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompleteProfilePage');
  }

}
