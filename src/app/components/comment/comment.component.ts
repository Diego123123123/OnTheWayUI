import { Component, OnInit, Input } from '@angular/core';
import { IComment } from '../../models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input('comment') comment: IComment;
  private rate: Array<any>;
  date: Date;

  constructor() { }

  ngOnInit() {
    this.date = new Date(this.comment.date)
    this.rate = [];
    for (let index = 0; index < 5; index++) {
      let val: boolean = false;
      if(index < this.comment.rating) {
        val = true;
      }
      this.rate = [...this.rate, val];
    }
  }

}
