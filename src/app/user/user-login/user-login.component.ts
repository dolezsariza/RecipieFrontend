import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginForm: FormGroup;
  user: any = {}
  public errorMessage: string = "";
  constructor(private fb: FormBuilder, private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.fb.group({
      userName: [null, Validators.required],
      password:[null, Validators.required]
    });
  }

  loginUser = () => {
    let apiAddress: string = "login";
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
    return this.loginForm.get('userName') as FormControl;
  }
  get password(){
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit(){
    this.user = Object.assign(this.user, this.loginForm.value);
    this.loginUser();
    console.log(this.user);
  }

}
