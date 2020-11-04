import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.css']
})
export class UserLogoutComponent implements OnInit {

  logoutSuccessful: boolean = false;
  public errorMessage: string = "";
  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit(): void {
    this.logoutUser();
    setTimeout(() => {
      if(this.errorMessage === ""){
        this.router.navigate(['/home'])
      }
      console.log(this.errorMessage);
    }, 2000);
  }

  logoutUser(){
    let apiAddress: string = "logout";
    this.repository.create(apiAddress, "")
    .subscribe(result => {
      localStorage.removeItem("user")
      this.logoutSuccessful = true;
      this.errorMessage = "";
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
      console.log(this.errorMessage);
      this.logoutSuccessful = false;
    })
  }
}
