import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api'

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

  constructor( private apiProvider:ApiProvider) {
  }

  loginUser(userData){
  	let body=ObjecttoParams(userData,'user')
  	return this.apiProvider.post('authenticate/',body)
  }

}
