import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SettingsApi {
  leap = 'https://api.ileapcloud.com/ciot';
  constructor(public http: HttpClient) {
   }

  getSttingList() {
    return this.http.get(`${this.leap}/setting/list`);
  }
  getAsetting(key) {
    return this.http.get(`${this.leap}/setting/get/${key}`);
  }
  setAsetting(key, json) {
    return this.http.post(`${this.leap}/setting/set/${key}`, json);
  }
  uploadAPK(version, json) {
    return this.http.post(`${this.leap}/device/uploadFirmware/${version}`, json);
  }
}
