import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  freshnessList = ["Brand New", "Second Hand", "Refurbished"];
  productForm!: FormGroup;
  actionBtn: string = "Save"; // dynamic button name (update/save)

  constructor(
    private formbuilder: FormBuilder,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) { }

  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      comment: ['', [Validators.required, Validators.maxLength(200)]],
      date: ['', Validators.required]
    });

    // Patch the injected value of edited row:
    if (this.editData) {
      this.actionBtn = "Update"; // also update btn name
      this.productForm.patchValue(this.editData);
    }
  }

  // Add product
  addProduct() {
    if (!this.editData) {
      // Add functionality:
      if (this.productForm.valid) {
        this.apiService.postProduct(this.productForm.value)
          .subscribe({
            next: (res) => {
              this.openSnackBar("Product added successfully", "Close");
              this.productForm.reset();
              this.dialogRef.close('save');
            },
            error: (error) => {
              console.error("Error while adding product:", error);
              this.openSnackBar("Error while adding product: " + (error.message || 'An unknown error occurred.'), "Close");
            }
          });
      }
    } else {
      // Update functionality:
      this.updateProduct();
    }
  }

  // Update product
  updateProduct() {
    this.apiService.putProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          this.openSnackBar("Product updated successfully", "Close");
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error: (error) => {
          console.error("Error while updating product:", error);
          this.openSnackBar("Error while updating the record: " + (error.message || 'An unknown error occurred.'), "Close");
        }
      });
  }

  // Method to open snackbar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'right', // Positioning on the screen
      verticalPosition: 'top',
    });
  }
}

