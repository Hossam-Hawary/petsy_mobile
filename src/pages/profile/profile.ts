import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user'
import { HelperProvider } from '../../providers/helper/helper'
import { AngularFireObject, AngularFireList} from 'angularfire2/database';
import { Pet } from '../../models/pet'

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
	profile:AngularFireObject<any>;
  pets:AngularFireList<Pet[]>
  activeView:string='pets';

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private helper:HelperProvider, private userProvider:UserProvider) {
  	this.auth = this.userProvider.currentUser();
  	this.getProfile()
    this.getPets()
  }

	 getProfile(){
		const result:any  =  this.userProvider.loadProfie()
		if(result.success) this.profile = result.data
	}

  listMedals(){
    this.navCtrl.push('MedalsListPage')
  }

  addNewPet(){
     this.helper.createModal('PetNewPage').present()
   }
  getPets(){ 
    const result:any  =  this.userProvider.loadUserPets()
    if(result.success) this.pets = result.data
  }
  showPet(pet){
    this.navCtrl.push('PetDetailsPage',{pet:pet})
  }

}
