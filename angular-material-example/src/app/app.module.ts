import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';


import { AppComponent } from './app.component';
import { MyCardComponent } from './my-card/my-card.component';
import { MyConsoleService } from './my-console.service';
import { MyConsoleComponent } from './my-console/my-console.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { MyDialogOpenerComponent } from './my-dialog-opener/my-dialog-opener.component';


@NgModule({
  declarations: [
    AppComponent,
    MyCardComponent,
    MyConsoleComponent,
    MyDialogComponent,
    MyDialogOpenerComponent
  ],
  entryComponents: [MyDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [MyConsoleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
