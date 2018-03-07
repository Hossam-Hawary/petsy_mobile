import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  { HelperProvider } from '../../providers/helper/helper'


/**
 * Generated class for the VetProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vet-profile',
  templateUrl: 'vet-profile.html',
})
export class VetProfilePage {
	vet:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private helper:HelperProvider) {
  	this.vet = navParams.get('vet')
  }

  callVet(){
    this.helper.call(this.vet.phoneNumber)

  }

  mailVet(){
    this.helper.sendEmail(this.vet.email)
  }


}
