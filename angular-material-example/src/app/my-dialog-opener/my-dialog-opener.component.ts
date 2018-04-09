import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { MyDialogComponent } from '../my-dialog/my-dialog.component';

@Component({
  selector: 'app-my-dialog-opener',
  templateUrl: './my-dialog-opener.component.html',
  styleUrls: ['./my-dialog-opener.component.css']
})
export class MyDialogOpenerComponent implements OnInit {
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(MyDialogComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

  ngOnInit() {
  }

}
