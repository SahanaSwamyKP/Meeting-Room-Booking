import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  changePasswordForm: FormGroup;
  submitted = false;
  successMessage = '';

  constructor(private formBuilder: FormBuilder) {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { 
      validator: this.checkPasswords 
    });
  }

  // Custom validator to check if new password and confirm password match
  checkPasswords(group: FormGroup) {
    let pass = group.get('newPassword')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  // Getter for easier access to form fields
  get f() { return this.changePasswordForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop if form is invalid
    if (this.changePasswordForm.invalid) {
      return;
    }

    // Call the service to change the password
    // Assume a passwordChangeService is available to handle the API request
    // this.passwordChangeService.changePassword(this.changePasswordForm.value).subscribe(
    //   response => {
    //     this.successMessage = 'Password changed successfully!';
    //   },
    //   error => {
    //     // Handle error (e.g., show a message to the user)
    //   }
    // );

    console.log('Form submitted', this.changePasswordForm.value);
    this.successMessage = 'Password changed successfully!'; // Temporary success message
  }
}

