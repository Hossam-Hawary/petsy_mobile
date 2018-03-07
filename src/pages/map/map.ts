import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MapHelperProvider} from '../../providers/map-helper/map-helper'
import {VetHelperProvider} from '../../providers/vet-helper/vet-helper'
import {HelperProvider} from '../../providers/helper/helper'

import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 Circle
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
	vetSelected:any;
  myLocationCircle:Circle;

	

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private googleMaps: GoogleMaps, private mapHelper:MapHelperProvider, private vetHelper:VetHelperProvider,
  	private helper:HelperProvider) {
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

  hideVetCard(){
    this.vetSelected = null;
  }
  openSearch(){
    let modal = this.helper.createModal('MapSearchPage')
    modal.onDidDismiss((data)=>{
      if(!data) return;
      let cameraPosition = this.mapHelper.defaultCameraPosition;
      cameraPosition.target = data.position
      this.map.animateCamera(cameraPosition)
    })
    modal.present();
  }

  async createOrUpdateMylocation(){
    let myLocation = await this.map.getMyLocation();
    if(this.myLocationCircle){this.myLocationCircle.setCenter(myLocation.latLng);return;}

     this.myLocationCircle = await this.map.addCircle({
      center:myLocation.latLng,
      radius:20,
      strokeColor:'#02acc9',
      fillColor:'#02acc9',
      strokeWidth:2,
    })
  }

   async getMyLocation(){
     try{
      await this.createOrUpdateMylocation();
      let cameraPosition = this.mapHelper.defaultCameraPosition;
      cameraPosition.target = this.myLocationCircle.getCenter();
      this.map.animateCamera(cameraPosition)
    // this.map.animateCameraZoomIn()
     }catch(err){
       console.log("err",err)
       this.helper.createAlert("We couldn't get your location, make sure your device's location is turned on then try again","Enable Location").present()
     }
  }

  showVet(vet){
    this.navCtrl.push('VetProfilePage',{vet:this.vetSelected})
  }

  ionViewDidLoad(){
    this.loadMap();
  }
}
