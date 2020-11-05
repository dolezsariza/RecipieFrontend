import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from '../shared/services/repository.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: any;
  profileData: any = {};
  underEditing: boolean = false;
  errorMessage: string = "";
  editForm: FormGroup;
  editSuccessful: boolean = true;
  constructor(private fb: FormBuilder, private repository: RepositoryService, private errorHandler: ErrorHandlerService,private router: Router) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(){
    let apiAddress: string = `profile/${localStorage.getItem('user')}`;
    this.repository.getData(apiAddress)
    .subscribe(result => {
      this.user = result;
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }

  createEditForm(){
    this.editForm = this.fb.group({
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      introduction: [this.user.introduction]
    });
  }

  editProfile(){
    this.underEditing = true;
    this.createEditForm();
  }

  saveProfile(){
    let apiAddress: string = `profile/${localStorage.getItem('user')}`;
    this.repository.update(apiAddress,this.profileData)
    .subscribe(result => {
      console.log(result);
      this.errorMessage = "";
      this.editSuccessful = true;
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
      console.log(this.errorMessage);
      this.editSuccessful = false;
    })
  }

  cancel(){
    this.underEditing = false;
  }

  onSubmit(){
    this.profileData = Object.assign(this.profileData, this.editForm.value);
    console.log(localStorage.getItem('user'));
    this.saveProfile();
    setTimeout(() => {
      if(this.errorMessage === ""){
        this.router.navigate(['/profile'])
      }
      console.log(this.errorMessage);
    }, 2000);
  }

}
