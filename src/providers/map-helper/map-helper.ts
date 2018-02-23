import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {
 GoogleMapOptions,
HtmlInfoWindow
} from '@ionic-native/google-maps';
/*
  Generated class for the MapHelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MapHelperProvider {
mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

  constructor() {
    console.log('Hello MapHelperProvider Provider');
  }

  createHtmlInfoWindowContent(vet){
  	let content =`<img src="${vet.imgUrl}" style="height:50px;width:70px;margin:2px"><span style="color:#02acc9;font-size:18px">${vet.name}</span>
<span style="color:grey;margin:2px">${vet.address}</span><img src="assets/imgs/star.png" style="height:30px;width:120px;display:inline;margin:0px">`
  	let htmlInfoWindow = new HtmlInfoWindow
  	htmlInfoWindow.setContent(content,{})
  	return htmlInfoWindow
  }

}
