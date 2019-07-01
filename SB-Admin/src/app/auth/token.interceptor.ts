import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take, finalize, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { TokenRefreshInfo } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { AlertService } from '../shared/modules/alert/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(public auth: AuthService, public user: UserService, private alertSerive: AlertService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.startsWith('/')) {
      request = request.clone({
        url: environment.apiUrl + request.url
      });
    }

    if (!request.headers.has('Authorization')) {
      const info = this.auth.getLoginInfo();
      if (info && info.accessToken) {
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + info.accessToken
          }
        });
      }
    }

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.body && event.body.status && event.body.status.toLowerCase() === 'error') {
            if (event.body.result === 10007) {
              throw new HttpErrorResponse({status: 403});
            } else if (event.body.result) {
              this.showAlert(event.body.result);
            }
          }
        }
      }),
      catchError((err: HttpEvent<any>) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {
            if (!request.url.includes('/oauth/token') && !request.url.includes('/users/login')) {
              return this.handle401And403Error(err, request, next);
            }
          }
        }
        return throwError(err);
      })
    );
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}`}});
  }

  private handle401And403Error(err: HttpEvent<any>, request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const info = this.auth.getLoginInfo();
    if (!info || !info.refreshToken) {
      this.user.logout();
      return throwError(err);
    }

    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      return this.user.refreshToken(info.refreshToken)
        .pipe(
          switchMap((res: TokenRefreshInfo) => {
            if (res) {
              this.tokenSubject.next(res.access_token);
              this.auth.UpdateToken(res);
              return next.handle(this.addTokenToRequest(request, res.access_token));
            }

            return <any>this.user.logout();
          }),
          catchError(_ => {
            return <any>this.user.logout();
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          })
        );
    } else {
      this.isRefreshingToken = false;

      return this.tokenSubject
        .pipe(filter(token => token != null),
          take(1),
          switchMap(token => {
          return next.handle(this.addTokenToRequest(request, token));
        }));
    }
  }

  private showAlert(code: number) {
    let header = 'Error';
    let body = `Return code = ${code}`;

    switch (code) {
      case 50007:
        body = 'Parameter is not in JSON format.';
        break;
      case 70005:
        body = 'Missing parameters.';
        break;
      case 70006:
        body = 'The workflow name already exists.';
        break;
      case 70007:
        body = 'The workflow is in use.';
        break;
      case 70009:
        body = 'Create workflow failed.';
        break;
      case 70010:
        body = 'Node-RED node is empty.';
        break;
      default:
        header = '';
        body = '';
    }

    if (body) {
      this.alertSerive.create(
        header,
        'danger',
        3000,
        body
      );
      throw new HttpErrorResponse({status: 500});
    }
  }
}
