import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IParams } from '../../models/params.model';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  private totalElements: number = 0;
  private totalElementsSubject = new Subject<Number>();
  private categories = false;
  public totalElementsSubject$ = this.totalElementsSubject.asObservable();
  private pageSize: IParams = {key: 'pageSize', value: null};
  private pageNumber: IParams = {key: 'pageNumber', value: 1};
  
  constructor() { 
    this.PageSize = { key: 'pageSize', value: 3 };
  }
  
  set TotalElements(number: number) {
    this.totalElements = number;
    this.totalElementsSubject.next(this.totalElements);
  }

  get TotalElements() {
    return this.totalElements;
  }
  
  set PageNumber(page: IParams) {
    this.pageNumber = page;
  }

  get PageNumber() {
    return this.pageNumber;
  }

  set PageSize(number: IParams) {
    this.pageSize = number;
  }

  get PageSize() {
    return this.pageSize;
  }

  set Categories(availability: boolean) {
    this.categories = availability;
  }

  get Categories() {
    return this.categories;
  }
}
