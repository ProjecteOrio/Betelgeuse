import { Component, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  messages = [];
  name = 'dummy';
  message = '';

  constructor(private socket: Socket) { 
    this.name = 'dummy';

    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });

    this.getUsers().subscribe(data => {
      console.log(data['event']);
    });

  }

  ngOnInit() {
  }

  sendMessage () {
    this.socket.emit('add-message', { text: this.message } );
    this.message = '';
  }

  getMessages() {
    let observable = new Observable(observer => {
        this.socket.on('message', (data) => {
          observer.next(data);
        });
    });
    return observable;
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('broadcast', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

}
