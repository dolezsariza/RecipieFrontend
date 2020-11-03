import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm: FormGroup;
  user: any = {}
  public errorMessage: string = '';
  constructor(private fb: FormBuilder, private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit(): void {
    this.createRegistrationForm();
  }

  createRegistrationForm(){
    this.registrationForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password:[null, [Validators.required, Validators.minLength(6)]],
        //Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])$')]],
      confirmPassword: [null, Validators.required]
    },{validators: this.passwordMatchingValidator});
  }

  passwordMatchingValidator(fg: FormGroup): Validators{
    return fg.get('password').value === fg.get('confirmPassword').value ? null : 
      {notMatched: true}
    
  }

  addUserToDatabase = () => {
    let apiAddress: string = "register";
    this.repository.create(apiAddress, this.user)
    .subscribe(result => {
      console.log(result);
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }
  //-------------------------------------
  // Getter methods for all form controls
  //-------------------------------------
  get userName(){
    return this.registrationForm.get('userName') as FormControl;
  }
  get email(){
    return this.registrationForm.get('email') as FormControl;
  }
  get password(){
    return this.registrationForm.get('password') as FormControl;
  }
  get confirmPassword(){
    return this.registrationForm.get('confirmPassword') as FormControl;
  }
  

  onSubmit(){
    this.user = Object.assign(this.user, this.registrationForm.value);
    this.addUserToDatabase();
    this.router.navigate(['/login'])
  }
}
