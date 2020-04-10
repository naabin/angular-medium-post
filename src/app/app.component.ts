import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordMatchVaildator } from './passwordmatch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //Here we are using dependency injection to use the custom validator
  constructor(private passwordMatchValidator: PasswordMatchVaildator){}


  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    
  }, {validators: this.passwordMatchValidator.validate})//This is the custom validator


  //Helper method to determince the form has any errors
  isFormError(){
    const {errors} = this.signupForm;
    const passwordTouched = this.signupForm.get('password').touched;
    const confirmPasswordTouched = this.signupForm.get('confirmPassword').touched;
    return errors && passwordTouched && confirmPasswordTouched;
  }
  
}
