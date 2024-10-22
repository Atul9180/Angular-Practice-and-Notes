import { AfterViewInit,Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';

// for table 
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';



// interface of type api response:
export interface ProductData {
  id?: string;
  productName: string;
  category: string;
  date: string;
  freshness: string;
  price:number;
  comment: string;
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {
  title = 'CRUD APPLICATION WITH SCSS AND MATERIAL';
  
  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness', 'price', 'comment' ];
  // without api response type interface
  dataSource!: MatTableDataSource<any>;
  // with api response type interface
  // dataSource!: MatTableDataSource<ProductData>;



  //create viewChild to handle pagination and sorting :
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



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
          this.dataSource = new MatTableDataSource(res);    //store whatever response get it inside table data source
          this.dataSource.paginator = this.paginator; //initialize paginator viewchild..
          this.dataSource.sort = this.sort; // initialize sort from viewchild...
        },
      error:()=>{
        console.log("Error in fetching products.");
        alert("Error while fetching rrecords.")
      }
    })
  }



  // life cycle method ,ensuring data is availbale for view to facilitate voewChild decorator:
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }




  // filtering method using matpaginatorModule:
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
