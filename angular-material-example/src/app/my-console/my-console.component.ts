import { Component, OnInit } from '@angular/core';
import { MyConsoleService } from '../my-console.service';

@Component({
  selector: 'app-my-console',
  templateUrl: './my-console.component.html',
  styleUrls: ['./my-console.component.css']
})
export class MyConsoleComponent implements OnInit {

  constructor(public myConsoleService: MyConsoleService) { }

  ngOnInit() {
  }

}
