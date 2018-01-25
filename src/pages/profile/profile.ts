import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user'
import { HelperProvider } from '../../providers/helper/helper'
// import { FirebaseObjectObservable } from 'angularfire2/database'

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
	auth:any;
	profile:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private helper:HelperProvider, private userProvider:UserProvider) {
  	this.auth = this.userProvider.currentUser();
  	this.getProfile()
  }
	 getProfile(){
		const result:any  =  this.userProvider.loadProfie()
		if(result.success) this.profile = result.data
	}


}
