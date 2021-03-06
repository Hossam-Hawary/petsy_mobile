import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup} from '@angular/forms'
import { UserValidator } from  '../../validators/user-validator';
import { HomePage } from '../home/home'
import { UserProvider } from '../../providers/user/user'
import { HelperProvider } from '../../providers/helper/helper'
/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
	signupForm:FormGroup
  errorMessage:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	 public formBuilder: FormBuilder, private userProvider:UserProvider,
     private helper:HelperProvider) {
  }

 ngOnInit(){

    this.signupForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.maxLength(50), Validators.required, UserValidator.emailValidator])],
        password: ['', Validators.compose([Validators.required, UserValidator.passwordValidator])]
    });
 }

 async register(){
   this.helper.showSpinner()
    this.errorMessage = "";
    const result:any = await this.userProvider.register(this.signupForm.value);
    console.log("register", result)
     if(result.success){ 
        this.userProvider.setAuth(result.data);
        this.navCtrl.setRoot('CompleteProfilePage');
     }else{
       this.errorMessage = result.errorMessage;
     }
     this.helper.hideSpinner();
   }

 login(){
   this.navCtrl.setRoot('LoginPage')
 }
  skipLogin(){
   this.navCtrl.setRoot(HomePage)
 }
}
