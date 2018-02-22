import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
	vets:any[] = [
	{name:'Vetseee', imgUrl:'', address:'Alexandria'},
	{name:'Vetseee', imgUrl:'', address:'Cairo'},
	{name:'Vetseee', imgUrl:'', address:'Alex'},
	{name:'Vetseee', imgUrl:'', address:'Giza'},
	{name:'Vetseee', imgUrl:'', address:'Luxor'},
	{name:'Vetseee', imgUrl:'', address:'Mansoura'},
	{name:'Vetseee', imgUrl:'', address:'Tripoli'},
	{name:'Vetseee', imgUrl:'', address:'Zahlé'},
	{name:'Vetseee', imgUrl:'', address:'Sidon'},
	{name:'Vetseee', imgUrl:'', address:'Riyadh'},
	{name:'Vetseee', imgUrl:'', address:'Mecca'},
	{name:'Vetseee', imgUrl:'', address:'Dubai'},
	]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VetListPage');
  }
  showVet(vet){
  	
  }

}
