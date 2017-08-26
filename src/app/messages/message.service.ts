import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  private messages: string[] = [];
  isDisplay = false;

  constructor() { }

  addMessage(message: string): void {
    const currentDate = new Date();
    this.messages.unshift(message + ' at ' + currentDate.toLocaleDateString());
  }

}
