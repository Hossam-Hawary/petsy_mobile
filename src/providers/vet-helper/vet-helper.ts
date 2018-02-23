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



vets:any[] = [
  {name:'Vetseeee', address:'15-Cairo-AlexCairo-Alex,St.',location:{lat:43.0741314,lng:-89.3809802}, imgUrl:'https://petstockimages.blob.core.windows.net/petstockvet/petstock-vet-dog.png'},
  {name:'Vetseeee', address:'16-Cairo-AlexCairo-Alex,St.',location:{lat:43.0743824,lng:-89.3805212},imgUrl:'https://petstockimages.blob.core.windows.net/petstockvet/petstock-vet-dog.png'},
  {name:'Vetseeee', address:'17-Cairo-AlexCairo-Alex,St.',location:{lat:43.0746934,lng:-89.3809322},imgUrl:'https://petstockimages.blob.core.windows.net/petstockvet/petstock-vet-dog.png'},
  {name:'Vetseeee', address:'18-Cairo-AleCairo-Alexx,St.',location:{lat:43.0741644,lng:-89.3803632},imgUrl:'https://petstockimages.blob.core.windows.net/petstockvet/petstock-vet-dog.png'},
  {name:'Vetseeee', address:'19-Cairo-AlexCairo-Alex,St.',location:{lat:43.0749754,lng:-89.3807442},imgUrl:'https://petstockimages.blob.core.windows.net/petstockvet/petstock-vet-dog.png'},
]
  constructor(
    private afDatabase:AngularFireDatabase) {
  	 let ref = this.afDatabase.list('/vets').query.ref
     this.geoFire =  new GeoFire(ref)
     console.log(this.geoFire.ref())
     // this.setVetLocation("vet_one",[37.79, -122.41]).then((data)=> console.log(data))
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

  async loadVets(){
    return this.vets;
  }

}
