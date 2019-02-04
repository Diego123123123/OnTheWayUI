import { Injectable } from '@angular/core';
import { OnTheWayService } from './on-the-way.service';
import { HttpClient } from '@angular/common/http';
import { Balance } from '../models/balance';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceEventsService extends OnTheWayService {

  constructor(private http: HttpClient) {
    super("Balance", http);
  }

  public getBalance(eventId: number): Observable<Balance> {
    return this.getOne(eventId).pipe(map(response => response as Balance));
  }
}
