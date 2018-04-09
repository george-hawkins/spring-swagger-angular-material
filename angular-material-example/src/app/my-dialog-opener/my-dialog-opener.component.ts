import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import { MyConsoleService } from '../my-console.service';

@Component({
  selector: 'app-my-dialog-opener',
  templateUrl: './my-dialog-opener.component.html',
  styleUrls: ['./my-dialog-opener.component.css']
})
export class MyDialogOpenerComponent implements OnInit {
  animal: string;
  name: string;

    constructor(
      public dialog: MatDialog,
      private myConsoleService: MyConsoleService,
    ) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(MyDialogComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.myConsoleService.add('The dialog was closed');
      this.myConsoleService.add(result ? `The result was ${result}` : 'Nothing was entered');
      this.animal = result;
    });
  }

  ngOnInit() {
  }

}
