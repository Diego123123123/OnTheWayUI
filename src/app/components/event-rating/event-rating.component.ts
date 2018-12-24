import { Component, OnInit, OnDestroy } from '@angular/core';
import { IEvent } from '../../models/event.model';
import { FormControl, Validators } from '@angular/forms';
import { EventsService } from '../../services/events.service';
import { ActivatedRoute } from '@angular/router';
import { IComment, IResponse, IAddComment } from '../../models/comment.model';
import { IParams } from '../../models/params.model';
import { EventsCalendarService } from '../../services/events-calendar.service';
import { CommentsService } from '../../services/comments.service';
import { DialogService } from '../../common/dialog/dialog.service';
import { TypeOfDialog, IconOfDialog, IDialog } from '../../common/dialog/dialog.model';
import { IPatch } from '../../models/patch.model';
import { AlertService } from 'src/app/common/alert/alert.service';
import { IconOfAlert, ColorOfAlert, IAlert } from 'src/app/common/alert/alerts.model';
import { CurrentUserService } from '../user/current-user.service';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-event-rating',
  templateUrl: './event-rating.component.html',
  styleUrls: ['./event-rating.component.scss']
})
export class EventRatingComponent implements OnInit, OnDestroy {

  private rate: Array<any>;
  private event: IEvent;
  subscriptionFormModalComment = new FormControl('', Validators.required);
  eventId: string;
  comments: IResponse<IComment>;
  preferenceId: string;
  available: Boolean = false;
  score: any[];
  private userRef: Subscription = null;
  user: IUser;
  userImage: string;
  constructor(private eventsService: EventsService, private route: ActivatedRoute, private commentsService: CommentsService,
    private dialogService: DialogService, private preferenceService: EventsCalendarService, private alertService: AlertService,
    private currentUserService: CurrentUserService) { }

  ngOnInit() {
    this.userRef = this.currentUserService.userSubject$.subscribe((newUser: IUser) => {
      this.user = newUser;
      this.userImage = this.user.imageUserUrl;
    });
    this.userImage = '';
    this.refresh();
  }

  ngOnDestroy() {
    this.userRef.unsubscribe();
  }

  refresh() {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.preferenceId = this.route.snapshot.paramMap.get('preferenceId');
    const params: Array<IParams> = [{key: 'preferenceId', value: Number(this.preferenceId)}];
    this.commentsService.getComments(params).subscribe((response: IResponse<IComment>) => {
      this.available = response.count >= 1 ? false : true;
    });
    this.eventsService.getEventById(Number(this.eventId)).subscribe((response: IEvent) => {
      this.event = {...response};
      this.rate = [...this.starPaint(this.event.average)];
    });
    this.eventsService.getCommentByEvent(Number(this.eventId)).subscribe((response: IResponse<IComment>) => {
      this.comments = {...response};
    }, error => {
      console.log(error);
    });
    this.score = this.starPaint(1);
  }

  onSelect(index: number) {
    this.score = [...this.starPaint(index)];
  }

  starPaint(value: number) {
    let rate = [];
    for (let index = 0; index < 5; index++) {
      let val: Boolean = false;
      if (index < value) {
        val = true;
      }
      rate = [...rate, val];
    }
    return rate;
  }

  async addComment(frame) {
    frame.hide();
    const rating: number = this.score.filter(element => element).length;
    let dialog: IDialog;
    let alertOptions: IAlert;
    const patchNamePlace: IPatch = {
      op: 'replace',
      path: '/rating',
      value: rating,
    };
    const patchOperations: Array<IPatch> = [patchNamePlace];
    await this.preferenceService.patchRating(Number(this.preferenceId), patchOperations).subscribe(response => {
      console.log(response);
      this.sendComment().then(response => {
        alertOptions = {
          icon: IconOfAlert.SUCCESS,
          color: ColorOfAlert.SUCCESS,
          title: 'SUCCESSFUL!',
          message: 'Your rating has been successfully sent',
          durationTime: 5000
        };
        this.alertService.Options = alertOptions;
        this.refresh();
      }).catch(error => {
        alertOptions = {
          icon: IconOfAlert.DANGER,
          color: ColorOfAlert.DANGER,
          title: 'ERROR!',
          message: `Has been an error: ${error}`,
          durationTime: 5000
        };
        this.alertService.Options = alertOptions;
      });
    });
  }

  sendComment(): Promise<any> {
    return new Promise((resolve, reject) => {
      const addComment: IAddComment = {
        preferenceId: Number(this.preferenceId),
        date: new Date(),
        message: this.subscriptionFormModalComment.value,
      };
      this.commentsService.addComment(addComment).subscribe(response => {
        console.log(response);
        resolve(response);
      }, error => reject(error));
    });
  }

}
