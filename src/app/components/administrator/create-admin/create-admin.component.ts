import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompareValidatorDirective, compareValidator } from '../../../common/directives/compare-validator.directive';
import { dateValidator } from '../../../common/directives/date-validator.directive';
import { DialogService } from '../../../common/dialog/dialog.service';
import { IDialog, TypeOfDialog, IconOfDialog } from '../../../common/dialog/dialog.model';
import { UserService } from '../../../services/user.service';
import { IUser } from '../../../models/user.model';



@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})
export class CreateAdminComponent implements OnInit {
  cardForm: FormGroup;
  show: boolean = false;
  passwordConfirmed: boolean = false;
  now: Date = new Date();
  min: Date = new Date(0,0,1);
  max: Date = new Date(0,11,31);
  @ViewChild('date') date;

  constructor(private fb: FormBuilder, private dialogService: DialogService, private userService: UserService) {}

  ngOnInit() {
    this.min.setFullYear(this.now.getFullYear() - 80);
    this.max.setFullYear(this.now.getFullYear() - 10);
    this.cardForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('([A-Z][a-z]+[ ]{0,1})+')]],
      lastName: ['', [Validators.required, Validators.pattern('([A-Z][a-z]+[ ]{0,1})+')]],
      cellPhone: ['', [Validators.required, Validators.pattern('(6|7)[0-9]*'), Validators.minLength(8), Validators.maxLength(8)]],
      email: ['', [Validators.email, Validators.required]],
      birthday: ['', [Validators.required, dateValidator(this.min, this.max)]]
    });
    this.date.nativeElement.min = this.min.toISOString().split('T')[0];
    this.date.nativeElement.max = this.max.toISOString().split('T')[0];
  }

  onSubmit(cardForm): void {
    let birthday: Date = new Date(cardForm.value.birthday);
    console.log(birthday.toISOString());
    let user: IUser = {
      name: cardForm.value.name,
      lastName: cardForm.value.lastName,
      email: cardForm.value.email,
      password: 'adminConfirm',
      birthday: birthday.toISOString(),
      phone: cardForm.value.cellPhone,
      roleId: 2
    }
    console.log(user);
    let dialog: IDialog;
    this.userService.addUser(user).subscribe( response => {
      console.log(response);    
      dialog = {
        title: 'Successful',
        description: 'You created the account successfully, the new administrator '+ cardForm.value.name + ' will receive a confirmation Email.',
        btnYes: 'Accept',
        type: TypeOfDialog.SUCCESS,
        icon: IconOfDialog.SUCCESS,
        redirectBtnYes: '/admin-page',
        ignoreBackdrop: true
      };
      this.dialogService.options(dialog);
    }, error => {
      var errMsg = 'Your account wasn\'t created';
      if (error.status == 400)
        errMsg = error.error
      dialog = {
        title: 'Error',
        description: errMsg,
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
