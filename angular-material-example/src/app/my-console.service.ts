import { Injectable } from '@angular/core';

@Injectable()
export class MyConsoleService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }
}
