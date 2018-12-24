import { Component, OnInit } from '@angular/core';
import { Site } from '../../models/site';
import { Router } from '@angular/router';
import { SitesListService } from './sites-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sites-list',
  templateUrl: './sites-list.component.html',
  styleUrls: ['./sites-list.component.scss']
})
export class SitesListComponent implements OnInit {

  sites: Array<Site>;
  private eventsRef: Subscription = null;

  constructor( private router: Router, private sitesListService: SitesListService) {
    this.sites = [];
  }

  ngOnInit() {
    this.eventsRef = this.sitesListService.sitesSubject$.subscribe((response) => {
      this.sites = <Array<Site>> this.sitesListService.Sites;
      console.log("1", this.sites);
      console.log("2", response);
      console.log("modificado sites");
    });
  }

  showSite(site: Site) {
    this.router.navigate(['/site-detail', site.siteId]);
  }

  ngOnDestroy() {
    this.eventsRef.unsubscribe();
  }

}
