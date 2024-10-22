import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

// for referencing dialog controls of Component where dialog is:(DialogComponent) like close...
// Mat_dialog_data for injecting data(row) to referencing ref(modal) and then patching data :
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnessList = ["Brand New", "Second Hand", "Refurbished"]
  productForm!: FormGroup;

  constructor(private formbuilder:FormBuilder,
              private apiService:ApiService, 
              @Inject(MAT_DIALOG_DATA) public editData: any,   // here editData will have editing row value injected
              private dialogRef:MatDialogRef<DialogComponent> ) { }



  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      category : ['',Validators.required],
      freshness : ['',Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      comment: ['', [Validators.required, Validators.maxLength(200)]],
      date : ['',Validators.required]
    });


    //checking for editdata injected or not:
    console.log("injected to edit data: ",this.editData);
    //now patch the injected value of edited row:
    if(this.editData){
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }


    
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
