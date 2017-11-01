import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup} from '@angular/forms'
import { UserValidator } from  '../../validators/user-validator';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	 public formBuilder: FormBuilder) {
  }

 ngOnInit(){

    this.signupForm = this.formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        email: ['', Validators.compose([Validators.maxLength(30), Validators.required, UserValidator.emailValidator])],
        password: ['', Validators.compose([Validators.minLength(6),Validators.maxLength(30), Validators.required, UserValidator.passwordValidator])]
    });
 }

 save(){
 	console.log(this.signupForm.value)
 }
}
