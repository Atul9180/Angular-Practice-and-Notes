import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';


// Custom validator function for mobile number
function mobileNumberValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const value = control.value;
  // Check if the input is a valid number (starting with 6-9 and 10 digits long)
  const isValidNumber = /^[6-9]\d{9}$/.test(value);
  return !isValidNumber ? { invalidMobile: true } : null;
}

@Component({
  selector: 'app-reactive-form-array',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './reactive-form-array.component.html',
  styleUrl: './reactive-form-array.component.css'
})
export class ReactiveFormArrayComponent {

  constructor(private _fb:FormBuilder) {}

// creating form group:
  regForm!:any;

  ngOnInit(){
    // Initialize the form with an empty FormArray for mobiles
    this.regForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      mobiles: this._fb.array([
        this._fb.control('', [Validators.required, mobileNumberValidator])
      ])
    });
  }


  // DYNAMIC FORM CONTROLLERS METHOD:====
   // Method to delete a mobile control
  deletemobileidx(idx:number){
    this.regForm.get('mobiles').removeAt(idx)
  }

  // to add another control....simply push new FormControl in FormArray
  addmoreControlidx(){
    this.mobiles.push(this._fb.control('', [Validators.required, mobileNumberValidator]));
  }

  // Getter for accessing the mobiles FormArray
  get mobiles(): FormArray {
    return this.regForm.get('mobiles') as FormArray;
  }

  submitForm() {
    console.log(this.regForm.value);
    if (this.regForm.valid) {
      console.log("Valid form: ",this.regForm.value );
    } 
    else {
       // Mark all controls as touched to show validation messages
      this.regForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }

}
