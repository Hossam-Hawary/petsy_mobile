import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {VetHelperProvider} from '../../providers/vet-helper/vet-helper'

/**
 * Generated class for the VetListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vet-list',
  templateUrl: 'vet-list.html',
})
export class VetListPage {
	vets:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private vetHelper:VetHelperProvider) {
  	// this.vets = this.navParams.get('vets')
  	this.loadVets();
  }

async loadVets(){
	this.vets =  await this.vetHelper.loadVets();
}

showVet(vet){
    this.navCtrl.push('VetProfilePage',{vet:vet}) 
}

}
