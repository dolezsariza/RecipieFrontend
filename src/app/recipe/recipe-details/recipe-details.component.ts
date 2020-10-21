import { RecipeDetails } from './../../_interfaces/recipe-details.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Recipe } from 'src/app/_interfaces/recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  public recipeDetails: RecipeDetails;
  public errorMessage: string = "";
  public finished = false;

  constructor(private repository: RepositoryService, private router: Router, 
              private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getRecipeDetails();
  }

  getRecipeDetails = () => {
    let id: number = this.activeRoute.snapshot.params["id"];
    let apiUrl: string = `recipes/${id}`;

    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.recipeDetails = res as RecipeDetails;
      this.finished = true;
    },
    (error) =>{
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }

}
