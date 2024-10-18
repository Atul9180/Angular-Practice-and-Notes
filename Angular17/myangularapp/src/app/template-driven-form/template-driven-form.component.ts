import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './template-driven-form.component.html',
  styleUrl: './template-driven-form.component.css'
})
export class TemplateDrivenFormComponent {
  // Method to handle form submission
  register(form: NgForm) {
    if (form.valid) {
      // form.valid : worksa with required keyword
      console.log('Form Submitted!',form.value );
    } else {
      console.log('Form is invalid');
    }
  }
}
