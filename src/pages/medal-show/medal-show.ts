import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MedalShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medal-show',
  templateUrl: 'medal-show.html',
})
export class MedalShowPage {
	medal:any;

  constructor(public navCtrl: NavController, navParams: NavParams) {
  	this.medal = navParams.get('medal')
  }
  
  addMedal(){

  }



}
