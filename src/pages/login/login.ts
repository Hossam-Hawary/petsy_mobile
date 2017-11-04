import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup} from '@angular/forms'
import { UserValidator } from  '../../validators/user-validator';
import { HomePage } from '../home/home'
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public formBuilder: FormBuilder) {
  }


 ngOnInit(){

    this.loginForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.maxLength(30), Validators.required, UserValidator.emailValidator])],
        password: ['', Validators.compose([Validators.minLength(6),Validators.maxLength(30), Validators.required, UserValidator.passwordValidator])]
    });
 }

 login(){
 	console.log(this.loginForm.value)
   this.navCtrl.setRoot(HomePage)
 }
 signUp(){
   this.navCtrl.setRoot('SignUpPage')
 }
 skipLogin(){
   this.navCtrl.setRoot(HomePage)
 }

}
