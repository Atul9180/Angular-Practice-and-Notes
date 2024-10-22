import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnessList = ["Brand New", "Second Hand", "Refurbished"]
  productForm!: FormGroup;

  constructor(private formbuilder:FormBuilder ) { }

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
  }

}
