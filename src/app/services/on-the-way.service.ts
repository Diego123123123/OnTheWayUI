import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AppError, UnauthorizedError, NotFoundError,
  InternalServerError, NotImplementedError,
  PermissionDeniedError, BadRequest } from '../common/errors/app-error';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

@Injectable()

export class OnTheWayService {
  protected urlAzure: string = 'https://onthewaybackend20181205043641.azurewebsites.net/';
  //protected urlAzure: string = 'https://localhost:56667';

  protected url: string;
  constructor(protected endpoint: string, protected httpClient: HttpClient) {
    this.url = (this.urlAzure + this.endpoint);
  }

  public getUrl(identifier?: any) {
    return this.url + '/' + String(identifier);
  }

  protected getAll(params?) {
    let token = sessionStorage.getItem('token');
    return this.httpClient.get(this.url, {headers: new HttpHeaders().set('Authorization', 'Bearer '+token), params: params});
  }

  protected getOne(identifier: any) {
    let token = sessionStorage.getItem('token');
    let urlId: any;
    urlId = this.getUrl(identifier);
    if(token == null){
      return this.httpClient.get(urlId);
    }
    return this.httpClient.get(urlId, {headers: new HttpHeaders().set('Authorization', 'Bearer '+token)});
  }

  protected post(data: any) {
    let token = sessionStorage.getItem('token');
    return this.httpClient.post(this.url, data, {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+token)
    });
  }

  protected postOne(identifier: any, data: any) {
    let token = sessionStorage.getItem('token');
    let urlId: any;
    urlId = this.getUrl(identifier);
    return this.httpClient.post(urlId, data, { headers: new HttpHeaders().set('Authorization', 'Bearer '+token)});
  }

  protected patch(identifier: any, data: any) {
    let token = sessionStorage.getItem('token');
    let urlId: any;
    urlId = this.getUrl(identifier);
    this.httpClient.patch(urlId, data);
    return this.httpClient.patch(urlId, data, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    });
  }

  protected patchToken(identifier: any, data: any) {
    let urlId: any;
    let token = sessionStorage.getItem('token');
    urlId = this.getUrl(identifier);
    return this.httpClient.patch(urlId, data, {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+token)
    })
  }

  protected put(identifier: any, data: any) {
    let urlId: any;
    urlId = this.getUrl(identifier);
    return this.httpClient.put(urlId, data);
  }

  protected delete(identifier: any, data?: any){
    let token = sessionStorage.getItem('token');
    let urlId: any;
    urlId = this.getUrl(identifier);
    return this.httpClient.delete(urlId, {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+token)});
  }

  public errorType(error) {
    if (error.status === 400) {
      return Observable.throw(new BadRequest());
    }
    if (error.status === 401) {
      return Observable.throw(new UnauthorizedError(error['error']['message']));
    }
    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }
    if (error.status === 500) {
      return Observable.throw(new InternalServerError(error['error']['message']));
    }
    if (error.status === 501) {
      return Observable.throw(new NotImplementedError());
    }
    if (error.status === 550) {
      return Observable.throw(new PermissionDeniedError());
    }
    return Observable.throw(new AppError(error['error']['message']));
  }

  getToken() {
    let user: any;
    user = JSON.parse(sessionStorage.getItem('currentUser'));
    let token: any;
    token = '';
    if (user) {
      token = user.token;
    }
    return token;
  }

}

