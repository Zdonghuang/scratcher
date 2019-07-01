import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LogIn {
  leap = 'https://api.ileapcloud.com/leez/v1';
  constructor(public http: HttpClient) {
   }


  login(json) {
    return this.http.post(`${this.leap}/users/login`, json, {headers : {'Authorization': ''}});
  }
  getUserInfo() {
    return this.http.get(`${this.leap}/users/userinfo`);
  }
}
