import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CRUD APPLICATION WITH SCSS AND MATERIAL';
  
  constructor(private dialog:MatDialog){}

  openDialog() {
    // pass component whose data want on model
    this.dialog.open(DialogComponent, {
      minWidth: '40vw',
      minHeight: '40vh'
    });
  }



}
