import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';



@Injectable()
export class ApiProvider {
	 apiUrl: string = 'https://fatwa.islamonline.net/api/';

  constructor( private http: HttpClient) {
  }

    get(endpoint: string, params?: any) {

    return this.http.get(this.apiUrl + endpoint,params);
  }

}
