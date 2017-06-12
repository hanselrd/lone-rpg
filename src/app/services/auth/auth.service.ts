import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as Firebase from 'firebase/app';

@Injectable()
export class AuthService {
  private state: Observable<Firebase.User>;
  user: Firebase.User;

  constructor(private afAuth: AngularFireAuth) {
    this.state = afAuth.authState;
    this.state.subscribe((value: Firebase.User) => this.user = value);
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
