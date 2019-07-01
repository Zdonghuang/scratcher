import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserInfo {
  leap = 'https://api.ileapcloud.com/leez/v1';
  constructor(public http: HttpClient) {}

  updatePwd(json) {
    return this.http.post(`${this.leap}/users/updatePwd`, json);
  }
  updateEmail(email) {
    return this.http.post(`${this.leap}/users/updateEmail/${email}`, {});
  }
  
}
