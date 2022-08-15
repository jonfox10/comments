import { Component, OnInit, Output } from '@angular/core';
import { CommentsService } from '../comments.service';
import { Comment } from '../comment';
import { User } from '../user';
import { UserService } from '../user.service';
import { AlertsService } from '../alerts.service';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faAt, faPlus, faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent implements OnInit {
  faComment = faComment;
  faAt = faAt;
  faPlus = faPlus;
  faClose = faClose;

  users: User[] = [];
  comments: Comment[] = [];
  showUserList = false;
  taggedUser?: User;

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

  addComment(message: string) {
    if (message.trim().length === 0) {
      return
    }
    let comment: Comment = {
      message,
      userID: Math.floor((Math.random() * 3) + 1),
      taggedUserID: this.taggedUser ? this.taggedUser.userID : 0,
      timestamp: `${Date.now()}`
    };

    this.comments.push(comment);
    this.comment.message = '';
    if (this.taggedUser) {
      this.alertsService.remove();
      this.alertsService.add(`Hey ${this.taggedUser.name}, you have been tagged in a comment!`);
    }
  }

  addTaggInput(event: any, message: string) {
    if (event.key === '@') {
      this.showUserList = true;
    } else if (event.key === ' ') {
      this.showUserList = false;
    }
  }

  seeUserList() {
    this.showUserList = !this.showUserList;
    if (this.comment.message[this.comment.message.length - 1] !== '@') {
      this.comment.message = this.comment.message.concat('@');
    }
  }


  taggUser(user: User) {
    const name: string = user.name;
    const userID: number = user.userID;

    const regex = /[@]/gm;
    this.comment.message = this.comment.message.replace(regex, `@${name}`);
    this.comment.taggedUserID = userID;
    this.showUserList = false;
    this.taggedUser = user;
  }
}
