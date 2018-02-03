import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	 private userProvider:UserProvider, private helper:HelperProvider ) {
  }

	async takePhoto(){
	 	let photo = await this.helper.takePhoto();
		if (photo) {
			this.helper.showSpinner();
			const result:any = await this.userProvider.uploadPetPhotoToStorage(photo, this.pet.name + Date.now().toString())
			console.log("data",result)
			if (result.success) this.pet.photoUrl = result.data.downloadURL;
			this.helper.hideSpinner();
		}
	}
	async uploadPhoto(){
		const result:any = await this.helper.uploadImage()
		if(result.message) this.helper.createToast(result.message)
		if(result.success){
			this.pet.photoUrl = result.fileUri
		} 			
	}

	addPet(){
 		this.userProvider.addPet(this.pet)
 		this.navCtrl.pop()
	}
}
