import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompareValidatorDirective, compareValidator } from '../../common/directives/compare-validator.directive';
import { DialogService } from '../../common/dialog/dialog.service';
import { IDialog, TypeOfDialog, IconOfDialog } from '../../common/dialog/dialog.model';
import { ChangePasswordService } from '../../services/change-password-service.service';
import { IPassword } from '../../models/change-password.model';
import { ActivatedRoute } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  private key: any;
  cardForm: FormGroup;
  show: boolean = false;
  passwordConfirmed: boolean = false;
  constructor(private _md5: Md5, private route: ActivatedRoute, private fb: FormBuilder, private dialogService: DialogService, private passwordService: ChangePasswordService) { }

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('key');
    this.cardForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password2: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), compareValidator('password')]]
    });
    this.checkPasswords();
  }

  onSubmit(cardForm): void {
    this._md5 = new Md5();
    var md5Pass: any;
    md5Pass = this._md5.appendStr(this.cardForm.value.password).end();
    let password: IPassword = {
      password: md5Pass
    }
    console.log(password);
    console.log(this.key);
    let dialog: IDialog;
    this.passwordService.changePassword(this.key, password).subscribe(response => {
      console.log(response);
      dialog = {
        title: 'Successful',
        description: 'Your password has been changed correctly',
        btnYes: 'Accept',
        type: TypeOfDialog.SUCCESS,
        icon: IconOfDialog.SUCCESS,
        redirectBtnYes: '/login-form',
        ignoreBackdrop: true
      };
      this.dialogService.options(dialog);
    }, error => {
      dialog = {
        title: 'Error',
        description: 'Your password wasn\'t changed',
        btnNo: 'Accept',
        type: TypeOfDialog.DANGER,
        icon: IconOfDialog.DANGER,
        keyboardEsc: true
      };
      this.dialogService.options(dialog);
    }, () => {
      console.log('finish');
    });
  }

  checkPasswords(): any {
    this.cardForm.controls.password2.valueChanges.subscribe((value) => {
      let password = this.cardForm.controls.password;
      this.passwordConfirmed = (password.invalid || password.value !== value) ? false : true;
    });
  }

}
