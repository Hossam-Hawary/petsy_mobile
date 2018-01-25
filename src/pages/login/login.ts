import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup} from '@angular/forms'
import { UserValidator } from  '../../validators/user-validator';
import { HomePage } from '../home/home'
import { UserProvider } from '../../providers/user/user'
import { HelperProvider } from '../../providers/helper/helper'
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	loginForm:FormGroup;
  errorMessage:string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public formBuilder: FormBuilder, private userProvider:UserProvider,
    private helper:HelperProvider) {
  }


 ngOnInit(){

    this.loginForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.maxLength(30), Validators.required, UserValidator.emailValidator])],
        password: ['', Validators.compose([Validators.minLength(6),Validators.maxLength(30), Validators.required, UserValidator.passwordValidator])]
    });
 }

 async login(){
    this.helper.showSpinner()
 	  console.log(this.loginForm.value)
    this.errorMessage = "";
    const result:any = await this.userProvider.login(this.loginForm.value)
    console.log("login", result)
    if(result.success){ 
      this.userProvider.setUid(result.data.uid)
      this.navCtrl.setRoot(HomePage)
    }else{
      this.errorMessage = result.errorMessage;
    }
    this.helper.hideSpinner();
 }

 signUp(){
   this.navCtrl.setRoot('SignUpPage')
 }
 skipLogin(){
   this.navCtrl.setRoot(HomePage)
 }

}
