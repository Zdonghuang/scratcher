import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Security {
  leap = 'https://api.ileapcloud.com/ciot';
  constructor(public http: HttpClient) {
   }

  getcertlist() {
    return this.http.get(`${this.leap}/scep/getcertList`);
  }
  getacert(key) {
    return this.http.get(`${this.leap}/scep/getcertinfo?filename=${key}`);
  }
  delcertlist(name) {
    return this.http.get(`${this.leap}/scep/removecert?filename=${name}`);
  }
}
