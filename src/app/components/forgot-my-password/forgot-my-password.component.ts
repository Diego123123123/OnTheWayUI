import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompareValidatorDirective, compareValidator } from '../../common/directives/compare-validator.directive';
import { DialogService } from '../../common/dialog/dialog.service';
import { IDialog, TypeOfDialog, IconOfDialog } from '../../common/dialog/dialog.model';
import { ForgotMyPasswordService } from '../../services/forgot-my-password.service';
import { IForgot } from '../../models/forgot-my-password.model';

@Component({
  selector: 'app-forgot-my-password',
  templateUrl: './forgot-my-password.component.html',
  styleUrls: ['./forgot-my-password.component.scss']
})
export class ForgotMyPasswordComponent implements OnInit {

  cardForm: FormGroup;
  show: boolean = false;
  passwordConfirmed: boolean = false;
  constructor(private fb: FormBuilder, private dialogService: DialogService, private passwordService: ForgotMyPasswordService) { }

  ngOnInit() {
    this.cardForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  onSubmit(cardForm): void {
    let password: IForgot = {
      email: cardForm.value.email
    }
    console.log(password);
    let dialog: IDialog;
    this.passwordService.forgotMyPassword(password).subscribe(response => {
      console.log(response);
      dialog = {
        title: 'Successful',
        description: 'Please confirm your change you have been sent an email',
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
        description: 'The email is wrongly written or the doesn\'t register',
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
}
