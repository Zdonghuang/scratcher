import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { LoginInfo, TokenRefreshInfo, UserInfo } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(public router: Router, public http: HttpClient, public auth: AuthService) { }

  public isLoggedIn(): boolean {
    return this.auth.getLoginInfo() ? true : false;
  }

  login(username: string, password: string): Observable<LoginInfo> {
    return this.http.post<LoginInfo>('/leez/v1/users/login', {username, password}, {headers: {Authorization: ''}}).pipe(
      map((res: any) => {
        if (res.status.toLowerCase() !== 'ok') {
          throw res;
        }

        const info = res.result as LoginInfo;
        this.auth.setLoginInfo(info);
        return info;
      }), catchError(err => {
        if (err instanceof HttpErrorResponse) {
          return throwError({status: err.status, result: err.error});
        }
        return throwError(err);
      })
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  refreshToken(token: string): Observable<TokenRefreshInfo> {
    return this.http.post<TokenRefreshInfo>('/auth/oauth/token',
            `grant_type=refresh_token&refresh_token=${token}`,
            {headers: {
              Authorization: 'Basic bGVhcGFpLWNsaWVudDpsZWFwYWktc2VjcmV0',
              'Content-Type': 'application/x-www-form-urlencoded'
            }})
      .pipe(
        map((res: any) => {
          if (!res.access_token || !res.refresh_token) {
            throw res;
          }
          return res as TokenRefreshInfo;
        }), catchError(err => {
          if (err instanceof HttpErrorResponse) {
            return throwError({status: err.status, result: err.error});
          }
          return throwError(err);
        })
      );
  }

  getCurrentUser(): UserInfo {
    const info = localStorage.getItem('user');
    if (info) {
      return JSON.parse(info);
    } else {
      return null;
    }
  }

  setCurrentUser(info: UserInfo) {
    localStorage.setItem('user', JSON.stringify(info));
  }

  getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>('/leez/v1/users/userinfo').pipe(
      map((res: any) => {
        if (res.status.toLowerCase() !== 'ok') {
          throw res;
        }

        const info: UserInfo = res.result;
        this.setCurrentUser(info);
        return info;
      }), catchError(err => {
        if (err instanceof HttpErrorResponse) {
          return throwError({status: err.status, result: err.error});
        }
        return throwError(err);
      })
    );
  }
}
