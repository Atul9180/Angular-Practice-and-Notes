import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

//for referencing dialog controls of Component where dialog is:(DialogComponent) like close...
import {MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnessList = ["Brand New", "Second Hand", "Refurbished"]
  productForm!: FormGroup;

  constructor(private formbuilder:FormBuilder, private apiService:ApiService, private dialogRef:MatDialogRef<DialogComponent> ) { }

  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      category : ['',Validators.required],
      freshness : ['',Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      comment: ['', [Validators.required, Validators.maxLength(200)]],
      date : ['',Validators.required]
    })
  }


  //add product
  addProduct(){
    console.log("form click: ",this.productForm.value);
    if(this.productForm.valid){
      this.apiService.postProduct(this.productForm.value)
      .subscribe({
        //runs on success
        next:(res)=>{
          alert("Product added successfully");
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        //runs in case of error
        error:()=>{
          alert("Error while adding product.");
        }
        //now is complete
      })
    }
  }

}
