import { Injectable } from '@angular/core';
import { OnTheWayService } from './on-the-way.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IParams } from '../models/params.model';
import { IAddComment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService extends OnTheWayService {

  constructor(public http: HttpClient) {
    super('comments', http);
  }

  public getComments(params?: Array<IParams>){
    if (params === undefined) {
      return this.getAll();
    }
    let _params = new HttpParams();
    params.forEach(element => {
      _params = _params.set(element.key, element.value);
    });
    return this.getAll(_params);
  }

  public addComment(comment: IAddComment) {
    return this.post(comment);
  }
}
