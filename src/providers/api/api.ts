import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable()
export class ApiProvider {
	 apiUrl: string = 'https://prtsy.herokuapp.com/api/';

  constructor( private http: HttpClient) {
  }

    get(endpoint: string, params?: any) {

    	return this.http.get(this.apiUrl + endpoint,params);
  	}

  	post(endpoint: string, body: any, reqOpts?: any) {
    	return this.http.post(this.apiUrl  + endpoint, body, {
    		headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    	});
  	}

}
