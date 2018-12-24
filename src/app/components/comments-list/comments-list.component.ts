import { Component, OnInit, Input } from '@angular/core';
import { IComment, IResponse } from '../../models/comment.model';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {

  @Input('comments') comments: IResponse<IComment>;

  constructor() { }

  ngOnInit() {
  }

}
