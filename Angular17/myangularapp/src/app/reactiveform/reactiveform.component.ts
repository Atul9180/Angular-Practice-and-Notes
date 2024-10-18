import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reactiveform',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './reactiveform.component.html',
  styleUrl: './reactiveform.component.css'
})
export class ReactiveformComponent implements OnInit {

  //created a formGroup:
  regForm!: FormGroup;

  //then create constructor: with dependency injection so as new keyword is not required much
  constructor(private _fb:FormBuilder){} 

  ngOnInit(){
    // to avoid overuse of new keyword as memory releasing will be tough, use formBUilder dependency injection and creating formGroup oject by the FormBuilder instance :
    // used Validators.compose to compose multiple validators together , make approach fast...
    this.regForm = this._fb.group({ 
        fname: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
        lname: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
        email: ['', Validators.compose([Validators.required, Validators.email])], 
        password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])] 
      });



    // // detecting Partial form fields value chnages:::: say doing setState of react ==========
    // this.regForm.get('fname')?.valueChanges.subscribe(newVal=>{console.log(newVal)});

    // // detecting whole formGroup fields value chnages:::: say doing setState of react ==========
     this.regForm.valueChanges.subscribe(newVal=>{console.log("whole form changes: ",newVal)});

    // // detecting Partial form fields status changes: (valid or invalid curr status based on validators of that Formcontrol) =============
    //  this.regForm.get('fname')?.statusChanges.subscribe(newVal=>{console.log(newVal)});

    // // detecting whole formGroup fields status changes: (valid or invalid curr status based on validators of that Formcontrol) ==============
     this.regForm.statusChanges.subscribe(newVal=>{console.log("whole form status changes: ",newVal)});
  }

  //register method:
   register() {
    console.log(this.regForm.value);
    if (this.regForm.valid) {
      console.log("Valid form");
      console.log("string format, single control value of fname: ",this.regForm.get('fname')!.value)
    } else {
      console.log("Invalid form");
      this.regForm.markAllAsTouched();
    }
  }

  // reset all the fields except one declared here: say let rest data form same only reset sensitive fields to blank:
  resetFields(){
    // give here fields that you do not want to reset:
    this.regForm.reset({
      fname:this.regForm.get('fname')!.value,
      lname:this.regForm.get('lname')!.value,
      email:this.regForm.get('email')!.value
    });
  }

  // update all form fields ...
  updateFullForm(){
    this.regForm.setValue({
      //give all controlls here...refers to .ts declared formGroup definition...no matter declared field binded in form or not if using .setValue , have to give all fields...
      // Useful to bind form with some values: helpful say in editing,updating form/profile etc:
      fname:"Rahul",
      lname:"Sharma",
      email:"rkhul@gmail.com",
      password:"hellopassword"
    })
  }



  // update Partial form fields ...
  updatePartialForm(){
    this.regForm.patchValue({
      //give few controlls here...refers to .ts declared formGroup definition.
      //Useful to bind form with some values: helpful say in prefilling some form fields say : user name , id etc...
      email:"rkhul@gmail.com",
    })
  }
}
