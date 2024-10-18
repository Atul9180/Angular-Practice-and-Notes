import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router, private route: ActivatedRoute,private _fb:FormBuilder) {}


  regForm:FormGroup =  this._fb.group({
    email:['',[Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]] 
  })

  ngOnInit(){}

  // login method:
  login() {
    console.log(this.regForm.value);
    if (this.regForm.valid) {
      console.log("Valid form" );
      const { email, password } = this.regForm.value;

      if(email==="atul@gmail.com" && password==="atul"){
        // Set local storage for logged in status
        sessionStorage.setItem("isloggedIn", "true");

        // Redirect to the return URL or home
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/home';
        this.router.navigate([returnUrl]);
      } else {
        sessionStorage.setItem("isloggedIn", "false");
        alert('Invalid credentials!');
      }
    } else {
      this.regForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }

  // Cancel method
  cancel() {
    this.router.navigate(['/home']);  // Redirect to home or clear fields, adjust as needed
  }

}
