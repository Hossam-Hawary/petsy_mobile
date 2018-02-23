import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { HelperProvider } from '../../providers/helper/helper'

/**
 * Generated class for the PaymentCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-card',
  templateUrl: 'payment-card.html',
})
export class PaymentCardPage {
  cardForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _fb: FormBuilder,
    private helper:HelperProvider) {
  }

  ngOnInit() {
    this.cardForm = this._fb.group({
      creditCard: ['',[Validators.required,Validators.minLength(14),Validators.maxLength(14)] ],
      name: ['',[Validators.required] ],
      expirationDate: ['', [Validators.required]],
      cvc: ['', [Validators.minLength(3),Validators.maxLength(4), Validators.required]] 
    });
  }
    pay(form) {
    console.log(form);
    this.helper.createAlert("you have successfully completed the signing up process and you will shortly receive a confirmation link on your email,after we check the submitted documents",
      "Done!","",false,[
        {
          text: 'Ok',
          handler: () => {this.navCtrl.popToRoot()}
        }
      ]).present()
  }

}
