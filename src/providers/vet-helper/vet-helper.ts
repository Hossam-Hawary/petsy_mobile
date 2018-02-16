import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database'
import * as GeoFire from 'geofire'

/*
  Generated class for the VetHelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VetHelperProvider {
	geoFire:any;

  constructor(
    private afDatabase:AngularFireDatabase) {
  	 let ref = this.afDatabase.list('/vets').query.ref
     this.geoFire =  new GeoFire(ref)
     console.log(this.geoFire.ref())
     // this.setVetLocation("vet_one",[37.79, -122.41]).then((data)=> console.log(data))
     this.getVetLocation("vet_one").then((data)=> console.log(data))
  }


  async getVetLocation(locationKey:string){
  	try{
  		return {success:true, data:await this.geoFire.get(locationKey)}
  	}catch(err){
  		return {success:false, error:err}
  	}
  }

  async setVetLocation(locationKey:string,coords:any[]){
  	try{
  		return {success:true, data:await this.geoFire.set(locationKey,coords)}
  	}catch(err){
  		return {success:false, error:err}
  	}
  }

  createQuery(senterCoords:any[],radius:number=10){ //KM
  	return this.geoFire.query({
		center: senterCoords,
		radius: radius
	});
  }

}
