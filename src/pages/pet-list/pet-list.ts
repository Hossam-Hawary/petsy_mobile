import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pet } from '../../models/pet'
import { UserProvider } from '../../providers/user/user'
import { HelperProvider } from '../../providers/helper/helper'
import { AngularFireList } from 'angularfire2/database';


/**
 * Generated class for the PetListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pet-list',
  templateUrl: 'pet-list.html',
})
export class PetListPage {
	pets:AngularFireList<Pet[]>

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private helper:HelperProvider, private userProvider:UserProvider) {
  	this.getPets()
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
