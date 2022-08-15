import { Component, OnInit, ViewChild } from '@angular/core';
import { CommentsService } from '../comments.service';
import { Comment } from '../comment';
import { User } from '../user';
import { UserService } from '../user.service';
import { AlertsService } from '../alerts.service';

import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faAt, faPlus, faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  faComment = faComment;
  faAt = faAt;
  faPlus = faPlus;
  faClose = faClose;

  users: User[] = [];
  comments: Comment[] = [
    {
      message: 'Hey I need someone to take a look at this.',
      userID: 2,
      taggedUserID: 3,
      timestamp: '1660332817374'
    }
  ];


  constructor(public commentsService: CommentsService, private userService: UserService, public alertsService: AlertsService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getComments();
  }

  comment: Comment = {
    message: "",
    userID: 10,
    taggedUserID: 0,
    timestamp: ''
  }


  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  getComments(): void {
    this.commentsService.getComments().subscribe(comments => this.comments = comments);
  }

  getAuthor(comment: Comment) {
    let author: string = this.users.filter(user => user.userID === comment.userID)[0].name;
    return author;
  }

}
