import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  idRole: string;
  isSuperAdmin: boolean;

  constructor() { }

  ngOnInit() {
    this.idRole = sessionStorage.getItem('role');
    if(this.idRole === '1'){
      this.isSuperAdmin = true;
    }
    else{
      this.isSuperAdmin = false;
    }
  }

}
