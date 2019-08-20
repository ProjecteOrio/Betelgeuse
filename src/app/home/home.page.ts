import { Component } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  name = '';
  message = '';
  constructor(private socket: Socket) {}

  joinChat() {
    this.socket.connect();
    this.socket.emit('user-connect', this.name);
    console.log(this.socket);
  }

  sendMessage() {
    this.socket.emit('add-message', { user: this.name, text: this.message, date: new Date() });
    this.message = '';
  }

}
