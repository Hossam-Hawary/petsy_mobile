import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pet } from '../../models/pet'

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
	pets:Pet[]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

 addNewPet(){
 	this.navCtrl.push('PetNewPage')
 }

}
