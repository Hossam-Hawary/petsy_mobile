import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {
 GoogleMapOptions,
HtmlInfoWindow,
Geocoder,
GeocoderRequest,
CameraPosition
} from '@ionic-native/google-maps';
/*
  Generated class for the MapHelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MapHelperProvider {
	defaultCameraPosition:CameraPosition ={
		zoom:17,
		tilt: 30,
		duration:1000,
		target: {
          lat: 31.2000924,
          lng: 29.9187387
        }

	}

	mapOptions: GoogleMapOptions = {
	      camera:{         
          zoom:12,
          tilt: 30,
          duration:1000,
          target: {
                lat: 31.2000924,
                lng: 29.9187387
          }
        }
	};

  constructor() {
    console.log('Hello MapHelperProvider Provider');
  }

  createHtmlInfoWindowContent(vet){
  	let content =`<img (click)="console.log('ffffff") src="${vet.imgUrl}" style="height:50px;width:70px;margin:2px"><span style="color:#02acc9;font-size:18px">${vet.name}</span>
<span style="color:grey;margin:2px">${vet.address}</span>
<img src="assets/imgs/star.png" style="height:30px;width:120px;margin:0px">`
  	let htmlInfoWindow = new HtmlInfoWindow
  	htmlInfoWindow.setContent(content,{})
  	return htmlInfoWindow
  }

  async geoCode(searchKey){
  	let request: GeocoderRequest= {}
  	request.address = searchKey
  	return await Geocoder.geocode(request)
  }

}
