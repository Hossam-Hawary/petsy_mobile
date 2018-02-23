import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MapHelperProvider} from '../../providers/map-helper/map-helper'
import {VetHelperProvider} from '../../providers/vet-helper/vet-helper'
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 HtmlInfoWindow,
 Marker
} from '@ionic-native/google-maps';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
	map: GoogleMap;
	vets:any[];
	searchInput:string;
	vetSelected:any;
	

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private googleMaps: GoogleMaps, private mapHelper:MapHelperProvider, private vetHelper:VetHelperProvider) {
  }
  loadMap() {

    this.map = this.googleMaps.create('map_canvas', this.mapHelper.mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.loadVetsOnMap();
      });
  }

	  async loadVetsOnMap(){
	  	this.vets =  await this.vetHelper.loadVets();
	  	for (let vet of this.vets){
	  		this.addVetMarkerOnMap(vet)
	  	}
	  }

	addVetMarkerOnMap(vet){

		this.map.addMarker({
            // title: 'Vet',
            // snippet:'lots of textgoes here.lots of textgoes here.lots of textgoes here.lots of textgoes here.lots of textgoes here. ',
            icon: '#02acc9',
            animation: 'DROP',
            position: vet.location
          })

          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
              	this.vetSelected = vet;
              	let markerWindow = this.mapHelper.createHtmlInfoWindowContent(vet)
              	markerWindow.open(marker)                
              });
        });
	}

  ionViewDidLoad(){
    this.loadMap();
  }
  hideVetCard(){
  	this.vetSelected = null;
  }
  onSearchInput(ev){
  	console.log(ev)
  }
  onSearchCancel(ev){
  	console.log(ev)
  }


}
