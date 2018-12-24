import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnTheWayService } from './on-the-way.service';

@Injectable({
  providedIn: 'root'
})
export class ThemesService extends OnTheWayService {

  constructor(private http: HttpClient) { 
    super('themes', http)
  }

  getThemes() {
    return this.getAll();
  }

  getThemeById(id: number) {
    return this.getOne(id);
  }
}
