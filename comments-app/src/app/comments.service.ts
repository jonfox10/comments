import { Injectable } from '@angular/core';
import { Comment } from './comment';
import { COMMENTS } from './mock-comments';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  getComments(): Observable<Comment[]> {
    const comments = of(COMMENTS);
    return comments;
  }

  constructor() { }
}
