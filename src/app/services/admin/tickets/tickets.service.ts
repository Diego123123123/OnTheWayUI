import { Injectable } from '@angular/core';
import { OnTheWayService } from '../../on-the-way.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketsService extends OnTheWayService {

  constructor(private http: HttpClient ) {
    super("tickets", http);
  }

  public getTicketById(idTicket: number){
    return this.getOne(idTicket);
  }

  public createTicket(data){
    return this.post(data);
  }

  public editTicket(id, data){
    return this.put(id, data);
  }

  public getTicketsByUser(params?){
    if (params === undefined) {
      return this.getAll();
    }
    let _params = new HttpParams();
    params.forEach(element => {
      _params = _params.set(element.key, element.value);
    });
    return this.personalizedGetOne('userTicket', _params);
  }
}
