import { Injectable } from '@angular/core';
import { LoginInfo, TokenRefreshInfo } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly LOGIN_KEY = 'login';

  public getLoginInfo(): LoginInfo {
    const info = localStorage.getItem(this.LOGIN_KEY);
    return info && JSON.parse(info);
  }

  public setLoginInfo(info: LoginInfo) {
    if (info) {
      localStorage.setItem(this.LOGIN_KEY, JSON.stringify(info));
    } else {
      this.clearLoginInfo();
    }
  }

  public clearLoginInfo() {
    localStorage.removeItem(this.LOGIN_KEY);
  }

  public UpdateToken(refreshInfo: TokenRefreshInfo) {
    const info = this.getLoginInfo() || {} as LoginInfo;
    info.accessToken = refreshInfo.access_token;
    info.refreshToken = refreshInfo.refresh_token;
    this.setLoginInfo(info);
  }
}
