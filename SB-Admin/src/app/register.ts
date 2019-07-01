import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Register {
  leap = 'https://api.ileapcloud.com/leez/v1';
  constructor(public http: HttpClient) {}

  register(json) {
    return this.http.post(`${this.leap}/users/register`, json, { headers: { Authorization: '' } });
  }
  getuserinfo() {
    return this.http.get(`${this.leap}/users/userinfo`);
  }
  sendemail(json) {
    return this.http.post(`${this.leap}/users/sendValidEmail`, json);
  }
  checkemail(json) {
    return this.http.put(`${this.leap}/users/checkEmail/${json}`, {}, {headers : {'Authorization': ''}});
  }
  emailIdentityCode(source,email) {
    return this.http.post(`${this.leap}/users/emailIdentityCode/${source}/${email}`, {});
  }
  resetPwd(json) {
    return this.http.post(`${this.leap}/users/resetPwd`, json);
  }
}
