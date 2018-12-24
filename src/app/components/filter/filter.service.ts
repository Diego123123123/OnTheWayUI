import { Injectable } from '@angular/core';
import { IParams } from '../../models/params.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private params: Array<IParams>;
  private name: IParams = {key: 'name', value: ''};
  private NameFilterSubject = new Subject<IParams>();
  public NameFilterSubject$ = this.NameFilterSubject.asObservable();
  
  constructor() { }

  set Params(params: Array<IParams>) {
    this.params = params;
  }

  get Params() {
    return this.params;
  }

  set NameParam(name: IParams) {
    this.name = name;
    this.NameFilterSubject.next(this.name);
  }

  get NameParam() {
    return this.name;
  }

}
