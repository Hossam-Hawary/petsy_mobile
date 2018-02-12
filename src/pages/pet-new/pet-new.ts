import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Pet } from '../../models/pet'
import { UserProvider } from '../../providers/user/user'
import { HelperProvider } from '../../providers/helper/helper'
/**
 * Generated class for the PetNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pet-new',
  templateUrl: 'pet-new.html',
})
export class PetNewPage {
	pet:Pet = {} as Pet;
	photoType:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	 private userProvider:UserProvider, private helper:HelperProvider, private ViewCtrl:ViewController ) {
  }

	async takePhoto(){
	 	let photo = await this.helper.takePhoto();
		if (photo) {
			this.pet.photoUrl = photo;
			this.photoType = 'base64';
		}
	}

	addPet(){
 		this.userProvider.addPet(this.pet, this.photoType)
 		this.navCtrl.pop()
	}

	close(){
		this.ViewCtrl.dismiss()
	}
}
