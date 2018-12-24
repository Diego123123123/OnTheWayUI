import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompareValidatorDirective, compareValidator } from '../../common/directives/compare-validator.directive';
import { DialogService } from '../../common/dialog/dialog.service';
import { CreateFacebookEventService } from '../../services/create-facebook-event-service.service';
import { IDialog, TypeOfDialog, IconOfDialog } from '../../common/dialog/dialog.model';
import { IEventFacebook } from '../../models/facebook-event.model';


@Component({
  selector: 'app-create-facebook-event',
  templateUrl: './create-facebook-event.component.html',
  styleUrls: ['./create-facebook-event.component.scss']
})
export class CreateFacebookEventComponent implements OnInit {
  cardForm: FormGroup;
  constructor(private fb: FormBuilder, private dialogService: DialogService, private facebookService: CreateFacebookEventService) { }


  ngOnInit() {
    this.cardForm = this.fb.group({
      eventId: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(8), Validators.maxLength(20)]],
    });
  }

  onSubmit(cardForm): void {
    let eventFacebook: IEventFacebook = {
      eventId: cardForm.value.eventId
    }
    console.log(eventFacebook);
    let dialog: IDialog;
    this.facebookService.postFacebookEvent(eventFacebook).subscribe(response => {
      dialog = {
        title: 'Successful',
        description: 'Your Facebook event has been created',
        btnYes: 'Accept',
        type: TypeOfDialog.SUCCESS,
        icon: IconOfDialog.SUCCESS,
        redirectBtnYes: '/event-detail/' + response['eventId'],
        ignoreBackdrop: true
      };
      this.dialogService.options(dialog);
    }, error => {
      dialog = {
        title: 'Error',
        description: 'Your Facebook Event wasn\'t Created because ' + error['error'],
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
