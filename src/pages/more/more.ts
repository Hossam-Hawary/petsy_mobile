import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user'

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {
	auth:any;
   items = [
      { title: 'My Pets', component: 'PetListPage',icon:"",class:"fa fa-paw" },
    ];
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private userHelper:UserProvider, private appCtrl:App) {
  	this.auth = this.userHelper.currentUser();

  }

  openPage(item){
  	this.navCtrl.push(item.component);
  }

  logout(){
  	this.appCtrl.getRootNav().setRoot('LoginPage')
  	this.userHelper.signOut()
  }

  signUp(){
  	this.navCtrl.push('SignUpPage')
  }

}
