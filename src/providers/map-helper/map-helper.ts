import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {
 GoogleMapOptions,
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
	defaultCameraPosition:CameraPosition<any> ={
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
          bearing:20,
          target: {
                lat: 31.2000924,
                lng: 29.9187387
          }
        }
	};

  constructor() {
  }


  async geoCode(searchKey){
  	let request: GeocoderRequest= {}
    request.address = searchKey
  	return await Geocoder.geocode(request)
  }

}
