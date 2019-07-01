import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DeviceApi {
  leap = 'https://api.ileapcloud.com/ciot';
  constructor(public http: HttpClient) {}

  getDeviceList() {
    return this.http.get(`${this.leap}/device/list`);
  }
  DeviceDetails(id) {
    return this.http.get(`${this.leap}/device/info/${id}`);
  }
  getPredefinedDeviceList() {
    return this.http.get(`${this.leap}/predevice/list`);
  }
  getPredefinedDevice(id) {
    return this.http.get(`${this.leap}/predevice/info/${id}`);
  }

  addPredefinedDevice(json) {
    return this.http.post(`${this.leap}/predevice/add`, json);
  }
  deletePredefinedDevice(uuid) {
    return this.http.delete(`${this.leap}/predevice/delete/${uuid}`);
  }
  putPredefinedDevice(json) {
    return this.http.put(`${this.leap}/predevice/edit`, json);
  }
  unenroll(id) {
    return this.http.post(`${this.leap}/device/unenroll/${id}`, {});
  }
  configList() {
    return this.http.get(`${this.leap}/config/list`);
  }
  sendcommand(json) {
    return this.http.post(`${this.leap}/command/send`, json);
  }
  commandinfo(id) {
    return this.http.get(`${this.leap}/command/info/${id}`);
  }
  gitaconfig(pid) {
    return this.http.get(`${this.leap}/config/info/${pid}`);
  }
  bindpin(num) {
    return this.http.post(`${this.leap}/device/bind/${num}`, {});
  }
  searchDevice(name) {
    return this.http.get(`${this.leap}/device/search/${name}`);
  }
  searchPreDevice(name) {
    return this.http.get(`${this.leap}/predevice/search/${name}`);
  }
  devicetag(uuid) {
    return this.http.get(`${this.leap}/device/tag/${uuid}`);
  }
  deviceAddtag(json) {
    return this.http.post(`${this.leap}/device/addtag`, json);
  }
  devicetagPre(uuid) {
    return this.http.get(`${this.leap}/predevice/tag/${uuid}`);
  }
  deviceAddtagPre(json) {
    return this.http.post(`${this.leap}/predevice/addtag`, json);
  }
  nodeRed(json) {
    return this.http.post(`${this.leap}/nodeRed/addAWD`, json);
  }
  versionInfo() {
    return this.http.post(`${this.leap}/device/getLatestFirmwareInfo`, {});
  }
  send(json) {
    return this.http.post(`${this.leap}/command/send`, json);
  }
}
