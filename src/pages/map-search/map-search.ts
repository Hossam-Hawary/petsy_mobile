import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,Searchbar } from 'ionic-angular';
import {MapHelperProvider} from '../../providers/map-helper/map-helper'
import {
 GoogleMaps,
 GoogleMap,
} from '@ionic-native/google-maps';
/**
 * Generated class for the MapSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map-search',
  templateUrl: 'map-search.html',
})
export class MapSearchPage {
  @ViewChild('searchBar')searchBar:Searchbar;
	searchInput:string;
	searchResult:any =[]
	loadingResults:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private mapHelper:MapHelperProvider,private ViewCtrl:ViewController) {
  }

 async onSearchInput(ev){
  	if(!this.searchInput) return null;
  	this.loadingResults = true;
  	this.searchResult = await this.mapHelper.geoCode(this.searchInput)
  	console.log(this.searchResult)
  	this.loadingResults = false;
  }

  onSearchCancel(ev){
  }
  cloas(){
  	this.ViewCtrl.dismiss();
  }

  goToLocation(address){
  	this.ViewCtrl.dismiss({position:address.position});
  }
  ionViewDidLoad(){
    setTimeout(()=>this.searchBar.setFocus(),700) 
  }
  


}
