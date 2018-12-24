import { Injectable } from '@angular/core';
import { OnTheWayService } from './on-the-way.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IParams } from '../models/params.model';
import { HttpHeaders } from '@angular/common/http';
import { IPatch } from '../models/patch.model';

@Injectable({
  providedIn: 'root'
})
export class SiteService extends OnTheWayService{
  constructor(public http: HttpClient) {
    super('sites', http);
  }

  public getSiteDetail(siteId: number) {
    return this.getOne(siteId);
  }

  public getSites(params?: Array<IParams>){
    if (params === undefined) {
      return this.getAll();
    }
    let _params = new HttpParams();
    params.forEach(element => {
      _params = _params.set(element.key, element.value);
    });
    return this.getAll(_params);
  }

  public patchSite(identifier: any, patch: Array<IPatch>) {
    return this.patch(identifier, patch);
  }

  public getAllSites(){
    let token = sessionStorage.getItem('token');
    console.log();
    return this.httpClient.get(this.url +'?pageSize=1', {headers: new HttpHeaders().set('Authorization', 'Bearer '+token)});
  }

  public postSite(site){
    return this.post(site);
  }
}
