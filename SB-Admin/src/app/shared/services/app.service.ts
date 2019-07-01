import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public http: HttpClient) {
  }

  bindDevice(appId: string, deviceId: string): Observable<boolean> {
    return this.http.post<boolean>('/ciot/nodeRed/addAD', {
      appId: appId,
      deviceId: deviceId
    }).pipe(
      map((res: any) => {
        if (res.status.toLowerCase() !== 'ok') {
          return false;
        }

        if (!res.result) {
          return false;
        }

        if (res.result.appId !== appId || res.result.deviceId !== deviceId) {
          return false;
        }
        return true;
      }),
      catchError(err => {
        return of(false);
      })
    );
  }

  bindWorkflow(appId: string, workflowId: string): Observable<boolean> {
    return this.http.post<boolean>('/ciot/nodeRed/addAW', {
      appId: appId,
      nodeRedId: workflowId
    }).pipe(
      map((res: any) => {
        if (res.status.toLowerCase() !== 'ok') {
          return false;
        }

        if (!res.result) {
          return false;
        }

        if (res.result.appId !== appId || res.result.nodeRedId !== workflowId) {
          return false;
        }
        return true;
      }),
      catchError(err => {
        return of(false);
      })
    );
  }
}
