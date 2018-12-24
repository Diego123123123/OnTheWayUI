import { IParams } from '../../models/params.model';
import { Subscription } from 'rxjs';
import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { PaginatorService } from './paginator.service';
import { FilterService } from '../filter/filter.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
/**
 * class Paginator Component
 */
export class PaginatorComponent implements OnInit {
  private page: number;
  private items: number;
  private pages: any[];
  @Output('data') sendPageArg = new EventEmitter<any>();
  private limitPage: number;
  private totalCount: number;
  private startPage: number;
  private endPage: number;
  private flag = true;
  private count = 0;
  private validPrevius: boolean;
  private validNext: boolean;
  private params: Array<IParams>;
  private changePageRef: Subscription = null;
  private nameFilterRef: Subscription = null;

  constructor( private paginatorService: PaginatorService, private filterService: FilterService,
              private router: Router, private route: ActivatedRoute){
    this.paginatorService.PageNumber.value = this.route.snapshot.queryParamMap.get('pageNumber') || 1;
    this.pages = [];
    this.page = 1;
    this.validPrevius = true;
    this.validNext = true;
  }

  public ifNext(){
    if (this.page == this.limitPage){
      this.validNext = false;
    }
    else{
      this.validNext = true;
    }
  }

  public ifPrevius(){
    if (this.page == 1){
      this.validPrevius = false;
    }
    else{
      this.validPrevius = true;
    }
  }

  public nextPage(){
      this.activePage('');
      this.page += 1;
      this.sendPage();
      this.next();
      this.ifNext();
      this.ifPrevius();
      this.active();
      this.router.navigate([this.router.url.split('?')[0]],{queryParams:{ pageNumber:this.page}});
  }

  public sendPage() {
    this.params = [{key: 'pageNumber', value: this.page}, {key: 'pageSize', value: 3}];
    this.paginatorService.PageNumber.value = this.page;
    this.sendPageArg.emit(this.params);
  }

    public calculatePages() {
      this.limitPage = Math.ceil(this.items / 3);
      if (this.limitPage > 10 && this.flag) {
          this.totalCount = this.limitPage;
          this.limitPage = 10;
          this.startPage = 1;
          this.endPage = 10;
          this.flag = false;
      }
      if (this.limitPage <= 10 && this.flag) {
          this.totalCount = this.limitPage;
          this.startPage = 1;
          this.endPage = this.limitPage;
          this.flag = false;
      }
      if (this.limitPage <= 10 && this.paginatorService.Categories) {
          this.totalCount = this.limitPage;
          this.startPage = 1;
          this.endPage = this.limitPage;
          this.flag = false;
      }
      if (this.limitPage > 10 && this.paginatorService.Categories) {
          this.totalCount = this.limitPage;
          this.limitPage = 10;
          this.startPage = 1;
          this.endPage = 10;
          this.flag = false;
      }
    this.createCountPage();
  }

  public previusPage(){
    this.pages[this.page - 1].state = '';
      this.page -= 1;
      this.sendPage();
      this.previous();
      this.ifNext();
      this.ifPrevius();
      this.active();
      this.router.navigate([this.router.url.split('?')[0]],{queryParams:{ pageNumber:this.page}});
  }

    public createCountPage() {
        for (let _i = this.startPage; _i <= this.endPage; _i++) {
          this.pages.push({number : _i, state : ''});
        }
        this.active();
        this.ifNext();
        this.ifPrevius();
    }

    public changePage(number: number) {
      this.activePage('');
      this.page = Number(number);
      this.sendPage();
      this.next();
      this.previous();
      this.ifNext();
      this.ifPrevius();
      this.active();
      this.router.navigate([this.router.url.split('?')[0]],{queryParams:{ pageNumber:this.page}});
  }

    private next() {
        if (this.page == this.endPage) {
            if (this.page == this.totalCount) {
                this.endPage = this.totalCount;
            }
            else {
                this.endPage++;
                this.startPage++;
            }
            this.flag = false;
        }
    }

    private previous(){
        if (this.page == this.startPage) {
            this.flag = false;
            if (this.page == 1) {
                this.startPage = 1;
            }
            else {
                this.startPage--;
                this.endPage--;
            }
            this.flag = false;
        }
    } 
  
  private activePage(value) {
      for (let page of this.pages) {
          if (page.number == this.page) {
              page.state = value;
          }
      }
  }

  public active() {
     this.activePage('active')
  }
  
  ngOnInit() {
    this.paginatorService.PageNumber.value = this.route.snapshot.queryParamMap.get('pageNumber') || 1;
    this.changePageRef = this.paginatorService.totalElementsSubject$.subscribe(() => {
      this.items = this.paginatorService.TotalElements;
      this.page = this.paginatorService.PageNumber.value;
      this.pages = [];
      this.calculatePages();
    });
    this.nameFilterRef = this.filterService.NameFilterSubject$.subscribe(() => {
      this.paginatorService.PageNumber.value = 1;
    });
  }

  public get Pages() {
    return this.pages;
  }

  public refreshPages() {
    for (let _i = 1; _i <= this.limitPage; _i++) {
      this.pages.pop();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.refreshPages();
    this.calculatePages();
    this.page = 1;
  }
}
