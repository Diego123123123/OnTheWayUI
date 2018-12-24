import { Injectable } from '@angular/core';
import { Site } from '../../models/site';
import { Subject } from 'rxjs';
import { IParams } from '../../models/params.model';

@Injectable({
  providedIn: 'root'
})
export class SitesListService {

  private sites: Array<Site>;
  private sitesSubject = new Subject<Array<Site>>();
  public sitesSubject$ = this.sitesSubject.asObservable();
  
  constructor() { }

  set Sites( sites: Array<Site> ) {
    this.sites = [...sites];
    this.sitesSubject.next(this.sites);
  }

  get Sites(): Array<Site> {
    return this.sites;
  }
}
