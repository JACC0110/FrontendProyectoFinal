import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Friend } from '../interfaces/friend';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  constructor() {
    this.socket = io('http://localhost:3000');
  }

  onInitialData(): Observable<Friend[]> {
    return new Observable<Friend[]>((observer) => {
      this.socket.on('initialData', (data: Friend[]) => {
        observer.next(data);
      });
    });
  }

  onFriendUpdate(): Observable<Friend> {
    return new Observable<Friend>((observer) => {
      this.socket.on('myFriendUpdated', (data: Friend) => {
        observer.next(data);
      });
    });
  }
}
