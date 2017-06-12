import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private flashMessages: FlashMessagesService,
    private auth: AuthService) {}

  ngOnInit() {
  }

  login() {
    this.auth.login('root@root.com', 'root00')
      .then(data => {
        this.flashMessages.show(`Welcome ${this.auth.user}`,
         {
           cssClass: 'alert-info',
           timeout: 3000
         });
         console.log(this.auth.user);
      });
  }

  logout() {
    this.auth.logout();
    this.flashMessages.show('You are logged out',
      {
        cssClass: 'alert-success',
        timeout: 3000
      });
  }
}
