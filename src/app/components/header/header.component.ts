import { Component, OnInit } from '@angular/core';

// testing only, figure out how to use a store
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: Observable<firebase.User>;
  constructor(
    public afAuth: AngularFireAuth,
    public flashMessage: FlashMessagesService) {
    this.user = afAuth.authState;
  }

  ngOnInit() {
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(data => {
        this.flashMessage.show(`Welcome ${this.user}`,
         {
           cssClass: 'alert-info',
           timeout: 3000
         });
      });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.flashMessage.show('You are logged out',
      {
        cssClass: 'alert-success',
        timeout: 3000
      });
  }
}
