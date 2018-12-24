import { Injectable } from '@angular/core';
import { OnTheWayService } from './on-the-way.service';
import { HttpClient } from '@angular/common/http';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})

export class ImageService extends OnTheWayService {

  constructor(public http: HttpClient) {
    super('images', http);
  }

  public addImage(image: Image) {
    return this.post(image);
  }
}
