import { Injectable } from '@angular/core';
import { OnTheWayService } from './on-the-way.service';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../models/category.model';

@Injectable()
export class CategoriesService extends OnTheWayService{
  private categories: Array<ICategory>;
  constructor(public http: HttpClient) {
    super('categories', http);
  }

  public getCategories() {
    return this.getAll();
  }

  public set Categories(categories: Array<ICategory>) {
    this.categories = categories;
  }

  public get Categories() {
    return this.categories;
  }
}
