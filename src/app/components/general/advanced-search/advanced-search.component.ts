import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxDrpOptions, PresetItem, Range } from 'ngx-mat-daterange-picker';
import { DateTime } from './date-time';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { Location } from './location';
import { CategoriesService } from '../../../services/categories.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { EventsService } from 'src/app/services/events.service';
import { EventsFound } from './events-found';


@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdvancedSearchComponent implements OnInit {
  
  bodySearch: any;
  searchForm: FormGroup;
  stackSearch: any = [];
  searching: boolean = false;
  found: EventsFound;
  //Datetime attributes.
  datetime: DateTime = new DateTime();
  dateControl = new FormControl(this.datetime.dates[0]);
  timeControl: FormControl;
  range:Range = {fromDate:new Date(), toDate:new Date()};
  rangeTime: any = {fromTime:null, toTime:null};
  options:NgxDrpOptions;
  isRange: boolean = false;
  isRangeTime: boolean = false;

  //Location attributes.
  location: Location = new Location();
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  region: any = "";
  public zoom: number;
  @ViewChild("search")
  public searchElementRef: ElementRef;

  //Activity attributes.
  categoryControl = new FormControl();
  categories: any;
  filteredOptions: Observable<any[]>;
  
  constructor(private fb: FormBuilder,private mapsAPILoader: MapsAPILoader,private ngZone: NgZone,
              private category:CategoriesService, private eventsServ:EventsService) {
    this.bodySearch = {Schedule:[], Location:[], activities:[]};
    this.searchForm = fb.group({
      activity: [''],
      location: [''],
      startTime: ['']
    });
   }

   rangeFlag(){
     this.isRange = !this.isRange;
     this.setupPresets(0);
   }

   rangeTimeFlag(){
    this.isRangeTime = !this.isRangeTime;
    this.addOption({type:2, value:this.timeControl.value.name});
   }

  ngOnInit() {
    const today = new Date();
    const max = new Date(today.getFullYear() + 1, today.getMonth() + 1, today.getDay());
    this.options = {presets: null,format: 'mediumDate',range: {fromDate:today, toDate:today},applyLabel: "Submit",
                    cancelLabel: "Cancel",placeholder: "Select Date",animation: true,startDatePrefix: "From ",endDatePrefix: "To",
                    fromMinMax: {fromDate:today, toDate:max},toMinMax: {fromDate:today, toDate:max},
                    calendarOverlayConfig: {shouldCloseOnBackdropClick: true,hasBackdrop: true}
                  };
    var time = this.datetime.validHour();
    this.timeControl = new FormControl(time);
    this.rangeTime = time.range;
    this.setupPresets(0);
    this.addOption({type:2, value:time.name});
    
    this.setCurrentPosition();
    this.searchControl = new FormControl(this.region);
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['(regions)'],
        componentRestrictions: {country: "bo"}
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          var placeAux = place.geometry.viewport;
          var superior = {Latitude:placeAux.getNorthEast().lat(), Longitude:placeAux.getNorthEast().lng()};
          var inferior = {Latitude:placeAux.getSouthWest().lat(), Longitude:placeAux.getSouthWest().lng()};
          this.bodySearch.Location[0] = {Superior:superior, inferior: inferior};
          this.addOption({type:0, value:place.formatted_address});
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
    
    this.category.getCategories().subscribe(response => {
      this.categories = response["results"];
      this.filteredOptions = this.categoryControl.valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.categoryName),
        map(name => name ? this._filter(name) : this.categories.slice())
      );
    });

  }

  public setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.location.initMap(this.latitude, this.longitude);
        this.zoom = 12;
        this.region = sessionStorage.getItem("location");
        var superior = {Latitude:this.latitude + 0.003, Longitude:this.longitude + 0.003};
        var inferior = {Latitude:this.latitude - 0.003, Longitude:this.longitude - 0.003};
        this.bodySearch.Location[0] = {Superior:superior, inferior: inferior};
        this.addOption({type:0, value:this.region});
      });
    }
    this.searchControl = new FormControl(this.region);
  }
  
  setupPresets(typeDate = null, remove = false) {
    if(typeDate || typeDate == 0){this.addOption({type:1, value:this.datetime.dates[typeDate].name});}
    if(remove){this.addOption({type:1, value:null});}
    this.updateRange(this.datetime.getDateRange(typeDate));
  }
  updateRange(range: Range = null, addRange = false){
    this.range = range;
    this.datetime.convertDate(this.range, this.rangeTime);
    this.bodySearch.Schedule[0] = this.datetime.schedule;
    if(addRange){
      this.addOption({type:1,value:range.fromDate.toLocaleDateString() + ' - '+range.toDate.toLocaleDateString()});
    }
  }  
    
  setupTime(typeTime = null, remove = false){
    if(typeTime){this.addOption({type:2, value:this.datetime.times[typeTime-1].name});}
    if(remove){this.addOption({type:2, value:null});}
    this.updateRangeTime(this.datetime.getTimeRange(typeTime));
      
  }
  updateRangeTime(timeRange = null, addRange = false){
    this.rangeTime = timeRange;
    this.datetime.convertDate(this.range, this.rangeTime);
    this.bodySearch.Schedule[0] = this.datetime.schedule;
    if(addRange){
      this.addOption({type:2, value:timeRange.fromTime});
    }
  }

  openStart(time){
    this.rangeTime.fromTime = time;
    this.rangeTime.toTime = "23:59";
    this.updateRangeTime(this.rangeTime, true);
  }

  searchAdvance(){
    this.found = new EventsFound(this.eventsServ, this.bodySearch);
    this.found.loading = true;
    this.found.ngOnInit();
    if(!this.found.events || !this.found.loading){
      this.found.exist = false;
    }
    this.searching = true;
    
  }

  addOption(newOption){
    for(let option of this.stackSearch){
      if(option.type === newOption.type){
        if(!newOption.value){this.remove(option); return;}
        option.value = newOption.value;
        return;
      }
    }
    this.stackSearch.push(newOption);
  }

  remove(optionDelete) {
    if(optionDelete.type === 0){
      this.bodySearch.Location = [];
      this.searchControl = new FormControl();
    }
    if(optionDelete.type === 1){this.setupPresets();this.dateControl = new FormControl();}
    if(optionDelete.type === 2){this.setupTime();this.timeControl = new FormControl();}
    if(optionDelete.type === 3){
      this.bodySearch.activities = [];
      this.categoryControl = new FormControl();
    }
    const index = this.stackSearch.indexOf(optionDelete, 0);
    if (index > -1) {
      this.stackSearch.splice(index, 1);
    }
  }

  addCategory(category){
    this.bodySearch.activities.push(category.categoryName);
    this.addOption({type:3, value:category.categoryName});
  }

  displayFn(user?: any): string | undefined {
    return user ? user.categoryName : undefined;
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.categories.filter(option => option.categoryName.toLowerCase().indexOf(filterValue) === 0);
  }

}
