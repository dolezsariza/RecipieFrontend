import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from '../shared/services/repository.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: any;
  errorMessage: string = "";

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService) { }

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

}
