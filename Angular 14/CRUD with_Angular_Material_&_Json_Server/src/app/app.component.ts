import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CRUD APPLICATION WITH SCSS AND MATERIAL';
  
  constructor(private dialog:MatDialog,private apiservice:ApiService){}


  ngOnInit(): void {
    this.getAllProducts();
  }



  // open model :
  openDialog() {
    // pass component whose data want on model
    this.dialog.open(DialogComponent, {
      minWidth: '40vw',
      minHeight: '40vh'
    });
  }



  //get data from api :
  getAllProducts(){
    this.apiservice.getProduct()
    .subscribe({
      next:(res)=>{
          console.log("fetched products from api: ",res)
          alert("successful fetch");
      },
      error:()=>{
        console.log("Error in fetching products.");
        alert("Error while fetching rrecords.")
      }
    })
  }



}
