import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database'
import { HelperProvider } from '../../providers/helper/helper'
import { storage } from 'firebase'

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
    private afDatabase:AngularFireDatabase, private helper:HelperProvider) {
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
        return { success:true, data: await this.afDatabase.object(`profile/${this.auth.uid}`).set(profileData)}
     }
     catch(err){
        return {success:false, error:err};
     }
  }

  async uploadPhotoToStorage(photo){
    if(!this.auth) return false;
      try{
        const pictures = storage().ref(`imgs/profiles/${this.auth.uid}`)
        return{ success:true,data: await pictures.putString(photo,'data_url')}
      }
      catch(err){
        return {success:false, error:err};
      }
  }

  signOut(){
    this.afAuth.auth.signOut()
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
