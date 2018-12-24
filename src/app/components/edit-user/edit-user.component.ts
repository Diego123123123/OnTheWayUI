import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/models/user.model';
import { IPatch } from '../../models/patch.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalModule, TooltipModule, PopoverModule, ButtonsModule } from 'angular-bootstrap-md'
import { dateValidator } from '../../common/directives/date-validator.directive';
import { ChangePasswordService } from '../../services/change-password-service.service';
import { ChangePasswordUserLoggedInService } from '../../services/change-password-user-logged-in.service';
import { IForgot } from '../../models/forgot-my-password.model';
import { Router } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user: any;
  cardForm: FormGroup;
  emailForm: FormGroup;
  now: Date = new Date();
  min: Date = new Date();
  readyDate: boolean = false;
  ready: boolean = false;
  defaultProfileImg: String = "assets/images/default-user-icon.jpg"

  md5Key: any;

  constructor(private usersService: UserService, private fb: FormBuilder,
              private changePasswordService: ChangePasswordService,
              private changePasswordUserLoggedInService: ChangePasswordUserLoggedInService,
              private router: Router) {
    this.user = {}
    this.md5Key = "";
  }

  ngOnInit() {
    this.min.setFullYear(this.now.getFullYear() - 80);
    this.now.toLocaleDateString()
    this.usersService.getOneUser().subscribe(response  => {
      this.user = response;
      console.log('user', this.user);
    })
    this.cardForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('([A-Z][a-z]+[ ]{0,3})+')]],
      lastName: ['', [Validators.required, Validators.pattern('([A-Z][a-z]+[ ]{0,2})+')]],
    });
    this.emailForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern('(6|7)[0-9]*'), Validators.minLength(8), Validators.maxLength(8)]],
      birthday: ['', [Validators.required, dateValidator(this.min, this.now)]],
    });
  }

  verife(){
    this.ready = true;
  }

  verifeChange(){
    this.readyDate = true;
  }

  configure(modal){
    var phonePatch = this.emailForm.value.phone;
    var birthdayPatch = this.emailForm.value.birthday;
    var patchOperations = new Array<IPatch>();
    if (phonePatch !== this.user.phone) {
      let patchName: IPatch = {
        op: 'replace',
        path: '/phone',
        value: phonePatch,
      };
      patchOperations.push(patchName);
    }
    if (birthdayPatch !== this.user.birthday) {
      let patchLastName: IPatch = {
        op: 'replace',
        path: '/birthday',
        value: birthdayPatch,
      };
      patchOperations.push(patchLastName);
    }
    if (patchOperations.length > 0) {
      this.usersService.patchUser(patchOperations).subscribe(response => {
        console.log('this is response', response);
        this.user.phone = response['phone'];
        this.user.birthday = response['birthday'];
      });
      modal.hide();
    }
    console.log('phone ', phonePatch, ' birthday ', birthdayPatch);
  }

  configureImage(imageForm, modal){
    var imagePatch = imageForm.imageId;
    var patchOperations = new Array<IPatch>();
    if (imagePatch !== this.user.imageUserUrl) {
      let patchName: IPatch = {
        op: 'replace',
        path: '/imageUserId',
        value: imagePatch,
      };
      patchOperations.push(patchName);
    }
    if (patchOperations.length > 0) {
      this.usersService.patchUser(patchOperations).subscribe(response => {
        this.user.imageUserUrl = imageForm.urlImage;
      });
      modal.hide();
    }
  }

  configureDatas(modal){
    var namePatch = this.cardForm.value.name;
    var lastNamePatch = this.cardForm.value.lastName;
    var patchOperations = new Array<IPatch>();
    if (namePatch !== this.user.name) {
      let patchName: IPatch = {
        op: 'replace',
        path: '/name',
        value: namePatch,
      };
      patchOperations.push(patchName);
    }
    if (lastNamePatch !== this.user.lastName) {
      let patchLastName: IPatch = {
        op: 'replace',
        path: '/lastName',
        value: lastNamePatch,
      };
      patchOperations.push(patchLastName);
    }
    if (patchOperations.length > 0) {
      this.usersService.patchUser(patchOperations).subscribe(response => {
        console.log('this is response', response);
        this.user.name = response['name'];
        this.user.lastName = response['lastName'];
      });
      modal.hide();
    }
    console.log('name ', namePatch, ' last name ', lastNamePatch);
  }

  /*
  This method calls to the controller to change password, when a User is register and
  logged succesfully.
  */
  changePassword(userEmail: any) {
    let password: IForgot = {
      email: userEmail
    }
    this.changePasswordUserLoggedInService.changePasswordUserLoggedIn(password).subscribe(response => {
      this.md5Key = response;
      this.router.navigate(['change-password', this.md5Key]);
    });
  }
}
