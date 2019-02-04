import { EventsService } from "src/app/services/events.service";

export class EventsFound {
  
  body: any;
  events: any;
  pages: any;
  pagesAmount: any;
  totalEvents: any;
  currentPage: any = 1;
  eventsServ: EventsService;
  exist: boolean = true;
  loading: boolean;

  constructor(service, body) { 
      this.eventsServ = service;
      this.body = body;
  }

  ngOnInit() {
    this.eventsServ.advanceSearch(this.verifyBody(), this.currentPage, 3).subscribe(response => {
      if(response){
          this.exist = true;
          this.events = response["result"];
          this.pagesAmount = response["pagesAmount"];
          this.generatePages();
          this.totalEvents = response["eventsNumber"];
          this.currentPage = response["currentPage"];
        }
        this.loading = false;
    });
  }

  generatePages(){
    this.pages = [];
    for (let _i = 1; _i <= this.pagesAmount; _i++) {
      if(this.currentPage == _i){this.pages.push({number : _i, state : 'active'});}
      else{this.pages.push({number : _i, state : ''});}
    }
  }

  prevPage(){
    this.currentPage = this.currentPage - 1;
    this.ngOnInit();
  }

  nextPage(){
    this.currentPage = this.currentPage + 1;
    this.ngOnInit();
  }

  changePage(pageNumber){
    this.currentPage = pageNumber;   
    this.ngOnInit(); 
  }

  verifyBody(){
    var bodyAux = this.body;
    if(this.body.activities.length === 0 && this.body.Location.length === 0){
      bodyAux = {Schedule: this.body.Schedule};
    }
    if(this.body.activities.length != 0 && this.body.Location.length === 0){
      bodyAux = {activities:this.body.activities, Schedule: this.body.Schedule};
    }
    if(this.body.activities.length === 0 && this.body.Location.length != 0){
      bodyAux = {Location: this.body.Location, Schedule: this.body.Schedule};
    }
    return bodyAux;
  }

}
