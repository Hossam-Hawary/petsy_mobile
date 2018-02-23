import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MapHelperProvider} from '../../providers/map-helper/map-helper'
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
	

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private googleMaps: GoogleMaps, private mapHelper:MapHelperProvider) {
  }
  loadMap() {

    this.map = this.googleMaps.create('map_canvas', this.mapHelper.mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.addMarkerOnMap({
              lat: 43.0741904,
              lng: -89.3809802
            })
 

      });
  }

	addMarkerOnMap(position){

		this.map.addMarker({
            title: 'Vet',
            // snippet:'lots of textgoes here.lots of textgoes here.lots of textgoes here.lots of textgoes here.lots of textgoes here. ',
            icon: '#02acc9',
            animation: 'DROP',
            position: position
          })

          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
              	let markerWindow = this.mapHelper.createHtmlInfoWindowContent({name:'Vetseeee Vetseeee', address:'alexandria, alexalexandria, alex', imgUrl:'https://petstockimages.blob.core.windows.net/petstockvet/petstock-vet-dog.png'})
              	markerWindow.on(GoogleMapsEvent.INFO_CLICK).subscribe(() => {console.log("clickkkkkkkkkkkkkkkkk")})
              	markerWindow.open(marker)
                
              });
        });
	}

  ionViewDidLoad(){
    this.loadMap();
  }

}
