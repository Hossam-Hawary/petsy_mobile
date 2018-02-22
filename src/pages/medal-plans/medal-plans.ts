import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MedalPlansPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medal-plans',
  templateUrl: 'medal-plans.html',
})
export class MedalPlansPage {
selectedPlan:string = 'monthly';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


selectPlan(){
	this.navCtrl.push('PaymentCardPage')
}
}
