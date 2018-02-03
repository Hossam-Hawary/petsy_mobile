import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database'
import { HelperProvider } from '../../providers/helper/helper'
import { storage } from 'firebase'
import { File } from '@ionic-native/file';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const  ObjecttoParams = function(obj, key?: any) {
  let p = [];

  for (let k in obj) {
    let d_key = key ? key+'['+k+']' : k;
    // p.push(d_key + '=' + encodeURIComponent(obj[k]));
     p.push(d_key + '=' + obj[k]);
  }

  return p.join('&');
}

@Injectable()
export class UserProvider {
  auth:any;
  constructor( private apiProvider:ApiProvider, public afAuth:AngularFireAuth,
    private afDatabase:AngularFireDatabase, private helper:HelperProvider, private file: File) {
      this.afAuth.authState.subscribe(  (auth)=>{
        if(auth) {
          this.setAuth(auth)
        }
      })
  }

  setAuth(auth){
    this.auth = auth;
  }

  currentUser(){
    return this.auth;
  }

  loginUser(userData){
  	let body = ObjecttoParams(userData,'user')
  	return this.apiProvider.post('authenticate/',body)
  }


  async login(userData:any){
    try
    {
      return  { success:true, data: await this.afAuth.auth.signInWithEmailAndPassword(userData.email,userData.password)}
    }
    catch(err){
      return { success:false, errorMessage: this.getFirebaseErrorMessage(err)}
    }

      
  }

  async register(userData:any){
    try
    {
      return { success:true, data:await this.afAuth.auth.createUserWithEmailAndPassword(userData.email,userData.password)}
    }
    catch(err){
      return { success:false, errorMessage: this.getFirebaseErrorMessage(err)}
    }
  }
   async createProfile(profileData){
    if(!this.auth) return false;
    profileData.email = this.auth.email;
    try{
        return { success:true, data: await this.afDatabase.object(`${this.auth.uid}/profile`).set(profileData)}
     }
     catch(err){
        return {success:false, error:err};
     }
  }


    loadProfie(){
    if(!this.auth) return false;
    try{
        return { success:true, data:  this.afDatabase.object(`${this.auth.uid}/profile`).valueChanges()}
     }
     catch(err){
        return {success:false, error:err};
     }
   }

   loadUserPets(){
    if(!this.auth) return false;
    try{
        return { success:true, data:   this.afDatabase.list(`${this.auth.uid}/pets`).valueChanges()}
     }
     catch(err){
        return {success:false, error:err};
     }
   }

  async addPet(petData, photoType?){
      if(!this.auth) return false;
      this.helper.showSpinner();
      let photoResult:any = await this.uploadPetPhoto(petData.photoUrl, petData.name, photoType)
      petData.photoUrl = null
      if(photoResult.success)petData.photoUrl = photoResult.data.downloadURL
      try{
        const result = await this.afDatabase.list(`${this.auth.uid}/pets`).push(petData)
        this.helper.hideSpinner();
        console.log("pet result", result)
          return { success:true, data:result }
       }
       catch(err){
          this.helper.hideSpinner();
          return {success:false, error:err};
       }

  }
  async uploadPetPhoto(photo, name,photoType){
    
      if(photoType == 'systemUri'){
        return await this.uploadPetLocalPhotoToStorage(photo,name)        
      }else if(photoType == 'base64'){
        return await this.uploadPetPhotoToStorage(photo,name)
      } 
  }

  async uploadPhotoToStorage(photo){
    if(!this.auth) return false;
      try{
        const pictures = storage().ref(`images/${this.auth.uid}/photos/profile`)
        return{ success:true,data: await pictures.putString(photo,'data_url')}
      }
      catch(err){
        return {success:false, error:err};
      }
  }

  async uploadPetLocalPhotoToStorage(fileUri, name?){
    const entry = await this.file.resolveLocalFilesystemUrl(fileUri)
    const buffer = await this.helper.resolveFileUriToBuffer(entry) 
    let blob = new Blob([buffer],{type:'image/jpeg'})
    try{
      const pictures = storage().ref(`images/${this.auth.uid}/pets/${name || entry.name}`)
      return{ success:true,data: await pictures.put(blob)}
    }
    catch(err){
      return {success:false, error:err};
    }

   }

  async uploadPetPhotoToStorage(photo,name){
    if(!this.auth) return false;
      try{
        const pictures = storage().ref(`images/${this.auth.uid}/pets/${name}`)
        return{ success:true,data: await pictures.putString(photo,'data_url')}
      }
      catch(err){
        return {success:false, error:err};
      }
  }

  signOut(){
    this.afAuth.auth.signOut().then((data)=>{
      console.log("logout data", data)
    })
    this.auth = null;
  }

  getFirebaseErrorMessage(afErr){

    switch (afErr['code']) {
      case "auth/user-not-found":
        return this.helper.translate("ERRORS.FIREBASE.EMAIL_NOT_FOUND")
      case "auth/wrong-password":
        return this.helper.translate("ERRORS.FIREBASE.INVALID_PASSWORD")
      case "auth/email-already-in-use":
        return this.helper.translate("ERRORS.FIREBASE.EMAIL_EXISTS")
      default:
        return this.helper.translate("ERRORS.FIREBASE.INVALID_EMAIL_OR_PASSWORD")
    }

  }


}
