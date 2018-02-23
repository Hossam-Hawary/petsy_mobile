import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {VetHelperProvider} from '../../providers/vet-helper/vet-helper'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	cates:any=[
	{name:'Lost & Found'},
	{name:'Vet Locator' , icon:'vet.png'},
	{name:'Mating Services'},
	{name:'Marketplace'},
	{name:'Adoption'},
	{name:'Pet Tracking'},
	{name:'Tips'},
	{name:'Q & A'},
	{name:'Q & A'},
	{name:'Q & A'},

	]

  constructor(public navCtrl: NavController, vetHelper:VetHelperProvider) {

  }
  openCate(cate){
  	this.navCtrl.push('MapPage')

  }

}
