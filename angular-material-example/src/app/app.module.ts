import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { MyCardComponent } from './my-card/my-card.component';
import { MyConsoleService } from './my-console.service';
import { MyConsoleComponent } from './my-console/my-console.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { MyDialogOpenerComponent } from './my-dialog-opener/my-dialog-opener.component';
import { ApiModule } from './api';

import { BASE_PATH } from './api/variables';


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
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ApiModule
  ],
  providers: [
    MyConsoleService, 
    {
      provide: BASE_PATH,
      useValue: 'http://localhost:8080'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
