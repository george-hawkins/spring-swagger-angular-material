import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatButtonModule } from '@angular/material';


import { AppComponent } from './app.component';
import { MyCardComponent } from './my-card/my-card.component';
import { MyConsoleService } from './my-console.service';
import { MyConsoleComponent } from './my-console/my-console.component';


@NgModule({
  declarations: [
    AppComponent,
    MyCardComponent,
    MyConsoleComponent
  ],
  imports: [
    BrowserModule
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [MyConsoleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
