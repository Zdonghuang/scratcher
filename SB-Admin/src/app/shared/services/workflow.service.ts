import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Workflow, WorkflowStatus, PagedResponse, AWD } from '../models/workflow';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor(public http: HttpClient) {
  }

  cachedData: Workflow[] = [];

  setCache(flows: Workflow[]) {
    this.cachedData = flows;
  }

  getCache(): Workflow[] {
    return this.cachedData;
  }

  getAll(): Observable<Workflow[]> {
    return this.http.get<Workflow[]>('/ciot/config/list').pipe(
      map((res: any) => {
        if (res.status.toLowerCase() !== 'ok') {
          return [];
        }

        const result: [] = res.result;
        if (!result || result.length === 0) {
          return result;
        }

        return result.map((v: any) => {
          if (!v) {
            return v;
          }

          const flow: Workflow = new Workflow();
          flow.id = v.id;
          flow.payloadId = v.payloadId;
          flow.up = v.up;
          flow.content = v.content;
          flow.type = v.type;
          flow.name = v.name;
          flow.createTime = new Date(v.createTime);
          flow.updateTime = new Date(v.updateTime);
          return flow;
        });
      }),
      catchError(err => {
        return of([]);
      })
    );
  }

  getPage(page: number, size: number): Observable<PagedResponse> {
    return this.http.put<Workflow[]>('/ciot/config/listPage', {
      page: page,
      pageSize: size,
      order: 'desc',
      orderBy: 'updateTime'
    }).pipe(
      map((res: any) => {
        if (res.status.toLowerCase() !== 'ok') {
          return null;
        }

        const result: [] = res.result.payload;
        if (!result || result.length === 0) {
          return null;
        }

        const pr = new PagedResponse();
        pr.count = res.result.count;
        pr.data = result.map((v: any) => {
          if (!v) {
            return null;
          }

          const flow: Workflow = new Workflow();
          flow.id = v.id;
          flow.payloadId = v.payloadId;
          flow.up = v.up;
          flow.content = v.content;
          flow.type = v.type;
          flow.name = v.name;
          flow.createTime = new Date(v.createTime);
          flow.updateTime = new Date(v.updateTime);
          return flow;
        });

        return pr;
      }),
      catchError(err => {
        return of(null);
      })
    );
  }

  get(payloadId: string): Observable<Workflow> {
    return this.http.get<Workflow>(`/ciot/info/${payloadId}`).pipe(
      map((res: any) => {
        if (res.status.toLowerCase() !== 'ok') {
          return null;
        }

        if (!res.result) {
          return null;
        }

        const flow: Workflow = new Workflow();
        flow.id = res.result.id;
        flow.payloadId = res.result.payloadId;
        flow.up = res.result.up;
        flow.content = res.result.content;
        flow.type = res.result.type;
        flow.name = res.name;
        flow.createTime = new Date(res.createTime);
        flow.updateTime = new Date(res.updateTime);
        return flow;
      })
    );
  }

  getAvailable(appId: string): Observable<Workflow[]> {
    return this.http.get<Workflow[]>(`/ciot/config/filterList/${appId}`).pipe(
      map((res: any) => {
        if (res.status.toLowerCase() !== 'ok') {
          return [];
        }

        const result: [] = res.result;
        if (!result || result.length === 0) {
          return result;
        }

        return result.map((v: any) => {
          if (!v) {
            return v;
          }

          const flow: Workflow = new Workflow();
          flow.id = v.id;
          flow.payloadId = v.payloadId;
          flow.up = v.up;
          flow.content = v.content;
          flow.type = v.type;
          flow.name = v.name;
          flow.createTime = new Date(v.createTime);
          flow.updateTime = new Date(v.updateTime);
          return flow;
        });
      }),
      catchError(err => {
        return of([]);
      })
    );
  }

  getbyApp(appId: string): Observable<Workflow> {
    return this.http.get<Workflow[]>(`/ciot/config/findByApp/${appId}`).pipe(
      map((res: any) => {
        if (res.status.toLowerCase() !== 'ok') {
          return null;
        }

        if (!res.result) {
          return null;
        }

        const flow: Workflow = new Workflow();
        flow.id = res.result.id;
        flow.payloadId = res.result.payloadId;
        flow.up = res.result.up;
        flow.content = res.result.content;
        flow.type = res.result.type;
        flow.name = res.name;
        flow.createTime = new Date(res.createTime);
        flow.updateTime = new Date(res.updateTime);
        return flow;
      })
    );
  }

  add(name: string, content: string): Observable<Workflow> {
    return this.http.post<Workflow>('/ciot/config/add', {
      name: name,
      up: 'off',
      type: 'nodered',
      content: content
    }).pipe(
      map((res: any) => {

        if (res.status.toLowerCase() !== 'ok') {
          return res.result;
        }

        if (!res.result) {
          return null;
        }

        const flow: Workflow = new Workflow();
        flow.id = res.result.id;
        flow.payloadId = res.result.payloadId;
        flow.up = res.result.up;
        flow.content = res.result.content;
        flow.type = res.result.type;
        flow.name = res.name;
        flow.createTime = new Date(res.createTime);
        flow.updateTime = new Date(res.updateTime);
        return flow;
      })
    );
  }

  edit(workflow: Workflow): Observable<Workflow> {
    return this.http.put<Workflow>('/ciot/config/edit', { workflow }).pipe(
      map((res: any) => {
        if (res.status.toLowerCase() !== 'ok') {
          return null;
        }

        if (!res.result) {
          return null;
        }

        const flow: Workflow = new Workflow();
        flow.id = res.result.id;
        flow.payloadId = res.result.payloadId;
        flow.up = res.result.up;
        flow.content = res.result.content;
        flow.type = res.result.type;
        flow.name = res.name;
        flow.createTime = new Date(res.createTime);
        flow.updateTime = new Date(res.updateTime);
        return flow;
      })
    );
  }

  delete(payloadId: string): Observable<boolean> {
    return this.http.delete(`/ciot/config/delete/${payloadId}`).pipe(
      map((res: any) => {
        return res.status.toLowerCase() === 'ok';
      })
    );
  }

  start(appId: string, userId: string, deviceId: string, startParam: string): Observable<boolean> {
    return this.http.post('/ciot/scenarios/create', {
      userId: userId,
      appId: appId,
      deviceId: deviceId,
      parameter: startParam
    }).pipe(
      map((res: any) => {
        if (res.status.toLowerCase() !== 'ok') {
          return false;
        }

        if (!res.result) {
          return false;
        }

        return res.result.up as WorkflowStatus === WorkflowStatus.On;
      })
    );
  }

  stop(appId: string, userId: string, deviceId: string): Observable<boolean> {
    return this.http.put('/ciot/scenarios/remove', {
      userId: userId,
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

        return res.result.up as WorkflowStatus === WorkflowStatus.Off;
      })
    );
  }

  findAWD(payloadId: string): Observable<AWD> {
    return this.http.get(`/ciot/nodeRed/findAWD/${payloadId}`).pipe(
      map((res: any) => {
        if (res.status.toLowerCase() !== 'ok') {
          return null;
        }

        if (!res.result) {
          return null;
        }

        const awd = new AWD();
        awd.appId = res.result.appId;
        awd.devices = res.result.device;
        return awd;
      })
    );
  }
}
