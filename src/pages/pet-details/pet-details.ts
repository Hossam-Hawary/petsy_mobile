import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pet } from '../../models/pet'


@IonicPage()
@Component({
  selector: 'page-pet-details',
  templateUrl: 'pet-details.html',
})
export class PetDetailsPage {
	pet:Pet

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.pet = navParams.get('pet')
  	
  }


}
